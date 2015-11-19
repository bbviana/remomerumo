package br.com.remomeurumo.controller;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Path;

import br.com.remomeurumo.framework.CrudController;
import br.com.remomeurumo.framework.Result;
import br.com.remomeurumo.model.Atividade;
import br.com.remomeurumo.model.Colaborador;
import br.com.remomeurumo.model.TipoAtividade;

/**
 * @author bbviana
 */
@RequestScoped
@Path("atividades")
public class AtividadesController extends CrudController<Atividade> {

	protected Class<Atividade> getType() {
		return Atividade.class;
	}
	
	@Override
	protected void postBlank(Result<Atividade> result) {
		result.addAssociation("tipos", findAll(TipoAtividade.class));
	}

	@Override
	protected void postLoad(Result<Atividade> result) {
		postBlank(result);
	}
}
