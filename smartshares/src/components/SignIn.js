import React from 'react';
import {Button, FormGroup, Checkbox, ControlLabel, FormControl, HelpBlock} from 'react-bootstrap';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

const SignIn = ({ onChange }) => (
  <div>
    <div className="col-xs-3 col-md-4">
    </div>
    <div className="col-xs-6 col-md-4">
      <h2>Sign In</h2>
      <form>
        <FieldGroup
          id="signInEmailAddress"
          type="email"
          label="Email address"
          placeholder="Email"
        />
        <FieldGroup
          id="signInPassword"
          label="Password"
          type="password"
          placeholder="Password"
        />
        <Checkbox checked>
          Keep me logged in
        </Checkbox>
        <Button type="submit" className="btn btn-default" bsStyle="primary">Submit</Button>
      </form>
    </div>
    <div className="col-xs-3 col-md-4">
    </div>
  </div>
)

export default SignIn;
