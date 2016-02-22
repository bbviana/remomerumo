package br.com.remomeurumo.model;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;

import br.com.remomeurumo.framework.BaseEntity;

/**
 * @author jardim
 */
@Entity
public class TipoAtividade extends BaseEntity {

	private String nome;

	@ManyToMany(mappedBy = "tipoAtividade")
	private Collection<Atividade> atividades;

	private String observacao;

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Collection<Atividade> getAtividades() {
		return atividades;
	}

	public void setAtividades(Collection<Atividade> atividades) {
		this.atividades = atividades;
	}

	public String getObservacao() {
		return observacao;
	}

	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}

	private static final long serialVersionUID = 1L;
}
