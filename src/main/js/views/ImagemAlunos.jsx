import React, {Component, PropTypes} from 'react'
import {Request} from '../helpers'
import {id, ids} from '../crud/Associations'
import {Image, Input, FormControl, FormGroup, ControlLabel, Row, Col, Grid, Panel, Glyphicon, MenuItem, Nav, Navbar, NavBrand, NavItem, Button, ButtonToolbar} from 'react-bootstrap';

class ImagemAlunos extends Component {

    state = {
        id: "",
        nome: "",
        nomeAluno: "",
        imagemAtual: "",
        arquivoSelecionado: "",
        conteudoImagem: ""
    }

    carregarImagem = (event) => {
        event.preventDefault(); 
		this.setState({
			arquivoSelecionado: event.target.files[0],
			nome: event.target.files[0].name
		})
		
	    let reader = new FileReader();
	    let file = event.target.files[0];
	
	    reader.onloadend = () => {
	      this.setState({
	        arquivoSelecionado: file,
	        conteudoImagem: reader.result
	      });
	    }
	
	    reader.readAsDataURL(file)
			
	}
	
    salvarImagem = (event) => {
        event.preventDefault()
        
	    Request.post('api/imagemAlunos/salvar', this.state)
	    .then(imagemAluno =>{ 
//	        this.setState({
//	            id: imagemAluno.aluno.id,
//	            nome: imagemAluno.nome
//	        });
	    	$.toaster({ title: 'Sucesso', message : 'Imagem Salva', settings: {timeout: 3000} });
	    	window.opener.document.getElementById("ImagemPreview").setAttribute("src", this.state.conteudoImagem);
	    }
    )}
	
    carregarAluno = () => {
        Request.get('api/imagemAlunos/procurarAluno', {
            id: this.props.id
        })
        .then(aluno => { 
        	this.setState({
        		id: aluno.id,
        		nomeAluno: aluno.nome,
        		conteudoImagem: aluno.imagemAluno
        	});
         }
        )
    }
    
    componentDidMount = () => {
    	this.carregarAluno()
    }
    
    render = () =>
    <div style={s.app}>
    <Navbar fixedTop fluid inverse>
        <Navbar.Brand>
            <a href="?login">Remo meu Rumo</a>
        </Navbar.Brand>
        <Nav>
        	<NavItem eventKey={1} href="#"><Glyphicon glyph="chevron-right"/>&nbsp;&nbsp; Planejamento de Atividades</NavItem>
        </Nav>
        <Nav pullRight eventKey={0}> {/* This is the eventKey referenced */}
            <NavItem eventKey={1} href="#">
                <Glyphicon glyph="flag"/>&nbsp;&nbsp;Aluno : {this.state.nomeAluno}
            </NavItem>
            
            <NavItem eventKey={2} onClick={() => window.close()}>
        		<Glyphicon glyph="remove"/>
        	</NavItem>
        </Nav>
    </Navbar>
    
        <div className="container-fluid">
            <form style={s.form} onSubmit={this.salvarImagem}>
                
                	<div>
                	<Grid fluid>	
	        		<Row className="show-grid">
    	        		<Col xs={20} md={10}>&nbsp;</Col>
    	          	</Row>
    	            <Row className="show-grid">
    	        		<Col xs={2} md={2}>&nbsp;</Col>
    	        		<Col xs={12} md={6}>Foto do Aluno: <strong>{this.state.nomeAluno}</strong></Col>
    	        		<Col xs={6} md={2}>&nbsp;</Col>
    	          	</Row>                  	
    	          	<Row className="show-grid">
    	          		<Col xs={2} md={2}>&nbsp;</Col>
		        		<Col xs={12} md={2}><div class="text-center"><img src={this.state.conteudoImagem} id="ImagemPreview"/></div></Col>
		        		<Col xs={6} md={2}>&nbsp;</Col>
	          	    </Row>
          	      <Row className="show-grid">
          	      	<Col xs={2} md={2}>&nbsp;</Col>
          	        <Col xs={12} md={2}>
          	           <input type="file" onChange={this.carregarImagem} style={{display: 'none'}} ref={fileInput => this.fileInput = fileInput}/>
          	        </Col>
  	               <Col xs={6} md={2}>&nbsp;</Col>
	          	</Row>
	          	<Row className="show-grid">
	          	    <Col xs={2} md={2}>&nbsp;</Col>
	        		<Col xs={12} md={6}>
        			<ButtonToolbar>
        				<Button bsSize="medium" bsStyle="success" onClick={() => this.fileInput.click()}>Selecionar Imagem ...</Button>
        				<Button bsSize="medium" bsStyle="primary" type="submit">Salvar Imagem</Button>
        			</ButtonToolbar>
	                </Col>
	               <Col xs={6} md={2}>&nbsp;</Col>
          	   </Row>
	          	    
        	      </Grid>
                   </div>
                
            </form>
        </div>
    </div>
}

const s = {
form: {
    padding: 15,
    margin: "0 auto"
},

button: {
	cursor: "pointer"
},
app: {
    paddingTop: 50
}
}

export default ImagemAlunos
