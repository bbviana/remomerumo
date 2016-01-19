package br.com.remomeurumo.controller;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Path;

import br.com.remomeurumo.framework.CrudController;
import br.com.remomeurumo.framework.Result;
import br.com.remomeurumo.model.Colaborador;
import br.com.remomeurumo.model.Permissao;
import br.com.remomeurumo.model.Usuario;

/**
 * @author jardim
 */
@RequestScoped
@Path("usuarios")
public class UsuariosController extends CrudController<Usuario> {

	protected Class<Usuario> getType() {
		return Usuario.class;
	}

	@Override
	protected void postBlank(Result<Usuario> result) {
		result.addAssociation("permissoes", findAll(Permissao.class));
		result.addAssociation("colaboradores", findAllAtivos(Colaborador.class));
	}

	@Override
	protected void postLoad(Result<Usuario> result) {
		postBlank(result);
	}

}
