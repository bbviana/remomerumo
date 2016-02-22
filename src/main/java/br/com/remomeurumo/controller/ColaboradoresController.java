package br.com.remomeurumo.controller;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Path;

import br.com.remomeurumo.framework.CrudController;
import br.com.remomeurumo.framework.Result;
import br.com.remomeurumo.model.Colaborador;

/**
 * @author jardim
 */
@RequestScoped
@Path("colaboradores")
public class ColaboradoresController extends CrudController<Colaborador> {

	@Override
	protected Class<Colaborador> getType() {
		return Colaborador.class;
	}

	@Override
	protected void postBlank(Result<Colaborador> result) {
		result.addAssociation("responsaveis", findAllAtivos(Colaborador.class));
	}

	@Override
	protected void postLoad(Result<Colaborador> result) {
		postBlank(result);
	}

}
