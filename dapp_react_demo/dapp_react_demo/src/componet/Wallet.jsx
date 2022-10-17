import React from 'react'
import { ethers } from 'ethers'

class Wallet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentAccount: null,
      contract: null,
    }
  }

  connectAccount = async () => {
    const { ethereum } = window
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(ethereum)
    console.log(provider)

    // MetaMask requires requesting permission to connect users accounts
    const accounts = await provider.send('eth_requestAccounts', [])
    console.log(accounts)
    this.setState({
      currentAccount: accounts[0],
    })
  }

  handleOnChange = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  tranferEth = async () => {
    const ethAmount = ethers.utils.parseEther(this.state.amount)
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: this.state.currentAccount,
          to: this.state.toAddress,
          value: ethAmount._hex,
        },
      ],
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.connectAccount}>connectAccount</button>
        <br />
        <h2>{this.state.currentAccount}</h2>

        <div>
          toAddress:
          <input type="text" onChange={this.handleOnChange} name="toAddress" />
          <br />
          amount:
          <input type="number" onChange={this.handleOnChange} name="amount" />
          <br />
          <button onClick={this.tranferEth}>tranferEth</button>
        </div>
      </div>
    )
  }
}

export default Wallet
