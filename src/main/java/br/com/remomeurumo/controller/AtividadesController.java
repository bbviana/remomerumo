package br.com.remomeurumo.controller;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Path;

import br.com.remomeurumo.model.Atividade;
import br.com.remomeurumo.framework.CrudController;

/**
 * @author bbviana
 */
@RequestScoped
@Path("atividades")
public class AtividadesController extends CrudController<Atividade> {

	protected Class<Atividade> getType() {
		return Atividade.class;
	}
}
