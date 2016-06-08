package br.com.remomeurumo.model;

import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;
import static org.apache.commons.lang3.builder.ToStringStyle.SHORT_PREFIX_STYLE;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import br.com.remomeurumo.framework.BaseEntity;

import com.fasterxml.jackson.annotation.JsonFilter;

/**
 * @author jardim
 */
@Entity
public class AtividadeGrupo extends BaseEntity {

	private String planejamentoDeAula;

	private String comentario;

	private String nome;

	@JsonFilter("associationFilter")
	@ManyToOne
	@JoinColumn(name = "grupoid")
	private GrupoAluno grupo;

	@JsonFilter("associationFilter")
	@ManyToMany
	@JoinTable(name = "AtividadeGrupoAlunos")
	private Collection<Aluno> alunos;

	@Transient
	private Collection<Aluno> alunosTransient;

	@JsonFilter("associationFilter")
	@ManyToMany
	@JoinTable(name = "AtividadeGrupoTarefas")
	private Collection<Tarefa> tarefas;
	
	@Transient
	private Collection<Tarefa> tarefasTransient;

	@JsonFilter("associationFilter")
	@ManyToMany
	@JoinTable(name = "AtividadeGrupoEquipamentos")
	private Collection<Equipamento> equipamentos;
	
	@JsonFilter("associationFilter")
	@ManyToMany
	@JoinTable(name = "AtividadeGrupoColaboradores")
	private Collection<Colaborador> colaboradores;

	@JsonFilter("associationFilter")
	@ManyToOne
	@JoinColumn(name = "atividadeid")
	private Atividade atividade;

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

	public Atividade getAtividade() {
		return atividade;
	}

	public void setAtividade(Atividade atividade) {
		this.atividade = atividade;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Collection<Aluno> getAlunosTransient() {
		return alunosTransient;
	}

	public void setAlunosTransient(Collection<Aluno> alunosTransient) {
		this.alunosTransient = alunosTransient;
	}

	public Collection<Tarefa> getTarefas() {
		return tarefas;
	}

	public void setTarefas(Collection<Tarefa> tarefas) {
		this.tarefas = tarefas;
	}

	public Collection<Tarefa> getTarefasTransient() {
		return tarefasTransient;
	}

	public void setTarefasTransient(Collection<Tarefa> tarefasTransient) {
		this.tarefasTransient = tarefasTransient;
	}

	public Collection<Equipamento> getEquipamentos() {
		return equipamentos;
	}

	public void setEquipamentos(Collection<Equipamento> equipamentos) {
		this.equipamentos = equipamentos;
	}

	private static final long serialVersionUID = 1L;
}
