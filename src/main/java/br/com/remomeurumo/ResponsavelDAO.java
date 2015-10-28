package br.com.remomeurumo;

import br.com.remomeurumo.persistence.Transactional;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

/**
 * @author jardim
 */
@ApplicationScoped
@Transactional
public class ResponsavelDAO {

    @Inject
    private EntityManager em;

    public Responsavel insert(Responsavel entity) {
        em.persist(entity);
        return entity;
    }

    public Responsavel update(Responsavel entity) {
        em.merge(entity);
        return entity;
    }

    public List<Responsavel> list() {
        TypedQuery<Responsavel> query = em.createQuery("SELECT a FROM Responsavel a", Responsavel.class);
        return query.getResultList();
    }

    public Responsavel find(Long id) {
        return em.find(Responsavel.class, id);
    }

    public void remove(Long id) {
        Responsavel entity = em.find(Responsavel.class, id);
        em.remove(entity);
    }
}
