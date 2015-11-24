package br.com.remomeurumo.controller;

import br.com.remomeurumo.model.Usuario;
import br.com.remomeurumo.persistence.Transactional;

import javax.enterprise.context.RequestScoped;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

/**
 * @author bbviana
 */
@RequestScoped
@Transactional
@Path("login")
public class LoginController {

    @POST
    @Consumes(APPLICATION_JSON)
    @Produces(APPLICATION_JSON)
    @Path("logar")
    public Usuario logar(Usuario usuario) {
        return usuario;
    }
}
