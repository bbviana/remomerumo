package br.com.remomeurumo.controller;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Path;

import br.com.remomeurumo.framework.CrudController;
import br.com.remomeurumo.model.TipoInfoClinica;

/**
 * @author jardim
 */
@RequestScoped
@Path("tipoInfoClinicas")
public class TipoInfoClinicasController extends CrudController<TipoInfoClinica> {

	@Override
	protected Class<TipoInfoClinica> getType() {
		return TipoInfoClinica.class;
	}

}
