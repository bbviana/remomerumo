package br.com.remomeurumo.controller;

import br.com.remomeurumo.model.Responsavel;
import br.com.remomeurumo.framework.CrudController;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Path;

/**
 * @author jardim
 */
@RequestScoped
@Path("responsaveis")
public class ResponsaveisController extends CrudController<Responsavel> {

	@Override
	protected Class<Responsavel> getType() {
		return Responsavel.class;
	}

}
