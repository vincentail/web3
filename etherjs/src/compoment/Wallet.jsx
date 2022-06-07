import { ethers } from 'ethers'
import React from 'react'

import { abi, contractAddress } from '../utils/constant'
import Transaction from './Transaction'

const { ethereum } = window

const getTokenContract = () => {
  if (!ethereum) {
    alert('please install metamask')
    return
  }

  const provider = new ethers.providers.Web3Provider(ethereum)
  console.log(provider)
  const signer = provider.getSigner()
  console.log(signer)

  const tokenContract = new ethers.Contract(contractAddress, abi, signer)

  console.log(tokenContract)

  return tokenContract
}

class Wallet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tokenContract: null,
      currentAccount: null,
    }
  }

  connectContract = () => {
    const contract = getTokenContract()
    contract.on('transferEvent', (from, to, amount) => {
      console.log('from:' + from)
      console.log('to:' + to)
      console.log('transfer:' + amount)
    })
    this.setState({
      tokenContract: contract,
    })
  }

  checkIfWalletIsConnected = async () => {
    if (!ethereum) return alert('please install metamask')
    // const accounts = await ethereum.request({ method: 'eth_accounts' })
    // if (accounts.length) {
    //   this.setState({ currentAccount: accounts[0] })
    // } else {
    //   console.log('no account find')
    // }
  }

  getAccount = async () => {
    if (!ethereum) {
      alert('please install metamask')
      return
    }
    // console.log('before getAccount')
    // const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    // console.log(accounts)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // MetaMask requires requesting permission to connect users accounts
    const accounts = await provider.send('eth_requestAccounts', [])
    // const accounts = await provider.send('eth_accounts')
    if (accounts.length) {
      this.setState({ currentAccount: accounts[0] })
    } else {
      console.log('no account find')
    }
  }

  render() {
    this.checkIfWalletIsConnected()
    return (
      <div>
        <h1>hello world</h1>
        <button onClick={this.connectContract}>connectContract</button>
        <button onClick={this.getAccount}>getAccount</button>
        <br />
        <h2>
          currentAccount:
          <br />
          {this.state.currentAccount}
        </h2>

        <Transaction
          contract={this.state.tokenContract}
          currentAccount={this.state.currentAccount}
        />
      </div>
    )
  }
}

export default Wallet
