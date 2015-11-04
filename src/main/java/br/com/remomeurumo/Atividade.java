package br.com.remomeurumo;

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

	private String comentario;

	@ManyToOne(targetEntity = TipoAtividade.class)
	@JoinTable(name = "AtividadeTipo")
	private TipoAtividade tipoAtividade;

	@OneToMany(targetEntity = AlunoAtividade.class, mappedBy = "atividade")
	private Collection<AlunoAtividade> alunos;

	@ManyToMany(targetEntity = Colaborador.class, mappedBy = "atividades")
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

}
