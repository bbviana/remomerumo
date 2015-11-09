package br.com.remomeurumo.model;

import br.com.remomeurumo.framework.BaseEntity;

import javax.persistence.*;
import java.util.Collection;

import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;
import static org.apache.commons.lang3.builder.ToStringStyle.SHORT_PREFIX_STYLE;

/**
 * @author jardim
 */
@Entity
public class Atividade extends BaseEntity {

	private String data;

	private String nome;

	private String planejamento;

	private String comentario;

	@ManyToOne
	@JoinTable(name = "AtividadeTipo")
	private TipoAtividade tipoAtividade;

	@OneToMany(mappedBy = "atividade")
	private Collection<AlunoAtividade> alunos;

	@ManyToMany(mappedBy = "atividades")
	private Collection<Colaborador> colaboradores;

	@Override
	public String toString() {
		return reflectionToString(this, SHORT_PREFIX_STYLE);
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public String getPlanejamento() {
		return planejamento;
	}

	public void setPlanejamento(String planejamento) {
		this.planejamento = planejamento;
	}

	public Collection<AlunoAtividade> getAlunos() {
		return alunos;
	}

	public void setAlunos(Collection<AlunoAtividade> alunos) {
		this.alunos = alunos;
	}

	public Collection<Colaborador> getColaboradores() {
		return colaboradores;
	}

	public void setColaboradores(Collection<Colaborador> colaboradores) {
		this.colaboradores = colaboradores;
	}

	public TipoAtividade getTipoAtividade() {
		return tipoAtividade;
	}

	public void setTipoAtividade(TipoAtividade tipoAtividade) {
		this.tipoAtividade = tipoAtividade;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	private static final long serialVersionUID = 1L;
}
