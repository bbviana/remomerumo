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
			execute(transaction::begin, !transaction.isActive());

			result = ctx.proceed();

			execute(transaction::commit, transaction.isActive());
		} catch (Exception e) {
			execute(transaction::rollback, transaction.isActive());
			e.printStackTrace();
		}

		return result;
	}

	private static void execute(Runnable runnable, boolean condition) {
		if (condition) {
			runnable.run();
		}
	}

}
