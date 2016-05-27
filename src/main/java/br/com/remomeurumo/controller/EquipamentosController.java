package br.com.remomeurumo.controller;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Path;

import br.com.remomeurumo.framework.CrudController;
import br.com.remomeurumo.model.Equipamento;

/**
 * @author jardim
 */
@RequestScoped
@Path("equipamentos")
public class EquipamentosController extends CrudController<Equipamento> {

	protected Class<Equipamento> getType() {
		return Equipamento.class;
	}

}