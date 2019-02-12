package br.com.remomeurumo.model;

import br.com.remomeurumo.framework.BaseEntity;

/**
 * @author jardim
 */
public class ImagemAluno extends BaseEntity {

	private static final long serialVersionUID = 1L;
	private String conteudoImagem;
	
	public void setConteudoImagem(String ConteudoImagem) {
		this.conteudoImagem = ConteudoImagem;
	}

	public String getConteudoImagem() {
		return conteudoImagem;
	}

}