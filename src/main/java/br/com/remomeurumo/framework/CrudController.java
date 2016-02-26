/*
 * Copyright (c) 1999-2010 Touch Tecnologia e Informatica Ltda.
 *
 * R. Gomes de Carvalho, 1666, 3o. Andar, Vila Olimpia, Sao Paulo, SP, Brasil.
 *
 * Todos os direitos reservados.
 * Este software e confidencial e de propriedade da Touch Tecnologia e Informatica Ltda. (Informacao Confidencial)
 * As informacoes contidas neste arquivo nao podem ser publicadas, e seu uso esta limitado de acordo
 * com os termos do contrato de licenca.
 */
package br.com.remomeurumo.framework;

import br.com.remomeurumo.persistence.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import static org.hibernate.criterion.MatchMode.ANYWHERE;

/**
 * @author bbviana
 */
@Transactional
@Produces(APPLICATION_JSON)
@Consumes(APPLICATION_JSON)
public class CrudController<T extends BaseEntity> {

	@Inject
	protected EntityManager em;
	
	@Inject
	protected AuditoriaService auditService;

	protected Class<T> getType() {
		return null;
	}

	////////////////////////////////////////////////////////////////////////////////
	// CALLBACKS
	////////////////////////////////////////////////////////////////////////////////

	/**
	 * Adicione associações nesta fase
	 */
	protected void postBlank(Result<T> result) {
		// hook
	}


	/**
	 * Adicione associações nesta fase
	 */
	protected void postLoad(Result<T> result) {
		// hook
	}

	////////////////////////////////////////////////////////////////////////////////
	// REST
	////////////////////////////////////////////////////////////////////////////////

	@POST
	public T insert(T element) {
		em.persist(element);
		this.auditService.registrarAuditoria(element, AuditoriaService.operationSave);
		return element;
	}

	@GET
	@Path("blank")
	public Result<T> blank(){
		try {
			T instance = getType().newInstance();
			Result<T> result = new Result<>(instance);
			postBlank(result);
			return result;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	@PUT
	@Path("{id}")
	public T update(@PathParam("id") Long id, T element) {
		element.setId(id);
		this.auditService.registrarAuditoria(element, AuditoriaService.operationUpdate);
		return em.merge(element);
	}

	@GET
	@Path("{id}")
	public Result<T> get(@PathParam("id") Long id) {
		T element = em.find(getType(), id);
		Result<T> result = new Result<>(element);
		postLoad(result);
		return result;
	}

	@GET
	@SuppressWarnings("unchecked")
	public ResultList<T> list(
			@QueryParam("count") Integer count,
			@QueryParam("page") Integer page,
			@QueryParam("search.nome") String nome) {

		Session session = (Session) em.getDelegate();
		Criteria criteria = session.createCriteria(getType());
		Criteria countCriteria = session.createCriteria(getType());

		criteria.addOrder(Order.asc("nome"));
		criteria.addOrder(Order.desc("id"));

		if (count != null) {
			criteria.setMaxResults(count);
		}

		if (count != null && page != null) {
			criteria.setFirstResult((page - 1) * count);
		}

		if (nome != null) {
			criteria.add(Restrictions.ilike("nome", nome, ANYWHERE));
			countCriteria.add(Restrictions.ilike("nome", nome, ANYWHERE));
		}

		List<T> list = criteria.list();
		Long totalResults = (Long) countCriteria.setProjection(Projections.rowCount()).uniqueResult();

		return new ResultList<>(list, page, count, totalResults.intValue());
	}

	@DELETE
	@Path("{id}")
	public void remove(@PathParam("id") Long id) {
		T entity = em.find(getType(), id);
		this.auditService.registrarAuditoria(entity, AuditoriaService.operationDelete);
		em.remove(entity);
	}

	@SuppressWarnings("unchecked")
	protected <E> List<E> findAll(Class<? extends E> entityClass) {
		Session session = (Session) em.getDelegate();
		Criteria criteria = session.createCriteria(entityClass);
		criteria.addOrder(Order.asc("nome"));
		return criteria.list();
	}
	
	@SuppressWarnings("unchecked")
	protected <E> List<E> findAllAtivos(Class<? extends E> entityClass) {
		Session session = (Session) em.getDelegate();
		Criteria criteria = session.createCriteria(entityClass);
		criteria.add(Restrictions.eq("ativo", true));
		criteria.addOrder(Order.asc("nome"));
		return criteria.list();
	}
	
	@GET
    @Path("arquivoCsv")
    @Produces("text/plain")
    public Response getTextFile() {
	 
		StringBuilder returnString = new StringBuilder();
		
		Session session = (Session) em.getDelegate();
		Criteria criteria = session.createCriteria(getType());
		criteria.addOrder(Order.asc("nome"));
		criteria.addOrder(Order.desc("id"));

		List<T> list = criteria.list();
		for (T t : list) {
			returnString.append(t.getId());
			returnString.append("\n");
		}
		
		InputStream stream = new ByteArrayInputStream(returnString.toString().getBytes(StandardCharsets.UTF_8));
        ResponseBuilder response = Response.ok(stream);
		        response.header("Content-Disposition", "attachment; filename=\"default_file.csv\"");
		        
	   return response.build();
    }

}
