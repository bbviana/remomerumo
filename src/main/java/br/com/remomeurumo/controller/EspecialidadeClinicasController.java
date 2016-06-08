package br.com.remomeurumo.controller;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Path;

import br.com.remomeurumo.framework.CrudController;
import br.com.remomeurumo.model.EspecialidadeClinica;

/**
 * @author jardim
 */
@RequestScoped
@Path("especialidadeClinicas")
public class EspecialidadeClinicasController extends CrudController<EspecialidadeClinica> {

	@Override
	protected Class<EspecialidadeClinica> getType() {
		return EspecialidadeClinica.class;
	}

}
