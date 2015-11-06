package br.com.remomeurumo;

import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;

/**
 * @author jardim
 */
@Entity
public class AvaliacaoClinica extends BaseEntity {

	private String nome;

	private String data;
	
	@ManyToOne(targetEntity = TipoAtividade.class)
	@JoinTable(name = "AvaliacaoInfoClinica")
	private Collection<InfoClinica> infoClinicas;

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

}
