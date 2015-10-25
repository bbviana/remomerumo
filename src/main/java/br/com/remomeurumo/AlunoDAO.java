package br.com.remomeurumo;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

/**
 * @author bbviana
 */
@ApplicationScoped
public class AlunoDAO {

    @Inject
    private EntityManager em;

    public Aluno insert(Aluno entity) {
        em.persist(entity);
        return entity;
    }

    public Aluno update(Aluno entity) {
        em.merge(entity);
        return entity;
    }

    public List<Aluno> list() {
        TypedQuery<Aluno> query = em.createQuery("SELECT a FROM Aluno a", Aluno.class);
        return query.getResultList();
    }

    public Aluno find(Long id) {
        return em.find(Aluno.class, id);
    }

    public void remove(Long id) {
        Aluno entity = em.find(Aluno.class, id);
        em.remove(entity);
    }
}
