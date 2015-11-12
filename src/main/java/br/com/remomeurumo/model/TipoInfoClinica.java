package br.com.remomeurumo.model;

import javax.persistence.Entity;

import br.com.remomeurumo.framework.BaseEntity;

/**
 * @author jardim
 */
@Entity
public class TipoInfoClinica extends BaseEntity {

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
