package br.com.remomeurumo.controller;

import br.com.remomeurumo.model.TipoAtividade;
import br.com.remomeurumo.framework.CrudController;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Path;

/**
 * @author bbviana
 */
@RequestScoped
@Path("tipoatividades")
public class TipoAtividadesController extends CrudController<TipoAtividade> {

	protected Class<TipoAtividade> getType() {
		return TipoAtividade.class;
	}
}
