/*
 * Copyright (c) 1999-2010 Touch Tecnologia e Informatica Ltda.
 *
 * R. Gomes de Carvalho, 1666, 3o. Andar, Vila Olimpia, Sao Paulo, SP, Brasil.
 *
 * Todos os direitos reservados.
 * Este software e confidencial e de propriedade da Touch Tecnologia e Informatica Ltda. (Informacao Confidencial)
 * As informacoes contidas neste arquivo nao podem ser publicadas, e seu uso esta limitado de acordo
 * com os termos do contrato de licenca.
 */
package br.com.remomeurumo;

import br.com.remomeurumo.persistence.Transactional;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

import static java.lang.String.format;

/**
 * @author bbviana
 */
@Path("scenario")
@ApplicationScoped
@Transactional
public class Scenario {

	@Inject
	private EntityManager em;

	@Inject
	private AlunosController alunosController;

	@GET
	@Path("populate/alunos/{quantity}")
	public Response populateAlunos(@PathParam("quantity") Integer quantity) {
		for (int i = 0; i < quantity; i++) {
			Aluno aluno = new Aluno();
			aluno.setNome("Aluno " + i);
			alunosController.insert(aluno);
		}
		return Response.ok(format("%s alunos foram criados no banco de dados", quantity)).build();
	}

	@GET
	@Path("clear/alunos/")
	public Response clearAlunos() {
		em.createQuery("DELETE FROM Aluno").executeUpdate();
		return Response.ok("Registros removidos").build();
	}

}
