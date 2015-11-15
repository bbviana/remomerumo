package br.com.remomeurumo.model;

import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;
import static org.apache.commons.lang3.builder.ToStringStyle.SHORT_PREFIX_STYLE;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import br.com.remomeurumo.framework.BaseEntity;
import com.fasterxml.jackson.annotation.JsonFilter;

/**
 * @author bbviana
 */
@Entity
public class GrupoAluno extends BaseEntity {

	private String nome;

	@JsonFilter("associationFilter")
	@OneToMany(mappedBy = "grupo")
	private Collection<Aluno> alunos;

	@ManyToMany
	@JoinTable(name = "GrupoAlunoAtividade")
	private Collection<Atividade> atividades;

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

	public Collection<Aluno> getAlunos() {
		return alunos;
	}

	public void setAlunos(Collection<Aluno> alunos) {
		this.alunos = alunos;
	}

	public Collection<Atividade> getAtividades() {
		return atividades;
	}

	public void setAtividades(Collection<Atividade> atividades) {
		this.atividades = atividades;
	}

	private static final long serialVersionUID = 1L;
}
