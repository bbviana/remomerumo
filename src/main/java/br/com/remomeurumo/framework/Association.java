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
package br.com.remomeurumo.framework;

import java.io.Serializable;

/**
 * @author bbviana
 */
public class Association implements Serializable {

	private Long id;

	private String nome;

	public Association(Long id, String nome) {
		this.id = id;
		this.nome = nome;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	private static final long serialVersionUID = 1L;
}
