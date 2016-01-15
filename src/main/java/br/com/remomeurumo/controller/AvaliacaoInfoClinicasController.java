package br.com.remomeurumo.controller;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

import java.util.ArrayList;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import br.com.remomeurumo.model.AvaliacaoClinica;
import br.com.remomeurumo.model.InfoClinica;
import br.com.remomeurumo.model.TipoInfoClinica;

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
		AvaliacaoClinica avaliacaoClinica = em.find(AvaliacaoClinica.class, id);
		System.out.println("Recuperando a Informação clinica da avaliação "+avaliacaoClinica.getInformacoesClinicas().size());
		// cria as informações clinicas baseadas no modelo da avaliação
		if (avaliacaoClinica.getInformacoesClinicas() == null
				|| avaliacaoClinica.getInformacoesClinicas().isEmpty()) {
			avaliacaoClinica
					.setInformacoesClinicas(new ArrayList<InfoClinica>());
			if (avaliacaoClinica.getModelo() != null) {
				for (TipoInfoClinica tipoInfo : avaliacaoClinica.getModelo()
						.getTipoInfoClinicas()) {
					InfoClinica infoClinica = new InfoClinica();
					infoClinica.setTipo(tipoInfo);
					infoClinica.setAvaliacao(avaliacaoClinica);
					this.em.persist(infoClinica);
					avaliacaoClinica.getInformacoesClinicas().add(infoClinica);
				}
				this.em.merge(avaliacaoClinica);
			}
		}

		return avaliacaoClinica;
	}
	
	
	@POST
	@Consumes(APPLICATION_JSON)
	@Produces(APPLICATION_JSON)
	@Path("salvar")
	public AvaliacaoClinica salvar(AvaliacaoClinica avaliacao) {
		System.out.println("Salvando a Informação clinica da avaliação "+avaliacao.getInformacoesClinicas());
		AvaliacaoClinica avaliacaoClinica = em.find(AvaliacaoClinica.class, avaliacao.getId());
		avaliacaoClinica.getInformacoesClinicas().clear();

		for (InfoClinica info : avaliacao.getInformacoesClinicas()) {
			System.out.println("Info "+info.getValor());
			this.em.merge(info);
			avaliacaoClinica.getInformacoesClinicas().add(info);			
		}
		
		this.em.merge(avaliacaoClinica);
		System.out.println("Salvando a Informação clinica da avaliação "+avaliacaoClinica.getInformacoesClinicas().size());
		return avaliacaoClinica;
	}
}
