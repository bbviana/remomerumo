package br.com.remomeurumo.controller;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Path;

import br.com.remomeurumo.framework.CrudController;
import br.com.remomeurumo.model.Permissao;

/**
 * @author jardim
 */
@RequestScoped
@Path("permissoes")
public class PermissoesController extends CrudController<Permissao> {

	@Override
	protected Class<Permissao> getType() {
		return Permissao.class;
	}

}
