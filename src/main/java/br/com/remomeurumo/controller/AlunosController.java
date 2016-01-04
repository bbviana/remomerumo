package br.com.remomeurumo.controller;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Path;

import br.com.remomeurumo.framework.CrudController;
import br.com.remomeurumo.framework.Result;
import br.com.remomeurumo.model.Aluno;
import br.com.remomeurumo.model.Responsavel;

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
		result.addAssociation("responsaveis", findAllAtivos(Responsavel.class));
	}

	@Override
	protected void postLoad(Result<Aluno> result) {
		postBlank(result);
	}
}
