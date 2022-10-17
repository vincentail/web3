import React from 'react'

import Web3 from 'web3'

class SignTest extends React.Component {
  constructor(props) {
    super(props)
  }

  testSign = () => {}

  render() {
    return (
      <div>
        <button onClick={this.testSign}>sign</button>
      </div>
    )
  }
}

export default SignTest
