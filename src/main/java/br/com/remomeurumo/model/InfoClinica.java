package br.com.remomeurumo.model;

import br.com.remomeurumo.framework.BaseEntity;

import javax.persistence.Entity;

/**
 * @author jardim
 */
@Entity
public class InfoClinica extends BaseEntity {

	private String nome;

	private String sigla;

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getSigla() {
		return sigla;
	}

	public void setSigla(String sigla) {
		this.sigla = sigla;
	}

	private static final long serialVersionUID = 1L;
}
