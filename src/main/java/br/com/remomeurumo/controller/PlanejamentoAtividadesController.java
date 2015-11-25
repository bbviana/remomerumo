package br.com.remomeurumo.controller;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import br.com.remomeurumo.model.Atividade;
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
		System.out.println("-- "+id);
		return em.find(Atividade.class,id);
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
