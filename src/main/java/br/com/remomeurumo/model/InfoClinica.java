package br.com.remomeurumo.model;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import br.com.remomeurumo.framework.BaseEntity;

import com.fasterxml.jackson.annotation.JsonFilter;

/**
 * @author jardim
 */
@Entity
public class InfoClinica extends BaseEntity {

	private String valor;

	@ManyToOne
	@JoinColumn(name = "tipoid")
	private TipoInfoClinica tipo;
	
	@JsonFilter("associationFilter")
	@ManyToOne
	@JoinColumn(name = "avaliacaoid")
	private AvaliacaoClinica avaliacao;

	public String getValor() {
		return valor;
	}

	public void setValor(String valor) {
		this.valor = valor;
	}

	public TipoInfoClinica getTipo() {
		return tipo;
	}

	public void setTipo(TipoInfoClinica tipo) {
		this.tipo = tipo;
	}

	public AvaliacaoClinica getAvaliacao() {
		return avaliacao;
	}

	public void setAvaliacao(AvaliacaoClinica avaliacao) {
		this.avaliacao = avaliacao;
	}

	private static final long serialVersionUID = 1L;
}
