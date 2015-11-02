import React, {Component, PropTypes} from 'react'
import {Button, Glyphicon, Navbar, NavBrand} from 'react-bootstrap';
import {AlunosController} from '../../controllers'
import {Busca, Form, Lista} from './'

class Alunos extends Component {
    state = AlunosController.state

    componentDidMount(){
        AlunosController.listen(this);
        AlunosController.list({page: 1});
    }

    componentWillUnmount() {
        AlunosController.unlisten(this);
    }

    render = () =>
        <div style={styles.app}>
            <Navbar fixedTop={true} fluid={true} inverse={true}>
                <NavBrand><a href="#">Remo meu Rumo</a></NavBrand>
            </Navbar>

            <Content>
               <Busca />

                <Lista list={this.state.alunos} currentPage={this.state.currentPage} totalPages={this.state.totalPages}/>

                <Button style={styles.newButton} bsStyle="primary" onClick={AlunosController.blank}>
                    <Glyphicon glyph="plus-sign"/> Novo Aluno
                </Button>
            </Content>

            <Form show={this.state.showForm} aluno={this.state.aluno}/>
        </div>
}

const Content = (props) =>
	<div style={styles.content}>
        {props.children}
	</div>



const styles = {
    app: {
        paddingTop: 50
    },

    content: {
        padding: 20
    },

    newButton: {
        margin: 20
    }
}

export default Alunos