package br.com.remomeurumo.model;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import br.com.remomeurumo.framework.BaseEntity;

import com.fasterxml.jackson.annotation.JsonFilter;

/**
 * @author jardim
 */
@Entity
public class TipoAtividade extends BaseEntity {

	private String nome;

	@ManyToMany(mappedBy = "tipoAtividade")
	private Collection<Atividade> atividades;

	@JsonFilter("associationFilter")
	@ManyToOne
	@JoinColumn(name = "tipopaiid")
	private TipoAtividade tipoAtividadePai;
	
	@OneToMany(mappedBy = "tipoAtividadePai")
	private Collection<TipoAtividade> tipoAtividadesFilhas;
	
	private String observacao;

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public Collection<Atividade> getAtividades() {
		return atividades;
	}

	public void setAtividades(Collection<Atividade> atividades) {
		this.atividades = atividades;
	}

	public String getObservacao() {
		return observacao;
	}

	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}
	
	public TipoAtividade getTipoAtividadePai() {
		return tipoAtividadePai;
	}

	public void setTipoAtividadePai(TipoAtividade tipoAtividadePai) {
		this.tipoAtividadePai = tipoAtividadePai;
	}

	public Collection<TipoAtividade> getTipoAtividadesFilhas() {
		return tipoAtividadesFilhas;
	}

	public void setTipoAtividadesFilhas(
			Collection<TipoAtividade> tipoAtividadesFilhas) {
		this.tipoAtividadesFilhas = tipoAtividadesFilhas;
	}

	@Transient
	public Object[] csvHead() {
		
		ArrayList<String> returnString = new ArrayList<String>();
		
		returnString.add("id");
		returnString.add("Nome");
		returnString.add("Observacao");
		
		if(tipoAtividadePai!=null) {
			returnString.add("Pai");
		}
		
		return returnString.toArray();
	}

	@Transient
	public Object[] csv() {

		ArrayList<String> returnString = new ArrayList<String>();

		returnString.add(String.valueOf(this.getId()));
		returnString.add(this.getNome());
		returnString.add(this.getObservacao());
		
		if(tipoAtividadePai!=null) {
			returnString.add(this.getTipoAtividadePai().getNome());
		}

		return returnString.toArray();
	}
	
	private static final long serialVersionUID = 1L;
}
