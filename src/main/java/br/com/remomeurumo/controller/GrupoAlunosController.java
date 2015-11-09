package br.com.remomeurumo.controller;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Path;

import br.com.remomeurumo.model.Aluno;
import br.com.remomeurumo.model.GrupoAluno;
import br.com.remomeurumo.framework.CrudController;
import br.com.remomeurumo.framework.Result;

/**
 * @author bbviana
 */
@RequestScoped
@Path("grupoAlunos")
public class GrupoAlunosController extends CrudController<GrupoAluno> {

	protected Class<GrupoAluno> getType() {
		return GrupoAluno.class;
	}

	@Override
	protected void postBlank(Result<GrupoAluno> result) {
		result.addAssociation("alunos", findAll(Aluno.class));
	}

	@Override
	protected void postLoad(Result<GrupoAluno> result) {
		postBlank(result);
	}
}
