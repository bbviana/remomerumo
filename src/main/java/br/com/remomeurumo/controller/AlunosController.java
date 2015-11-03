package br.com.remomeurumo.controller;

import br.com.remomeurumo.Aluno;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.*;

/**
 * @author bbviana
 */
@RequestScoped
@Path("alunos")
public class AlunosController extends CrudController<Aluno> {

	protected Class<Aluno> getType() {
		return Aluno.class;
	}

}
