package br.com.remomeurumo.model;

import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;
import static org.apache.commons.lang3.builder.ToStringStyle.SHORT_PREFIX_STYLE;

import javax.persistence.Entity;

import br.com.remomeurumo.framework.BaseEntity;

/**
 * @author bbviana
 */
@Entity
public class GrupoAluno extends BaseEntity {

	private String nome;

	private String descricao;

	@Override
	public String toString() {
		return reflectionToString(this, SHORT_PREFIX_STYLE);
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	private static final long serialVersionUID = 1L;
}
