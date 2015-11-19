package br.com.remomeurumo.controller;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Path;

import br.com.remomeurumo.framework.CrudController;
import br.com.remomeurumo.model.GrupoAluno;

/**
 * @author bbviana
 */
@RequestScoped
@Path("grupoAlunos")
public class GrupoAlunosController extends CrudController<GrupoAluno> {

	protected Class<GrupoAluno> getType() {
		return GrupoAluno.class;
	}

}
