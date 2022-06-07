import React from 'react'

import { ethers } from 'ethers'

class Transaction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toAddress: '',
      amount: '',
    }
  }

  handleFormChange = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  submitTransaction = async () => {
    const { ethereum } = window
    const ethAmount = ethers.utils.parseEther(this.state.amount)
    await ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: this.props.currentAccount,
          to: this.state.toAddress,
          value: ethAmount._hex,
        },
      ],
    })
    const balance = await this.props.contract.balanceOf(
      this.props.currentAccount
    )
    console.log('balance:' + balance)
  }

  transferToken = async () => {
    const transaction = await this.props.contract.transfer(
      this.state.toAddress,
      100
    )
    console.log(transaction)
    const balance = await this.props.contract.balanceOf(this.state.toAddress)
    console.log('balance:' + balance)
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
          step="0.0001"
          placeholder="amount (eth)"
          onChange={this.handleFormChange}
          value={this.state.amount}
        />
        <br />
        <button onClick={this.submitTransaction}>submit</button>
        <br />
        <button onClick={this.transferToken}>transferToken</button>
      </div>
    )
  }
}

export default Transaction
