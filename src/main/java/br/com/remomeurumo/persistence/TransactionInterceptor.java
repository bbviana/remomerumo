/*
 * Copyright (c) 1999-2010 Touch Tecnologia e Informatica Ltda.
 *
 * R. Gomes de Carvalho, 1666, 3o. Andar, Vila Olimpia, Sao Paulo, SP, Brasil.
 *
 * Todos os direitos reservados.
 * Este software e confidencial e de propriedade da Touch Tecnologia e Informatica Ltda. (Informacao Confidencial)
 * As informacoes contidas neste arquivo nao podem ser publicadas, e seu uso esta limitado de acordo
 * com os termos do contrato de licenca.
 */
package br.com.remomeurumo.persistence;

import javax.enterprise.context.Dependent;
import javax.inject.Inject;
import javax.interceptor.AroundInvoke;
import javax.interceptor.Interceptor;
import javax.interceptor.InvocationContext;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;

/**
 * @author bbviana
 */
@Transactional
@Interceptor
@Dependent
public class TransactionInterceptor {

    @Inject
    private EntityManager em;

    @AroundInvoke
    public Object manageTransaction(InvocationContext ctx) throws Exception {
        EntityTransaction transaction = em.getTransaction();
        Object result = null;

        try {
            System.out.println("tx:begin");
            transaction.begin();
            result = ctx.proceed();
            transaction.commit();
            System.out.println("tx:commit");
        } catch (Exception e) {
            System.out.println("tx:rollback");
            transaction.rollback();
            e.printStackTrace();
        }

        return result;
    }

}
