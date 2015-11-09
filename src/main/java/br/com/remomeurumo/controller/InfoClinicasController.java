package br.com.remomeurumo.controller;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Path;

import br.com.remomeurumo.model.InfoClinica;
import br.com.remomeurumo.framework.CrudController;

/**
 * @author jardim
 */
@RequestScoped
@Path("infoClinicas")
public class InfoClinicasController extends CrudController<InfoClinica> {

	@Override
	protected Class<InfoClinica> getType() {
		return InfoClinica.class;
	}

}
