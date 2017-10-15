import React from 'react';
import firebase from '../fire';
import ShareContract from '../sol/Share.json'
import getWeb3 from '../util/getWeb3'

class Shareholders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      title: '',
      email: '',
      sharecount: '',
      investor: false,
      board: false,
      sharePercentage: '',
      shareholders: [],
      totalShares: 0,
      web3: null,
      address: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  refreshShareholders() {
    const shareholdersRef = firebase.database().ref('shareholders');
    let totalShares = 0;
    shareholdersRef.on('value', (snapshot) => {
      let shareholders = snapshot.val();
      let newState = [];

      for (let shareholder in shareholders) {
        let sharholderShares = Number.parseInt(shareholders[shareholder].sharecount, 10);
        totalShares += sharholderShares;
      }
      this.setState({
        totalShares: totalShares
      });

      for (let shareholder in shareholders) {
        let sharholderShares = Number.parseInt(shareholders[shareholder].sharecount, 10);
        newState.push({
          id: shareholder,
          firstname: shareholders[shareholder].firstname,
          lastname: shareholders[shareholder].lastname,
          title: shareholders[shareholder].title,
          email: shareholders[shareholder].email,
          sharecount: shareholders[shareholder].sharecount,
          investor: (shareholders[shareholder].investor == 'on') ? 'YES' : '',
          board: (shareholders[shareholder].board == 'on') ? 'YES' : '',
          sharePercentage: ((sharholderShares / totalShares) * 100).toFixed(2)
        });
      }
      var shareholdersSorted = newState.sort((a, b) => Number(b.sharecount) - Number(a.sharecount));
      this.setState({
        shareholders: newState
      });
    });
  }

  componentDidMount() {
    this.refreshShareholders();

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  addNewSharesContract(toAccount, amount) {
    const contract = require('truffle-contract');
    const shareContract = contract(ShareContract);
    shareContract.setProvider(this.state.web3.currentProvider);
    shareContract.defaults({
      gas: 447678,
      gasPrice: 100000000000
    });;
    // this.state.web3.eth.getBalance(my_test_address).then(console.log);
    var shareContractInstance;

    // Get accounts and then get the share contract and create shares for the newly created account
    this.state.web3.eth.getAccounts((error, accounts) => {
      shareContract.deployed().then((instance) => {
        shareContractInstance = instance;
        return shareContractInstance.create(toAccount, amount, { from: accounts[0].toLowerCase() });
      }).then((result) => {
        return shareContractInstance.getBalance(toAccount);
      }).then((result) => {
        alert("Address " + toAccount + " received " + result.c[0] + " new shares");
      });
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var account = this.state.web3.eth.accounts.create();
    this.addNewSharesContract(account.address, this.state.sharecount);

    const shareholdersRef = firebase.database().ref('shareholders');
    const shareholder = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      title: this.state.title,
      email: this.state.email,
      sharecount: this.state.sharecount,
      investor: this.state.investor,
      board: this.state.board,
      account: account.address
    }
    shareholdersRef.push(shareholder);
    this.setState({
      firstname: '',
      lastname: '',
      title: '',
      email: '',
      sharecount: '',
      investor: false,
      board: false,
      account: ''
    });
    this.refreshShareholders();
  }

  removeItem(shareholderId) {
    const shareholderRef = firebase.database().ref(`/shareholders/${shareholderId}`);
    shareholderRef.remove();
    this.refreshShareholders();
  }

  render () {
    return (
      <div>
        <div className="col-xs-1 col-md-1">
        </div>
        <div className="col-xs-10 col-md-10">
          <div className='app'>
            <header>
              <div className='wrapper'>
                <h1>Shareholders</h1>
              </div>
              <div>
                Total Shares: {this.state.totalShares}
              </div>
              <div>
                Total Shareholders: {this.state.shareholders.length}
              </div>
            </header>
            <h3>Add a New Shareholder</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>First Name</label>
                <input type="text" className="form-control" name="firstname" placeholder="What's your firstname?" onChange={this.handleChange} value={this.state.firstname} />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" className="form-control" name="lastname" placeholder="What's your lastname?" onChange={this.handleChange} value={this.state.lastname} />
              </div>
              <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" name="title" placeholder="What's your title?" onChange={this.handleChange} value={this.state.title} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" name="email" placeholder="What's your email?" onChange={this.handleChange} value={this.state.email} />
              </div>
              <div className="form-group">
                <label>Number of Shares Owned</label>
                <input type="number" className="form-control" name="sharecount" placeholder="How many shares do you own?" onChange={this.handleChange} value={this.state.sharecount} />
              </div>
              <div className="form-group">
                <input type="checkbox" name="investor" checked={this.state.investor} onChange={this.handleChange} /> Investor
              </div>
              <div className="form-group">
                <input type="checkbox" name="board" checked={this.state.board} onChange={this.handleChange} /> Board Member
              </div>
              <button className="btn btn-primary">Add Shareholder</button>
            </form>
            <div className="wrapper">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Title</th>
                    <th>Email</th>
                    <th>Number of Shares</th>
                    <th>Percentage Owned</th>
                    <th>Investor</th>
                    <th>Board</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.shareholders.map((shareholder) => {
                      return (
                        <tr key={shareholder.id}>
                          <td>{shareholder.firstname} {shareholder.lastname}</td>
                          <td>{shareholder.title}</td>
                          <td>{shareholder.email}</td>
                          <td>{shareholder.sharecount}</td>
                          <td>{shareholder.sharePercentage}%</td>
                          <td>{shareholder.investor}</td>
                          <td>{shareholder.board}</td>
                          <td><button className="btn btn-danger" onClick={() => this.removeItem(shareholder.id)}>Remove</button></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-xs-1 col-md-1">
        </div>
      </div>
    );
  }
}

export default Shareholders;
