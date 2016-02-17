CREATE OR REPLACE VIEW usuariopermissao AS 
select u.nome nome, p.nome permissao from usuario_permissao up, usuario u, permissao p
where u.id=up.usuarios_id and p.id=up.permissoes_id;