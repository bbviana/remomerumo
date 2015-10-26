package br.com.remomeurumo.persistence;

import javax.enterprise.context.RequestScoped;
import javax.enterprise.inject.Disposes;
import javax.enterprise.inject.Produces;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import static com.google.common.base.Objects.firstNonNull;

public class EntityManagerProducer {

    private static EntityManagerFactory factory;

    private EntityManagerFactory getFactory() {
        if (factory == null) {
            String persistenceUnitName = firstNonNull(System.getProperty("enviroment"), "production");
            factory = Persistence.createEntityManagerFactory(persistenceUnitName);
        }

        return factory;
    }

    public static void clearEntityManagerFactory() {
        factory = null;
    }

    @Produces
    @RequestScoped
    public EntityManager createEntityManager() {
        return getFactory().createEntityManager();
    }

    public void closeEntityManagaer(@Disposes EntityManager manager) {
        manager.close();
    }

}
