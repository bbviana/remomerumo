package br.com.remomeurumo.model;

import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;
import static org.apache.commons.lang3.builder.ToStringStyle.SHORT_PREFIX_STYLE;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

/**
 * @author jardim
 */
@Entity
public class Colaborador extends Pessoa implements Serializable {

	private TipoColaborador tipoColcaborador;

	@ManyToMany
	@JoinTable(name = "ColaboradorAtividade")
	private Collection<Atividade> atividades;

	@Override
	public String toString() {
		return reflectionToString(this, SHORT_PREFIX_STYLE);
	}

	public TipoColaborador getTipoColcaborador() {
		return tipoColcaborador;
	}

	public void setTipoColcaborador(TipoColaborador tipoColcaborador) {
		this.tipoColcaborador = tipoColcaborador;
	}

	public Collection<Atividade> getAtividades() {
		return atividades;
	}

	public void setAtividade(Collection<Atividade> atividades) {
		this.atividades = atividades;
	}

	private static final long serialVersionUID = 1L;
}
