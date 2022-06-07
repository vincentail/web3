import React, { useEffect, useState } from 'react'

import { ethers } from 'ethers'

import { contractAbi, contractAddress } from '../utils/constants'

export const TransactionContext = React.createContext()

const { ethereum } = window

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum)
  const signer = provider.getSigner()

  const transactionContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  )

  console.log({
    provider,
    signer,
    transactionContract,
  })
  return transactionContract
}

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null)
  const [formData, setFormData] = useState({
    addressTo: '',
    amount: '',
    keyword: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem('transactionCount')
  )

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }))
  }

  const checkIfWalletIsConnected = async () => {
    if (!ethereum) return alert('please install metamask')
    const accounts = await ethereum.request({ method: 'eth_accounts' })
    if (accounts.length) {
      setCurrentAccount(accounts[0])
    } else {
      console.log('no account find')
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('please install metamask')
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      if (accounts.length) {
        setCurrentAccount(accounts[0])
      } else {
        console.log('no account find')
      }
    } catch (error) {
      console.error(error)
      throw new Error('no ethereum object')
    }
  }

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert('please install metamask')

      //get the data from form
      const { addressTo, amount, keyword, message } = formData
      const parseAmount = ethers.utils.parseEther(amount)
      console.log('into sendTransaction')
      const transactionContract = getEthereumContract()
      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: '0x5208',
            value: parseAmount._hex,
          },
        ],
      })
      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parseAmount,
        message,
        keyword
      )
      setIsLoading(true)
      console.log(`Loading-${transactionHash.hash} `)
      await transactionHash.wait()
      console.log(`Success-${transactionHash.hash}`)
      setIsLoading(false)
      const transactionCount = await transactionContract.getTransactionCount()
      setTransactionCount(transactionCount)
    } catch (error) {
      console.error(error)
      throw new Error('no ethereum object')
    }
  }

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  )
}
