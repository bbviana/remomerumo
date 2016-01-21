package br.com.remomeurumo.controller;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Path;

import br.com.remomeurumo.framework.CrudController;
import br.com.remomeurumo.model.RegistroAuditoria;

/**
 * @author jardim
 */
@RequestScoped
@Path("auditorias")
public class AuditoriasController extends CrudController<RegistroAuditoria> {

	@Override
	protected Class<RegistroAuditoria> getType() {
		return RegistroAuditoria.class;
	}

}
