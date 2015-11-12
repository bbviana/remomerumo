package br.com.remomeurumo.model;

import br.com.remomeurumo.framework.BaseEntity;

import java.util.Collection;

import javax.persistence.*;

/**
 * @author jardim
 */
@Entity
public class ModeloAvaliacaoClinica extends BaseEntity {

	private String nome;

	private String descricao;

	@ManyToMany
	@JoinTable(name = "ModeloAvalTipoInfoClinica")
	private Collection<TipoInfoClinica> tipoInfoClinicas;

	@ManyToOne
	private Aluno aluno;

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

	public Collection<TipoInfoClinica> getTipoInfoClinicas() {
		return tipoInfoClinicas;
	}

	public void setTipoInfoClinicas(Collection<TipoInfoClinica> tipoInfoClinicas) {
		this.tipoInfoClinicas = tipoInfoClinicas;
	}


	public Aluno getAluno() {
		return aluno;
	}

	public void setAluno(Aluno aluno) {
		this.aluno = aluno;
	}

	private static final long serialVersionUID = 1L;
}
