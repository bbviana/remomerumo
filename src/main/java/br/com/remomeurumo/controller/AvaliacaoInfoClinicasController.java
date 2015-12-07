package br.com.remomeurumo.controller;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import br.com.remomeurumo.model.AvaliacaoClinica;

/**
 * @author jardim
 */
@RequestScoped
@Path("avaliacaoInfoClinicas")
public class AvaliacaoInfoClinicasController {
	
	@Inject
	protected EntityManager em;

	@GET
	@Produces(APPLICATION_JSON)
	@Path("procurarAvaliacao")
	public AvaliacaoClinica procurarAvaliacao(@QueryParam("id") Long id) {
		AvaliacaoClinica avaliacaoClinica = em.find(AvaliacaoClinica.class,id);
		return avaliacaoClinica;
	}
}
