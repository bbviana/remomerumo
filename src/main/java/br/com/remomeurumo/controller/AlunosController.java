package br.com.remomeurumo.controller;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;

import br.com.remomeurumo.Aluno;
import br.com.remomeurumo.BaseController;

/**
 * @author bbviana
 */
@RequestScoped
@Path("alunos")
public class AlunosController extends BaseController {

	@Inject
	private EntityManager em;

	@POST
	public Aluno insert(Aluno aluno) {
		em.persist(aluno);
		return aluno;
	}

	@PUT
	@Path("{id}")
	public Aluno update(@PathParam("id") Long id, Aluno aluno) {
		// FIXME buscar aluno antes e fazer merge com o que vem da tela
		return em.merge(aluno);
	}

	@GET
	@Path("{id}")
	public Aluno get(@PathParam("id") Long id) {
		return em.find(Aluno.class, id);
	}

	@GET
	public List<Aluno> list() {
		TypedQuery<Aluno> query = em.createQuery("SELECT a FROM Aluno a ORDER BY nome", Aluno.class);
		return query.getResultList();
	}

	@DELETE
	@Path("{id}")
	public void remove(@PathParam("id") Long id) {
		Aluno entity = em.find(Aluno.class, id);
		em.remove(entity);
	}
}
