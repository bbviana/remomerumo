package br.com.remomeurumo.controller;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Path;

import br.com.remomeurumo.model.Colaborador;
import br.com.remomeurumo.framework.CrudController;

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

}
