package br.com.remomeurumo;

import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;
import static org.apache.commons.lang3.builder.ToStringStyle.SHORT_PREFIX_STYLE;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

/**
 * @author jardim
 */
@Entity
public class Atividade implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	private Long id;

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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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
