import React from 'react';
import {Button, Form, FormGroup, Checkbox, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

const SignUp = ({ onChange }) => (
  <div className="container-full">
    <div className="col-xs-3 col-md-4">
    </div>
    <div className="col-xs-6 col-md-4">
      <h2>Create Account</h2>
      <Form>
        <FieldGroup
          id="signUpEmailAddress"
          type="email"
          label="Email address"
          placeholder="Enter email"
        />
        <FieldGroup
          id="signUpPassword"
          label="Password"
          type="password"
          placeholder="Password"
        />
        <FieldGroup
          id="signUpConfirmationPassword"
          label="Password"
          type="password"
          placeholder="Confirm Password"
        />
        <Checkbox checked readOnly>
          I agree to the terms
        </Checkbox>
        <Button type="submit" bsStyle="primary">
          Submit
        </Button>
      </Form>
    </div>
    <div className="col-xs-3 col-md-4">
    </div>
  </div>
)

export default SignUp;
