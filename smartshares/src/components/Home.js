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

const Home = ({ onChange }) => (
    <div>
        <div className="col-xs-3 col-md-2">
        </div>
        <div className="col-xs-6 col-md-8">
            <div id="main">
                <div>
                    <span class="avatar">
                        <a href='index.html'>
                            <img src="images/icon.png" alt="" />
                        </a>
                    </span>
                    <h1>Manage your Cap Table on the Blockchain</h1>
                    <h3>No more Excel Spreadsheets, spread out DocuSigned documents, and mis-managed vesting</h3>                          
                </div>
            </div>
        </div>
        <div className="col-xs-3 col-md-2">
        </div>
    </div>
)

export default Home;
