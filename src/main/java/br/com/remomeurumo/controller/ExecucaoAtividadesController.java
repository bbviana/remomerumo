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
import br.com.remomeurumo.model.AtividadeGrupo;
import br.com.remomeurumo.persistence.Transactional;

/**
 * @author jardim
 */
@RequestScoped
@Transactional
@Path("execucaoAtividades")
public class ExecucaoAtividadesController {

	@Inject
	protected EntityManager em;

	@GET
	@Produces(APPLICATION_JSON)
	@Path("procurarAlunos")
	public Atividade procurarAlunos(@QueryParam("id") Long id) {
		Atividade atividade = em.find(Atividade.class,id);
		return atividade;
	}

	@POST
	@Consumes(APPLICATION_JSON)
	@Produces(APPLICATION_JSON)
	@Path("salvar")
	public Atividade salvar(Atividade atividade) {
		System.out.println("\n\n Salvando -- "+atividade.getId());
		
		//deve comparar os grupos que vieram no request contra os que já existiam no banco
		Atividade atividadeOriginal = em.find(Atividade.class,atividade.getId());
		for (AtividadeGrupo planejamento : atividade.getAtividadeGrupos()) {
			if(atividadeOriginal.getAtividadeGrupos().contains(planejamento)) {
				System.out.println("\n\n Merge -- "+planejamento.getId());
				//this.em.merge(planejamento);
			} else {
				System.out.println("\n\n Salvando Novo -- ");
				//this.em.persist(planejamento);
			}
		}
		
		return atividade;
	}
	
}
