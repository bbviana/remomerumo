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
package br.com.remomeurumo.framework;

import java.lang.reflect.Method;

/**
 * @author bbviana
 */
@SuppressWarnings("unchecked")
public class Beans {

	public static <T> T property(Object bean, String propertyName) {
		try {
			Method getter = bean.getClass().getMethod("get" + firstWordToUpperCase(propertyName));
			return (T) getter.invoke(bean);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	private static String firstWordToUpperCase(String string) {
		return Character.toUpperCase(string.charAt(0)) + string.substring(1);
	}
}
