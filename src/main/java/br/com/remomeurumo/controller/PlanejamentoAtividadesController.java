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
import org.hibernate.Session;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import br.com.remomeurumo.model.Aluno;
import br.com.remomeurumo.model.Atividade;
import br.com.remomeurumo.model.Colaborador;
import br.com.remomeurumo.model.GrupoAluno;
import br.com.remomeurumo.model.PlanejamentoGrupo;
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
		
		Atividade atividade = em.find(Atividade.class,id);
		//se a atividade já tem planejamentos usa os dela, senão procura pelos tipos
		if(atividade.getPlanejamentoGrupos()==null || atividade.getPlanejamentoGrupos().isEmpty()) {
			List<PlanejamentoGrupo> procurarGrupos = this.procurarGrupos();
			List<PlanejamentoGrupo> novosGrupos = new ArrayList<PlanejamentoGrupo>();
			for (PlanejamentoGrupo planejamento : procurarGrupos) {
				PlanejamentoGrupo novoPlanejamento = new PlanejamentoGrupo();
				//novoPlanejamento.setId(i--);
				novoPlanejamento.setComentario(planejamento.getComentario());
				novoPlanejamento.setPlanejamentoDeAula(planejamento.getPlanejamentoDeAula());
				novoPlanejamento.setAlunos(this.cloneAlunos(planejamento.getAlunos()));
				novoPlanejamento.setColaboradores(this.cloneColaboradores(planejamento.getColaboradores()));
				novoPlanejamento.setGrupo(planejamento.getGrupo());
				novoPlanejamento.setAtividade(atividade);
				novosGrupos.add(novoPlanejamento);
				//cria o novo grupo
				this.em.persist(novoPlanejamento);
			}
			atividade.setPlanejamentoGrupos(novosGrupos);
		}	
		
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
	public List<PlanejamentoGrupo> procurarGrupos() {

		Session session = (Session) em.getDelegate();
		Criteria criteria = session.createCriteria(GrupoAluno.class);
		List<GrupoAluno> list = criteria.list();
		ArrayList<PlanejamentoGrupo> planejamentos = new ArrayList<PlanejamentoGrupo>();
		for (GrupoAluno grupoAluno : list) {
			criteria = session.createCriteria(PlanejamentoGrupo.class);
			criteria.add(Restrictions.eq("grupo", grupoAluno));
			criteria.addOrder(Order.desc("id"));
			List<PlanejamentoGrupo> resultList = criteria.list();
			if(resultList!=null && !resultList.isEmpty()) {
				planejamentos.add(resultList.iterator().next());
			}
		}
		
		return planejamentos;
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
		Collection<PlanejamentoGrupo> planejametoMantidos = new ArrayList<PlanejamentoGrupo>(atividadeOriginal.getPlanejamentoGrupos());
		Collection<PlanejamentoGrupo> planejametoRemovidos = new ArrayList<PlanejamentoGrupo>(atividadeOriginal.getPlanejamentoGrupos());
		System.out.println("\n\n Colecao  -- "+atividade.getPlanejamentoGrupos());
		System.out.println("\n\n Colecao original  -- "+atividadeOriginal.getPlanejamentoGrupos());
		System.out.println("\n\n Colecao que mantém -- "+planejametoMantidos.retainAll(atividade.getPlanejamentoGrupos()));
		System.out.println("\n\n Diferença apagar -- "+planejametoRemovidos.removeAll(atividade.getPlanejamentoGrupos()));
		System.out.println("\n\n Colecao que mantém -- "+planejametoMantidos);
		System.out.println("\n\n Diferença apagar -- "+planejametoRemovidos);
		for (PlanejamentoGrupo planejamento : planejametoMantidos) {
			System.out.println("\n\n Merge -- "+planejamento.getId());
			this.em.merge(planejamento);
		}
		for (PlanejamentoGrupo planejamento : planejametoRemovidos) {
			System.out.println("\n\n Removendo -- "+planejamento.getId());
			this.em.remove(planejamento);
		}
		
		return atividade;
	}
	
}
