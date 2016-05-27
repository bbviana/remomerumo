package br.com.remomeurumo.controller;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Path;

import br.com.remomeurumo.framework.CrudController;
import br.com.remomeurumo.framework.Result;
import br.com.remomeurumo.model.Tarefa;
import br.com.remomeurumo.model.TipoAtividade;

/**
 * @author jardim
 */
@RequestScoped
@Path("tarefas")
public class TarefasController extends CrudController<Tarefa> {

	protected Class<Tarefa> getType() {
		return Tarefa.class;
	}
	
	@Override
	protected void postBlank(Result<Tarefa> result) {
		result.addAssociation("tipos", findAll(TipoAtividade.class));
	}

	@Override
	protected void postLoad(Result<Tarefa> result) {
		postBlank(result);
	}


}