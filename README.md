# Remo Meu Rumo

## Arquitetura

### Client

* ReactJS
* Ecma Script 6
* HTML 5
* CSS 3

### Server

* Java 8
* JAX-RS, Jersey
* Servlet 3.1
* CDI
* Postgres
* Tomcat 8

### Ambiente

* Gulp
* Browserify
* Babel (6to5)
* Maven
* NPM

# Instalação
`npm install`

`mvn clean install`

# Desenvolvimento

## Relacionamentos (Associações)

Anote com **associationFilter** para que o json da Associação contenha apenas *id* e *nome*.

```java
public class Aluno {
    @JsonFilter("associationFilter")
    private Collection<Responsavel> responsaveis;

}
```

```
{
    data: {
        nome: 'Aluno 1',
        responsaveis: [
            {id: 1, nome: 'Responsável 1'},
            {id: 2, nome: 'Responsável 2'}
        ]
    }
}
```

Carregue os relacionamentos no **Controller**

```java
public class AlunosController extends CrudController<Aluno> {
    @Override
	protected void postBlank(Result<Aluno> result) {
		result.addAssociation("grupos", findAll(GrupoAluno.class));
		result.addAssociation("responsaveis", findAll(Responsavel.class));
	}

	@Override
	protected void postLoad(Result<Aluno> result) {
		postBlank(result);
	}
}
```

Na **view**:

- defaultValue: passe o **id** (ou ids). Use o método **id()** para evitar valores **undefined**
- onChange: use um handler especial **handleAssociationChange**

#### toOne

```html
<Input type="select" label="Grupo" name="grupo"
    defaultValue={id(aluno.grupo)} onChange={handleAssociationChange}>
    <option value="">Selecione...</option>
    {grupos.map((element, i) =>
        <option key={i} value={element.id}>{element.nome}</option>
    )}
</Input>
```

#### to Many

As diferenças são: **multiple**, defaultValue usa **ids()** em vez de **id()**
```html
<Input type="select" label="Responsáveis" name="responsaveis"
       defaultValue={ids(aluno.responsaveis)} onChange={handleAssociationChange} multiple>
    <option value="">Selecione...</option>
    {responsaveis.map((element, i) =>
        <option key={i} value={element.id}>{element.nome}</option>
    )}
</Input>
```
