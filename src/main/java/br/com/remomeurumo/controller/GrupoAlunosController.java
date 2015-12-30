package br.com.remomeurumo.controller;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Path;

import br.com.remomeurumo.framework.CrudController;
import br.com.remomeurumo.framework.Result;
import br.com.remomeurumo.model.Aluno;
import br.com.remomeurumo.model.Colaborador;
import br.com.remomeurumo.model.GrupoAluno;
import br.com.remomeurumo.model.TipoAtividade;

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
		result.addAssociation("tipos", findAll(TipoAtividade.class));
		result.addAssociation("alunos", findAll(Aluno.class));
		result.addAssociation("colaboradores", findAll(Colaborador.class));
	}

	@Override
	protected void postLoad(Result<GrupoAluno> result) {
		postBlank(result);
	}

}
