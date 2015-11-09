package br.com.remomeurumo.controller;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Path;

import br.com.remomeurumo.model.AvaliacaoClinica;
import br.com.remomeurumo.framework.CrudController;

/**
 * @author jardim
 */
@RequestScoped
@Path("avaliacoesClinicas")
public class AvaliacoesClinicasController extends CrudController<AvaliacaoClinica> {

	@Override
	protected Class<AvaliacaoClinica> getType() {
		return AvaliacaoClinica.class;
	}

}
