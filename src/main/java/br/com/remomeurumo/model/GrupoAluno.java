package br.com.remomeurumo.model;

import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;
import static org.apache.commons.lang3.builder.ToStringStyle.SHORT_PREFIX_STYLE;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonFilter;

import br.com.remomeurumo.framework.BaseEntity;

/**
 * @author bbviana
 */
@Entity
public class GrupoAluno extends BaseEntity {

	private String nome;

	private String descricao;
	
	@JsonFilter("associationFilter")
	@ManyToMany
	@JoinTable(name = "GrupoAAlunos")
	private Collection<Aluno> alunos;

	@JsonFilter("associationFilter")
	@ManyToMany
	@JoinTable(name = "GrupoAColaboradores")
	private Collection<Colaborador> colaboradores;

	@JsonFilter("associationFilter")
	@ManyToOne
	@JoinColumn(name = "tipoid")
	private TipoAtividade tipoAtividade; 
	
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
	
	public TipoAtividade getTipoAtividade() {
		return tipoAtividade;
	}

	public void setTipoAtividade(TipoAtividade tipoAtividade) {
		this.tipoAtividade = tipoAtividade;
	}

	public Collection<Aluno> getAlunos() {
		return alunos;
	}

	public void setAlunos(Collection<Aluno> alunos) {
		this.alunos = alunos;
	}

	public Collection<Colaborador> getColaboradores() {
		return colaboradores;
	}

	public void setColaboradores(Collection<Colaborador> colaboradores) {
		this.colaboradores = colaboradores;
	}

	private static final long serialVersionUID = 1L;
}
