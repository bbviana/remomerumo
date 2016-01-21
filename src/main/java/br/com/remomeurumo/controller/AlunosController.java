package br.com.remomeurumo.controller;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import br.com.remomeurumo.framework.AuditoriaService;
import br.com.remomeurumo.framework.CrudController;
import br.com.remomeurumo.framework.Result;
import br.com.remomeurumo.model.Aluno;
import br.com.remomeurumo.model.Responsavel;

/**
 * @author bbviana
 */
@RequestScoped
@Path("alunos")
public class AlunosController extends CrudController<Aluno> {

	@Inject
	private AuditoriaService auditService;
	
	protected Class<Aluno> getType() {
		return Aluno.class;
	}

	@Override
	protected void postBlank(Result<Aluno> result) {
		result.addAssociation("responsaveis", findAllAtivos(Responsavel.class));
	}

	@Override
	protected void postLoad(Result<Aluno> result) {
		postBlank(result);
	}
	
	@PUT
	@Path("{id}")
	public Aluno update(@PathParam("id") Long id, Aluno element) {
		element.setId(id);
		//this.auditService.registrarAuditoria(element, AuditoriaService.operationUpdate);
		return em.merge(element);
	}
}
