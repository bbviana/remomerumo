package br.com.remomeurumo.controller;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

import br.com.remomeurumo.model.Atividade;
import br.com.remomeurumo.model.Usuario;
import br.com.remomeurumo.persistence.Transactional;

/**
 * @author bbviana
 */
@RequestScoped
@Transactional
@Path("planejamentoAtividades")
public class PlanejamentoAtividadesController {

	@Inject
	protected EntityManager em;

	@POST
	@Consumes(APPLICATION_JSON)
	@Produces(APPLICATION_JSON)
	@Path("logar")
	public Usuario logar(Usuario usuario) {
		return usuario;
	}

	@POST
	@Consumes(APPLICATION_JSON)
	@Produces(APPLICATION_JSON)
	@Path("procurarGrupos")
	public Atividade procurarGrupos(Atividade atividade) {
		System.out.println("-- "+atividade.getId());
		return em.find(Atividade.class, atividade.getId());
	}
}
