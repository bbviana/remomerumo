package br.com.remomeurumo.config;

import br.com.remomeurumo.Aluno;
import br.com.remomeurumo.GrupoAluno;
import br.com.remomeurumo.Responsavel;
import br.com.remomeurumo.persistence.Transactional;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

/**
 * @author bbviana
 */
@Path("scenario")
@ApplicationScoped
@Transactional
public class Scenario {

	@Inject
	private EntityManager em;

	@GET
	@Path("populate")
	public Response populate() {
		em.persist(aluno("Bruno"));
		em.persist(aluno("Bruna"));
		em.persist(aluno("Rafael"));
		em.persist(aluno("Rafaela"));
		em.persist(aluno("Sharon"));
		em.persist(aluno("Marilia"));
		em.persist(aluno("Paulo"));

		em.persist(responsavel("André"));
		em.persist(responsavel("Marta"));
		em.persist(responsavel("Paula"));

		em.persist(grupoAluno("Grupo 1"));
		em.persist(grupoAluno("Grupo 2"));
		em.persist(grupoAluno("Grupo 3"));
		em.persist(grupoAluno("Grupo 4"));
		em.persist(grupoAluno("Grupo 5"));

		return Response.ok("Banco de dados populado com sucesso").build();
	}

	@GET
	@Path("clear")
	public Response clear() {
		em.createQuery("DELETE FROM Aluno").executeUpdate();
		em.createQuery("DELETE FROM GrupoAluno").executeUpdate();
		em.createQuery("DELETE FROM Responsavel").executeUpdate();
		return Response.ok("Registros removidos").build();
	}

	private static Aluno aluno(String nome) {
		Aluno aluno = new Aluno();
		aluno.setNome(nome);
		return aluno;
	}

	private static GrupoAluno grupoAluno(String nome) {
		GrupoAluno grupoAluno = new GrupoAluno();
		grupoAluno.setNome(nome);
		return grupoAluno;
	}

	private static Responsavel responsavel(String nome) {
		Responsavel responsavel = new Responsavel();
		responsavel.setNome(nome);
		return responsavel;
	}
}
