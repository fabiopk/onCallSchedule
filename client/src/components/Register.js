import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";

const options = [
  { key: "p", text: "Perito", value: "PERITO" },
  { key: "f", text: "Fotógrafo", value: "FOTO" },
  { key: "o", text: "Administrativo", value: "OTHER" }
];

const customSelect = () => {
  return <Form.Select options={options} onChange={e => console.log(e)} />;
};

class Register extends Component {
  render() {
    return (
      <Grid
        textAlign='center'
        style={{ height: "100vh", backgroundColor: "#f1f1f1" }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 600 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Crie sua conta
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Group widths='equal'>
                <Field
                  name='firstName'
                  fluid
                  placeholder='Primeiro Nome'
                  component={Form.Input}
                />
                <Field
                  name='lastName'
                  fluid
                  placeholder='Sobrenome'
                  component={Form.Input}
                />
              </Form.Group>
              <Field
                fluid
                name='type'
                options={options}
                placeholder='Cargo'
                component={customSelect}
              />

              <Field
                fluid
                name='email'
                icon='user'
                iconPosition='left'
                placeholder='E-mail address'
                component={Form.Input}
              />
              <Form.Group widths='equal'>
                <Field
                  fluid
                  name='password'
                  icon='lock'
                  iconPosition='left'
                  placeholder='Senha'
                  type='password'
                  component={Form.Input}
                />
                <Field
                  fluid
                  name='password2'
                  icon='lock'
                  iconPosition='left'
                  placeholder='Repetir senha'
                  type='password'
                  component={Form.Input}
                />
              </Form.Group>
              <Button color='teal' fluid size='large'>
                Criar conta
              </Button>
            </Segment>
          </Form>
          <Message>
            Já possui conta? <a href='#'>Faça login</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default reduxForm({
  form: "register" // a unique identifier for this form
})(Register);
