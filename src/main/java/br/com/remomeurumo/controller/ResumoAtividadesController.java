package br.com.remomeurumo.controller;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;

import br.com.remomeurumo.model.Atividade;
import br.com.remomeurumo.persistence.Transactional;

/**
 * @author jardim
 */
@RequestScoped
@Transactional
@Path("resumoAtividades")
public class ResumoAtividadesController {

	@Inject
	protected EntityManager em;

	@GET
	@Produces(APPLICATION_JSON)
	@Path("procurarAtividades")
	public Atividade procurarGrupos() {
		
		Session session = (Session) em.getDelegate();
		Criteria criteria = session.createCriteria(Atividade.class);
		criteria.addOrder(Order.asc("id"));
		List<Atividade> atividades = criteria.list();
		if(!atividades.isEmpty()) {
			Atividade atividade = atividades.remove(0);
			atividade.setAtividadesAnterioresTransient(atividades);
			return atividade;
		}
		return null;
	}
	

	@POST
	@Consumes(APPLICATION_JSON)
	@Produces(APPLICATION_JSON)
	@Path("salvar")
	public Atividade novaAtividade(Atividade atividade) {
		//deve comparar os grupos que vieram no request contra os que já existiam no banco
		System.out.println("\n\n Atividade  -- "+atividade.getNome());
		this.em.persist(atividade);		
		return atividade;
	}
	
}
