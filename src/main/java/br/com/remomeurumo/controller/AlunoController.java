package br.com.remomeurumo.controller;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import br.com.remomeurumo.Aluno;

/**
 * @author bbviana
 */
@Path("alunos")
@ApplicationScoped
@Produces(APPLICATION_JSON)
public class AlunoController {

    @Inject
    private AlunoDAO alunoDAO;

    @POST
    @Consumes(APPLICATION_JSON)
    public Aluno insert(Aluno aluno) {
        return alunoDAO.insert(aluno);
    }

    @PUT
    @Path("{id}")
    @Consumes(APPLICATION_JSON)
    public Aluno update(@PathParam("id") Long id, Aluno aluno) {
        return alunoDAO.update(aluno);
    }

    @GET
    @Path("{id}")
    public Aluno get(@PathParam("id") Long id) {
        return alunoDAO.find(id);
    }

    @GET
    public List<Aluno> list() {
        return alunoDAO.list();
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Long id) {
        alunoDAO.remove(id);
    }
}
