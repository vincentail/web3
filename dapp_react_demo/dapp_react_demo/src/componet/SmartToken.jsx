import React from 'react'
import { ethers } from 'ethers'
import abi from '../constant/MyToken'

class SmartToken extends React.Component {
  constructor(props) {
    super(props)

    const contractAddress = '0x14dd098516bAAE5ef6982e7C7601C0076aE2F6BD'
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    console.log(provider)
    const signer = provider.getSigner()
    console.log(signer)
    const tokenContract = new ethers.Contract(contractAddress, abi.abi, signer)

    tokenContract.on('tranferSuccess', (from, toAddress, amount) => {
      console.log('from:', from)
      console.log('to', toAddress)
      console.log('amount:', amount)
    })
    this.state = {
      toAddress: '',
      amount: '',
      contract: tokenContract,
    }
  }

  handleFormChange = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  transferToken = async () => {
    const transaction = await this.state.contract.transferAmount(
      this.state.toAddress,
      this.state.amount
    )
    console.log(transaction)
  }

  getBalance = async () => {
    const amount = await this.state.contract.balanceOf(this.state.toAddress)
    console.log(amount)
  }

  render() {
    return (
      <div>
        <input
          type="text"
          name="toAddress"
          placeholder="Address To"
          onChange={this.handleFormChange}
          value={this.state.toAddress}
        />
        <input
          type="number"
          name="amount"
          step="1"
          placeholder="amount(MyToken)"
          onChange={this.handleFormChange}
          value={this.state.amount}
        />
        <br />
        <button onClick={this.transferToken}>transferToken</button>
        <br />
        <button onClick={this.getBalance}>getBalance</button>
      </div>
    )
  }
}

export default SmartToken
