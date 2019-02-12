package br.com.remomeurumo.controller;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import br.com.remomeurumo.model.Aluno;
import br.com.remomeurumo.model.ImagemAluno;
import br.com.remomeurumo.persistence.Transactional;

/**
 * @author jardim
 */
@RequestScoped
@Path("imagemAlunos")
@Transactional
public class ImagemAlunosController {

	@Inject
	protected EntityManager em;

	
	@GET
	@Produces(APPLICATION_JSON)
	@Path("procurarAluno")
	public Aluno procurarAluno(@QueryParam("id") Long id) {

		Aluno aluno = em.find(Aluno.class, id);
			
		return aluno;
	}
	
	@POST
	@Consumes(APPLICATION_JSON)
	@Produces(APPLICATION_JSON)
	@Path("salvar")
	public ImagemAluno salvar(ImagemAluno imagem) {

		// Emcontra a imagem se existe d ao update
		// existiam no banco
		System.out.println("Chamou..... "+imagem.getId());
		System.out.println("Chamou..... "+imagem.getConteudoImagem());
		
		Aluno aluno = em.find(Aluno.class, imagem.getId());
		aluno.setImagemAluno(imagem.getConteudoImagem());
		this.em.merge(imagem);
		
		
		return imagem;
	}
	

}
