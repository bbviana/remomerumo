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
import br.com.remomeurumo.model.AlunoAtividade;
import br.com.remomeurumo.model.AvaliacaoClinica;
import br.com.remomeurumo.persistence.Transactional;

/**
 * @author jardim
 */
@RequestScoped
@Transactional
@Path("resumoAlunos")
public class ResumoAlunosController {

	@Inject
	protected EntityManager em;

	@GET
	@Produces(APPLICATION_JSON)
	@Path("procurarAluno")
	public Aluno procurarAluno(@QueryParam("id") Long id) {

		Aluno aluno = em.find(Aluno.class, id);
		System.out.println("Aluno: " + aluno.getNome());
		aluno.setAlunoAtividadesTransient(new ArrayList<AlunoAtividade>());
		for (AlunoAtividade alunoAtividade : aluno.getAlunoAtividades()) {
			AlunoAtividade newAlunoAtividade = new AlunoAtividade();
			newAlunoAtividade.setId(alunoAtividade.getId());
			newAlunoAtividade.setAtividade(alunoAtividade.getAtividade());
			aluno.getAlunoAtividadesTransient().add(newAlunoAtividade);
		}
		aluno.setAvaliacoesTransient(new ArrayList<AvaliacaoClinica>());
		aluno.getAvaliacoesTransient().addAll(aluno.getAvaliacoes());
		return aluno;
	}

}
