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

## Crud

Para criar um CRUD seguindo o framework:

#### Entidade

- Estender **BaseEntity**
- Marcar Associações com **associationFilter**

```java

@Entity
public class GrupoAluno extends BaseEntity {

    private String nome;

	@JsonFilter("associationFilter")
	@OneToMany(mappedBy = "grupo")
	private Collection<Aluno> alunos;

}
```

#### Controller

- Estender **CrudController**
- Usar **@RequestScoped**
- Carregar **relacionamentos** nos métodos **postBlank()** e **postLoad()**

``` java
@RequestScoped
@Path("grupoAlunos")
public class GrupoAlunosController extends CrudController<GrupoAluno> {

	protected Class<GrupoAluno> getType() {
		return GrupoAluno.class;
	}

	@Override
	protected void postBlank(Result<GrupoAluno> result) {
		result.addAssociation("alunos", findAll(Aluno.class));
	}

	@Override
	protected void postLoad(Result<GrupoAluno> result) {
		postBlank(result);
	}
}

```

#### Client-Controller (Javascript)

- Estender **CrudController**
- No contrutor, espcificar o **path**
- **Exportar** uma instância (operador new)

``` js
import {Controller, Request} from '../helpers'
import {CrudController} from '../crud'

class GrupoAlunosController extends CrudController {
    constructor(){
        super("grupoAlunos")
    }
}

export default new GrupoAlunosController()

```

#### Client-View (React)

- **render()** deve devolver `<Crud />`

```js
import React, {Component, PropTypes} from 'react'
import {Crud} from '../crud'
import {GruppoAlunosController} from '../controllers'
import {Input} from 'react-bootstrap'

class GrupoAlunos extends Component {
    componentDidMount = () => GrupoAlunosController.list()

    searchSchema = (search) =>
        <Input type="text" name="nome" degaultValue={search.nome}/>

    listSchema = {
        header: () =>
            <tr>
                <th>ID</th>
                <th>Nome</th>
            </tr>,

        body: (grupoAluno) =>
            <tr>
                <td>{grupoAluno.id}</td>
                <td>{grupoAluno.nome}</td>
            </tr>
    }

    formSchema = (grupoAluno) =>
        <div>
            <Input type="text" label="Nome" name="nome" defaultValue={grupoAluno.nome}/>
        </div>

    render = () =>
        <Crud title="Grupo de Alunos"
              controller={AlunosController}
              searchSchema={this.searchSchema}
              listSchema={this.listSchema}
              formSchema={this.formSchema} />
}


export default GrupoAlunos

```

### Relacionamentos (Associações)

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

```
{
    data: {},
    associations: {
        grupos: [{id: 1, nome: 'Grupo 1'}],
        responsaveis: [{id: 1, nome: 'Responsavel 1'}]
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
