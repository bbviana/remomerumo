package br.com.remomeurumo.model;

import br.com.remomeurumo.framework.BaseEntity;

import java.util.Collection;

import javax.persistence.*;

/**
 * @author jardim
 */
@Entity
public class AvaliacaoClinica extends BaseEntity {

	private String nome;

	private String data;

	private String comentario;

	@ManyToMany
	@JoinTable(name = "AvaliacaoInfoClinica")
	private Collection<InfoClinica> infoClinicas;

	@ManyToOne
	private Aluno aluno;

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public Collection<InfoClinica> getInfoClinicas() {
		return infoClinicas;
	}

	public void setInfoClinicas(Collection<InfoClinica> infoClinicas) {
		this.infoClinicas = infoClinicas;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public Aluno getAluno() {
		return aluno;
	}

	public void setAluno(Aluno aluno) {
		this.aluno = aluno;
	}

	private static final long serialVersionUID = 1L;
}
