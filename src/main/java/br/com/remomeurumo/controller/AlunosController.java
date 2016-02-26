package br.com.remomeurumo.controller;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Order;

import br.com.remomeurumo.framework.AuditoriaService;
import br.com.remomeurumo.framework.CrudController;
import br.com.remomeurumo.framework.Result;
import br.com.remomeurumo.model.Aluno;
import br.com.remomeurumo.model.Responsavel;

/**
 * @author bbviana
 */
@RequestScoped
@Path("alunos")
public class AlunosController extends CrudController<Aluno> {


	protected Class<Aluno> getType() {
		return Aluno.class;
	}

	@Override
	protected void postBlank(Result<Aluno> result) {
		result.addAssociation("responsaveis", findAllAtivos(Responsavel.class));
	}

	@Override
	protected void postLoad(Result<Aluno> result) {
		postBlank(result);
	}
	
	@GET
    @Path("arquivoCsv")
    @Produces("text/plain")
	@Override
    public Response getTextFile() {
	 
		StringBuilder returnString = new StringBuilder();
		
		Session session = (Session) em.getDelegate();
		Criteria criteria = session.createCriteria(getType());
		criteria.addOrder(Order.asc("nome"));
		criteria.addOrder(Order.desc("id"));

		List<Aluno> list = criteria.list();
		for (Aluno t : list) {
			returnString.append(t.getId());
			returnString.append(","+t.getNome());
			returnString.append(","+t.getApelido());
			returnString.append("\n");
		}
		
		InputStream stream = new ByteArrayInputStream(returnString.toString().getBytes(StandardCharsets.UTF_8));
        ResponseBuilder response = Response.ok(stream);
		        response.header("Content-Disposition", "attachment; filename=\"alunos.csv\"");
		        
	   return response.build();
    }

}