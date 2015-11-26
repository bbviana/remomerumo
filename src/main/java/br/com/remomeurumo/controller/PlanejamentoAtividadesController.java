package br.com.remomeurumo.controller;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import static org.hibernate.criterion.MatchMode.ANYWHERE;

import java.util.ArrayList;
import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import br.com.remomeurumo.framework.ResultList;
import br.com.remomeurumo.model.Atividade;
import br.com.remomeurumo.model.GrupoAluno;
import br.com.remomeurumo.model.InfoClinica;
import br.com.remomeurumo.model.PlanejamentoGrupo;
import br.com.remomeurumo.persistence.Transactional;

/**
 * @author bbviana
 */
@RequestScoped
@Transactional
@Path("planejamentoAtividades")
public class PlanejamentoAtividadesController {

	@Inject
	protected EntityManager em;

	@GET
	@Produces(APPLICATION_JSON)
	@Path("procurarGrupos")
	public Atividade procurarGrupos(@QueryParam("id") Long id) {
		System.out.println("-- "+this.procurarGrupos());
		Atividade atividade = em.find(Atividade.class,id);
		List<PlanejamentoGrupo> procurarGrupos = this.procurarGrupos();
		long i = 1;
		for (PlanejamentoGrupo planejamento : procurarGrupos) {
			planejamento.setId(i++);
		}
		
		atividade.setPlanejamentoGrupos(procurarGrupos);
		return atividade;
	}
	
	@GET
	@SuppressWarnings("unchecked")
	public List<PlanejamentoGrupo> procurarGrupos() {

		Session session = (Session) em.getDelegate();
		Criteria criteria = session.createCriteria(GrupoAluno.class);
		List<GrupoAluno> list = criteria.list();
		System.out.println("-\n\n-"+list);		
		criteria = session.createCriteria(PlanejamentoGrupo.class);
		ArrayList<PlanejamentoGrupo> planejamentos = new ArrayList<PlanejamentoGrupo>();
		for (GrupoAluno grupoAluno : list) {
			System.out.println("-\n\n-"+grupoAluno.getNome());	
			criteria.add(Restrictions.eq("grupo", grupoAluno));
			criteria.addOrder(Order.asc("id"));
			List<PlanejamentoGrupo> resultList = criteria.list();
			System.out.println("-\nLLL\n-"+resultList);
			if(resultList!=null && !resultList.isEmpty()) {
				planejamentos.add(resultList.iterator().next());
			}
		}
		
		return planejamentos;
	}
	
	
	@GET
	@Produces(APPLICATION_JSON)
	@Path("removerAluno")
	public Atividade removerAluno(@QueryParam("id") Long id) {
		System.out.println("Removendo o relacionamento do aluno -- "+id);
		return em.find(Atividade.class,id);
	}
	

	@POST
	@Consumes(APPLICATION_JSON)
	@Produces(APPLICATION_JSON)
	@Path("salvar")
	public Atividade salvar(Atividade atividade) {
		System.out.println("\n\n Salvando -- "+atividade.getId());
		for (PlanejamentoGrupo planejamento : atividade.getPlanejamentoGrupos()) {
			if(planejamento.getId() != null) {
				System.out.println("\n\n Merge -- "+planejamento.getId());
			} else {
				System.out.println("\n\n Salvando -- ");
			}
		}
		
		return atividade;
	}
	
}
