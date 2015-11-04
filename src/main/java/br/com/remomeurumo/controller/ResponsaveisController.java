package br.com.remomeurumo.controller;

import br.com.remomeurumo.Responsavel;

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
