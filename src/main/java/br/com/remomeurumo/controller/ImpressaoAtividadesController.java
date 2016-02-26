package br.com.remomeurumo.controller;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

import java.util.ArrayList;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import br.com.remomeurumo.model.Aluno;
import br.com.remomeurumo.model.Atividade;
import br.com.remomeurumo.model.AtividadeGrupo;
import br.com.remomeurumo.persistence.Transactional;

/**
 * @author jardim
 */
@RequestScoped
@Transactional
@Path("impressaoAtividades")
public class ImpressaoAtividadesController {

	@Inject
	protected EntityManager em;

	@GET
	@Produces(APPLICATION_JSON)
	@Path("procurarGrupos")
	public Atividade procurarGrupos(@QueryParam("id") Long id) {

		Atividade atividade = em.find(Atividade.class, id);
		this.loadAlunos(atividade);
		return atividade;
	}

	/**
	 * Método para carregar os alunos e não só o nome e id deles
	 */
	private void loadAlunos(Atividade atividade) {
		atividade.setAtividadeGruposTransient(new ArrayList<AtividadeGrupo>());
		for (AtividadeGrupo atividadeGrupo : atividade.getAtividadeGrupos()) {
			atividade.getAtividadeGruposTransient().add(atividadeGrupo);
			atividadeGrupo.setAlunosTransient(new ArrayList<Aluno>());
			for (Aluno aluno : atividadeGrupo.getAlunos()) {
				atividadeGrupo.getAlunosTransient().add(aluno);
			}
		}
	}

}
