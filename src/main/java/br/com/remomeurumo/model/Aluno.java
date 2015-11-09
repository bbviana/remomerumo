package br.com.remomeurumo.model;

import com.fasterxml.jackson.annotation.JsonFilter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;

import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;
import static org.apache.commons.lang3.builder.ToStringStyle.SHORT_PREFIX_STYLE;

/**
 * @author bbviana
 */
@Entity
public class Aluno extends Pessoa implements Serializable {

	private static final long serialVersionUID = 1L;

	private String matrAluno;

	private String escolaridade;

	private String periodo;


	//TODO: FOTO
	//private String Foto;

	@JsonFilter("associationFilter")
	@ManyToMany
	@JoinTable(name = "AlunoResponsavel")
	private Collection<Responsavel> responsaveis;

	@JsonFilter("associationFilter")
	@OneToMany(mappedBy = "aluno")
	private Collection<AlunoAtividade> alunoAtividades;

	@JsonFilter("associationFilter")
	@ManyToOne
	@JoinTable(name = "AlunoGrupoAluno")
	private GrupoAluno grupo;

	@Override
	public String toString() {
		return reflectionToString(this, SHORT_PREFIX_STYLE);
	}

	public Collection<Responsavel> getResponsaveis() {
		return responsaveis;
	}

	public void setResponsaveis(Collection<Responsavel> responsaveis) {
		this.responsaveis = responsaveis;
	}

	public Collection<AlunoAtividade> getAlunoAtividades() {
		return alunoAtividades;
	}

	public void setAlunoAtividades(Collection<AlunoAtividade> alunoAtividades) {
		this.alunoAtividades = alunoAtividades;
	}

	public GrupoAluno getGrupo() {
		return grupo;
	}

	public void setGrupo(GrupoAluno grupo) {
		this.grupo = grupo;
	}


	public void setMatrAluno(String matrAluno) {
		this.matrAluno = matrAluno;
	}

	public String getEscolaridade() {
		return escolaridade;
	}

	public void setEscolaridade(String escolaridade) {
		this.escolaridade = escolaridade;
	}

	public String getPeriodo() {
		return periodo;
	}

	public void setPeriodo(String periodo) {
		this.periodo = periodo;
	}

	public String getMatrAluno() {
		return matrAluno;
	}
}