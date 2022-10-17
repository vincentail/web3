import React from 'react'

import abi from '../constant/MyDataFeedConsumer.json'
import { ethers } from 'ethers'

class PriceFeed extends React.Component {
  constructor(props) {
    super(props)
    const contractAddress = '0x14dd098516bAAE5ef6982e7C7601C0076aE2F6BD'
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi.abi, signer)
    this.state = {
      currentAccount: null,
      contract: contract,
      price: null,
    }
  }

  getPrice = async () => {
    const price = await this.state.contract.getLatestPrice()
    console.log(price.toNumber())
    this.setState((preState) => ({ ...preState, price: price.toNumber() }))
  }

  render() {
    return (
      <div>
        <button onClick={this.getPrice}>getPrice</button>
        <h1>price:{this.state.price}</h1>
      </div>
    )
  }
}

export default PriceFeed
