package br.com.remomeurumo.controller;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Path;

import br.com.remomeurumo.framework.CrudController;
import br.com.remomeurumo.framework.Result;
import br.com.remomeurumo.model.EspecialidadeClinica;
import br.com.remomeurumo.model.ModeloAvaliacaoClinica;
import br.com.remomeurumo.model.TipoInfoClinica;

/**
 * @author jardim
 */
@RequestScoped
@Path("modeloAvaliacoesClinicas")
public class ModeloAvaliacoesClinicasController extends CrudController<ModeloAvaliacaoClinica> {

	@Override
	protected Class<ModeloAvaliacaoClinica> getType() {
		return ModeloAvaliacaoClinica.class;
	}
	
	@Override
	protected void postBlank(Result<ModeloAvaliacaoClinica> result) {
		result.addAssociation("especialidades", findAll(EspecialidadeClinica.class));
		//TODO: amarrar estes dois
		result.addAssociation("tipoInfoClinicas", findAll(TipoInfoClinica.class));
	}

	@Override
	protected void postLoad(Result<ModeloAvaliacaoClinica> result) {
		postBlank(result);
	}

}
