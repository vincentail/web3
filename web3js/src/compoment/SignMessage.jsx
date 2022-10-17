import React from 'react'

import Web3 from 'web3'

import Accounts from 'web3-eth-accounts'

class SignMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      web3: new Web3(null),
      message: null,
      account: new Accounts(),
      privatekey:
        '0xbe6383dad004f233317e46ddb46ad31b16064d14447a95cc1d8c8d4bc61c3728',
    }
  }

  changeMessage = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      message: e.target.value,
    }))
  }

  testSign = () => {
    const hash = this.state.web3.utils.keccak256(this.state.message)
    const { r, s, v } = this.state.account.sign(hash, this.state.privateKey)
    const signature = this.state.web3.eth.abi.encodeParameters(
      ['bytes32', 'bytes32', 'uint8'],
      [r, s, v]
    )
    console.log(signature)
  }

  render() {
    return (
      <div>
        <br />
        <input onChange={this.changeMessage} placeholder="message" />
        <br />
        <button onClick={this.testSign}>sign</button>
      </div>
    )
  }
}

export default SignMessage
