package br.com.remomeurumo.controller;

import br.com.remomeurumo.Aluno;
import br.com.remomeurumo.GrupoAluno;
import br.com.remomeurumo.Responsavel;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Path;

/**
 * @author bbviana
 */
@RequestScoped
@Path("alunos")
public class AlunosController extends CrudController<Aluno> {

	protected Class<Aluno> getType() {
		return Aluno.class;
	}

	@Override
	protected void postBlank(Result<Aluno> result) {
		result.addAssociation("grupos", findAll(GrupoAluno.class));
		result.addAssociation("responsaveis", findAll(Responsavel.class));
	}

	@Override
	protected void postLoad(Result<Aluno> result) {
		postBlank(result);
	}
}
