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

class Login extends Component {
  render() {
    return (
      <Grid
        textAlign='center'
        style={{ height: "100vh", backgroundColor: "#f1f1f1" }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Entre na sua conta
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Field
                fluid
                name='email'
                icon='user'
                iconPosition='left'
                placeholder='E-mail address'
                component={Form.Input}
              />
              <Field
                fluid
                name='password'
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                component={Form.Input}
              />

              <Button color='teal' fluid size='large'>
                Login
              </Button>
            </Segment>
          </Form>
          <Message>
            Não possui conta? <a href='#'>Registre-se</a>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default reduxForm({
  form: "login" // a unique identifier for this form
})(Login);
