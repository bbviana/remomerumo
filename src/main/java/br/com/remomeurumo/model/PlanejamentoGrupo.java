package br.com.remomeurumo.model;

import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;
import static org.apache.commons.lang3.builder.ToStringStyle.SHORT_PREFIX_STYLE;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import br.com.remomeurumo.framework.BaseEntity;

import com.fasterxml.jackson.annotation.JsonFilter;

/**
 * @author jardim
 */
@Entity
public class PlanejamentoGrupo extends BaseEntity {

	private String planejamentoDeAula;

	private String comentario;

	@JsonFilter("associationFilter")
	@ManyToOne
	@JoinColumn(name = "grupoid")
	private GrupoAluno grupo;

	@JsonFilter("associationFilter")
	@ManyToMany
	@JoinTable(name = "PlanejamentoGrupoAlunos")
	private Collection<Aluno> alunos;

	@JsonFilter("associationFilter")
	@ManyToMany
	@JoinTable(name = "PlanejamentoGrupoColaboradores")
	private Collection<Colaborador> colaboradores;

	@JsonFilter("associationFilter")
	@ManyToMany(mappedBy="planejamentoGrupo")
	private Collection<Atividade> atividades;
	
	
	@Override
	public String toString() {
		return reflectionToString(this, SHORT_PREFIX_STYLE);
	}

	public String getPlanejamentoDeAula() {
		return planejamentoDeAula;
	}

	public void setPlanejamentoDeAula(String planejamentoDeAula) {
		this.planejamentoDeAula = planejamentoDeAula;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public GrupoAluno getGrupo() {
		return grupo;
	}

	public void setGrupo(GrupoAluno grupo) {
		this.grupo = grupo;
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

	public Collection<Atividade> getAtividades() {
		return atividades;
	}

	public void setAtividades(Collection<Atividade> atividades) {
		this.atividades = atividades;
	}

	private static final long serialVersionUID = 1L;
}
