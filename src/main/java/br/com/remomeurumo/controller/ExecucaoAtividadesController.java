package br.com.remomeurumo.controller;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

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
import org.hibernate.criterion.Restrictions;

import br.com.remomeurumo.model.Aluno;
import br.com.remomeurumo.model.AlunoAtividade;
import br.com.remomeurumo.model.Atividade;
import br.com.remomeurumo.model.AtividadeGrupo;
import br.com.remomeurumo.persistence.Transactional;

/**
 * @author jardim
 */
@RequestScoped
@Transactional
@Path("execucaoAtividades")
public class ExecucaoAtividadesController {

	@Inject
	protected EntityManager em;

	@GET
	@Produces(APPLICATION_JSON)
	@Path("procurarAlunos")
	public Atividade procurarAlunos(@QueryParam("id") Long id) {
		Atividade atividade = em.find(Atividade.class, id);
		return atividade;
	}

	@POST
	@Consumes(APPLICATION_JSON)
	@Produces(APPLICATION_JSON)
	@Path("salvar")
	public Atividade salvar(Atividade atividade) {

		// deve comparar os grupos que vieram no request contra os que já
		// existiam no banco
		Atividade atividadeOriginal = em.find(Atividade.class,
				atividade.getId());
		for (AtividadeGrupo planejamento : atividade.getAtividadeGrupos()) {
			if (atividadeOriginal.getAtividadeGrupos().contains(planejamento)) {
				for (Aluno aluno : planejamento.getAlunos()) {
					AlunoAtividade alunoAtividade = findByAlunoAtividade(aluno,
							atividadeOriginal);
					if (alunoAtividade == null) {
						alunoAtividade = new AlunoAtividade();
						alunoAtividade.setAtividade(atividade);
						alunoAtividade.setAluno(aluno);
						alunoAtividade.setComentario(planejamento.getComentario());
						this.em.persist(alunoAtividade);
					} else {
						alunoAtividade.setComentario(planejamento.getComentario());
						this.em.merge(alunoAtividade);
					}
				}
				AtividadeGrupo atividadeGrupo = em.find(AtividadeGrupo.class,
						planejamento.getId());
				atividadeGrupo.setComentario(planejamento.getComentario());
				this.em.merge(atividadeGrupo);
			}
		}
		atividadeOriginal.setExecutada(true);
		atividadeOriginal.setComentario(atividade.getComentario());
		this.em.merge(atividadeOriginal);
		return atividade;
	}

	private AlunoAtividade findByAlunoAtividade(Aluno aluno, Atividade atividade) {

		Session session = (Session) em.getDelegate();
		Criteria criteria = session.createCriteria(AlunoAtividade.class);
		criteria.add(Restrictions.eq("aluno", aluno));
		criteria.add(Restrictions.eq("atividade", atividade));

		List<AlunoAtividade> list = criteria.list();
		if (list != null && !list.isEmpty())
			return list.get(0);

		return null;
	}

}
