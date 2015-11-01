package br.com.remomeurumo;

import static org.apache.commons.lang3.builder.ToStringBuilder.reflectionToString;
import static org.apache.commons.lang3.builder.ToStringStyle.SHORT_PREFIX_STYLE;

import java.io.Serializable;
import java.util.Collection;

import javax.persistence.Entity;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

/**
 * @author bbviana
 */
@Entity
public class Aluno extends Pessoa implements Serializable {

	private static final long serialVersionUID = 1L;


	//Identficacoes
    private String matrAluno;
    
    private String escolaridade;
    private String periodo;
    
    
    //TODO: FOTO
    //private String Foto;

    @ManyToMany(targetEntity=Responsavel.class)
    @JoinTable(name="AlunoResponsavel" )
    private Collection<Responsavel> responsaveis;
    
    
    @OneToMany(targetEntity=AlunoAtividade.class, mappedBy="aluno")
    private Collection<AlunoAtividade> atividades;
    
    @ManyToOne(targetEntity=GrupoAluno.class)
    @JoinTable(name="AlunoGrupoAluno" )
    private GrupoAluno grupo;
    

    @Override
    public String toString() {
        return reflectionToString(this, SHORT_PREFIX_STYLE);
    }

	public Collection<Responsavel> getResponsaveis() {
		return responsaveis;
	}

	public void setResponsaveis(Collection<Responsavel> responsaveis) {
		this.responsaveis = responsaveis;
	}

	public Collection<AlunoAtividade> getAlunoAtividades() {
		return atividades;
	}

	public void setAlunoAtividades(Collection<AlunoAtividade> atividades) {
		this.atividades = atividades;
	}

	public GrupoAluno getGrupo() {
		return grupo;
	}

	public void setGrupo(GrupoAluno grupo) {
		this.grupo = grupo;
	}

<<<<<<< HEAD
	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}


    @ManyToMany(targetEntity=Responsavel.class, mappedBy="alunos")
    @JoinTable(name="AlunoResponsavel" )
	public Collection<Responsavel> getResponsaveis() {
		return responsaveis;
=======
	public String getMatrAluno() {
		return matrAluno;
>>>>>>> Modelo geral
	}

	public void setMatrAluno(String matrAluno) {
		this.matrAluno = matrAluno;
	}

	public String getEscolaridade() {
		return escolaridade;
	}

	public void setEscolaridade(String escolaridade) {
		this.escolaridade = escolaridade;
	}

	public String getPeriodo() {
		return periodo;
	}

	public void setPeriodo(String periodo) {
		this.periodo = periodo;
	}

}
