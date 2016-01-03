package br.com.remomeurumo.controller;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import br.com.remomeurumo.model.Aluno;
import br.com.remomeurumo.model.Atividade;
import br.com.remomeurumo.model.AtividadeGrupo;
import br.com.remomeurumo.model.Colaborador;
import br.com.remomeurumo.model.GrupoAluno;
import br.com.remomeurumo.model.TipoAtividade;
import br.com.remomeurumo.persistence.Transactional;

/**
 * @author jardim
 */
@RequestScoped
@Transactional
@Path("planejamentoAtividades")
public class PlanejamentoAtividadesController {

	@Inject
	protected EntityManager em;

	@GET
	@Produces(APPLICATION_JSON)
	@Path("procurarGrupos")
	public Atividade procurarGrupos(@QueryParam("id") Long id) {
		
		Session session1 = (Session) em.getDelegate();
		Query criteria1 = session1.createSQLQuery("delete from planejamentogrupocolaboradores ");
		criteria1.executeUpdate();
		 criteria1 = session1.createSQLQuery("delete from planejamentogrupo");
		criteria1.executeUpdate();
		
		
		System.out.println("\n\n Recuperando -- "+id);
		Atividade atividade = em.find(Atividade.class,id);
		//se a atividade já tem planejamentos usa os dela, senão procura pelos tipos
		if(atividade.getAtividadeGrupos()==null || atividade.getAtividadeGrupos().isEmpty()) {
			List<GrupoAluno> procurarGrupos = this.procurarGrupos(atividade.getTipoAtividade());
			List<AtividadeGrupo> novosGrupos = new ArrayList<AtividadeGrupo>();
			for (GrupoAluno grupo : procurarGrupos) {
				AtividadeGrupo novoPlanejamento = new AtividadeGrupo();
				novoPlanejamento.setAlunos(this.cloneAlunos(grupo.getAlunos()));
				novoPlanejamento.setColaboradores(this.cloneColaboradores(grupo.getColaboradores()));
				novoPlanejamento.setGrupo(grupo);
				novoPlanejamento.setAtividade(atividade);
				novosGrupos.add(novoPlanejamento);
				//cria o novo grupo
				this.em.persist(novoPlanejamento);
			}
			atividade.setAtividadeGrupos(novosGrupos);
			this.em.merge(atividade);
		}	
		System.out.println("Atividades: "+ atividade.getAtividadeGrupos());
		return atividade;
	}
	
	private List<Aluno> cloneAlunos(Collection<Aluno> alunos){
		List<Aluno> novosAlunos = new ArrayList<Aluno>();
		novosAlunos.addAll(alunos);
		return novosAlunos;
	}
	
	private List<Colaborador> cloneColaboradores(Collection<Colaborador> colaboradores){
		List<Colaborador> novosColaboradores = new ArrayList<Colaborador>();
		novosColaboradores.addAll(colaboradores);
		return novosColaboradores;
	}
	
	@GET
	@SuppressWarnings("unchecked")
	public List<GrupoAluno> procurarGrupos(TipoAtividade tipoAtividade) {
		
		System.out.println("\n\n procurando tipo -- "+tipoAtividade.getId());
		Session session = (Session) em.getDelegate();
		Criteria criteria = session.createCriteria(GrupoAluno.class);
		criteria.add(Restrictions.eq("tipoAtividade", tipoAtividade));
		criteria.addOrder(Order.desc("id"));
		List<GrupoAluno> list = criteria.list();
		System.out.println("\n\n procurando list -- "+list);
		return list;
	}
	
	
	@GET
	@Produces(APPLICATION_JSON)
	@Path("removerAluno")
	public Atividade removerAluno(@QueryParam("id") Long id) {
		return em.find(Atividade.class,id);
	}
	

	@POST
	@Consumes(APPLICATION_JSON)
	@Produces(APPLICATION_JSON)
	@Path("salvar")
	public Atividade salvar(Atividade atividade) {
		System.out.println("\n\n Salvando -- "+atividade.getId());
		
		//deve comparar os grupos que vieram no request contra os que já existiam no banco
		Atividade atividadeOriginal = em.find(Atividade.class,atividade.getId());
		Collection<AtividadeGrupo> planejametoMantidos = new ArrayList<AtividadeGrupo>(atividade.getAtividadeGrupos());
		Collection<AtividadeGrupo> planejametoRemovidos = new ArrayList<AtividadeGrupo>(atividadeOriginal.getAtividadeGrupos());
		System.out.println("\n\n Colecao  -- "+atividade.getAtividadeGrupos());
		System.out.println("\n\n Colecao original  -- "+atividadeOriginal.getAtividadeGrupos());
		
		planejametoMantidos.retainAll(atividadeOriginal.getAtividadeGrupos());
		planejametoRemovidos.removeAll(atividade.getAtividadeGrupos());
		
		for (AtividadeGrupo planejamento : planejametoMantidos) {
			System.out.println("\n\n Merge -- "+planejamento.getId());
			System.out.println("\n\n Comentario -- "+planejamento.getComentario());
			System.out.println("\n\n Alunos -- "+planejamento.getAlunos());
			System.out.println("\n\n Colaboradores -- "+planejamento.getColaboradores());
			AtividadeGrupo atividadeGrupo = this.em.merge(planejamento);
			//System.out.println("\n\n Alunos Mantidos -- "+atividadeGrupo.getAlunos().retainAll(planejamento.getAlunos()));
		}
		for (AtividadeGrupo planejamento : planejametoRemovidos) {
			System.out.println("\n\n Removendo -- "+planejamento.getId());
			this.em.remove(planejamento);
		}
		
		return atividade;
	}
	
}
