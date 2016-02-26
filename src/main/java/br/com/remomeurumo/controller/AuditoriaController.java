package br.com.remomeurumo.controller;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import org.hibernate.criterion.Order;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

import br.com.remomeurumo.model.RegistroAuditoria;

/**
 * @author jardim
 */
@RequestScoped
@Path("auditoria")
public class AuditoriaController {

	@Inject
	protected EntityManager em;

	@GET
	@Produces(APPLICATION_JSON)
	@Path("procurarRegistro")
	public List<RegistroAuditoria> procurarRegistro(@QueryParam("id") Long id) {
		
		Session session = (Session) em.getDelegate();
		Criteria criteria = session.createCriteria(RegistroAuditoria.class);
		criteria.add(Restrictions.eq("idEntidade", id));
		criteria.addOrder(Order.desc("id"));
		List<RegistroAuditoria> list = criteria.list();
			
		return list;
	}

}
