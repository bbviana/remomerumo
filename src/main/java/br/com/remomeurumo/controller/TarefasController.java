package br.com.remomeurumo.controller;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Path;

import br.com.remomeurumo.framework.CrudController;
import br.com.remomeurumo.model.Tarefa;

/**
 * @author jardim
 */
@RequestScoped
@Path("tarefas")
public class TarefasController extends CrudController<Tarefa> {

	protected Class<Tarefa> getType() {
		return Tarefa.class;
	}

}