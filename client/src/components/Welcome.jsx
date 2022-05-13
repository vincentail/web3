import React,{useContext} from 'react';
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si"
import { BsInfoCircle } from "react-icons/bs";
import { Loader } from './';

import {TransactionContext} from '../context/TransactionContext';


const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center  items-center border-[0.5px] border-gray-400";


const Input = ({ placeHolder, name, type, value, handleChange }) => {
    return (
        <input
            placeholder={placeHolder}
            step="0.00001"
            value={value}
            type={type}
            onChange={(e) => handleChange(e, name)}
            className="my-2 w-full rounded-sm p-2 outline bg-transparent border-none text-sm" />
    );
}

const Welcome = () => {

    const {connectWallet,currentAccount,formData,handleChange,sendTransaction} = useContext(TransactionContext);
    
    const handleSubmit = (e) => {
        console.log(formData);
        const {addressTo,amount,keyword,message} = formData;
        e.preventDefault();
        if(!addressTo || !amount || !keyword || !message) {
            console.log('empty items');
            return;
        }
        sendTransaction();
    }

    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex md:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start flex-col md:mr-10">
                    <h1 className="text-3xl sm:text-5xl  text-gradient py-1">
                        Send Crypto <br /> across the world
                    </h1>
                    <p className="text-left mt-5 font-light md:w-9/12 w-11/12">
                        Explore the crypto world,Buy and sell crypto easily on crypto
                    </p>
                    {!currentAccount && (
                        <button type="button" onClick={connectWallet} className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
                            <p className="text-white text-base font-semibold">Connect Wallet</p>
                        </button>
                    )}


                    <div className="grid sm:grid-cols-3 grid-cols-3 w-full mt-10">

                        <div className={`rounded-tl-2xl ${commonStyles}`}>
                            Reliability
                        </div>
                        <div className={commonStyles}>
                            Security
                        </div>
                        <div className={`rounded-tr-2xl ${commonStyles}`}>
                            Ethereum
                        </div>
                        <div className={`rounded-bl-2xl ${commonStyles}`}>
                            Web3.0
                        </div>
                        <div className={commonStyles}>
                            Low fees
                        </div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>
                            Blockchain
                        </div>
                    </div>
                </div>

                <div className="flex felx-col flex-1 items-center justify-start w-full md:mt-0 mt-10">
                    <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 blue-glassmorpism">
                        <SiEthereum />
                        <BsInfoCircle fontSize={17} color="#fff" />
                    </div>
                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorpism">
                        <Input placeHolder="Address To" name="addressTo" type="text" handleChange={handleChange} />
                        <Input placeHolder="Amount(Eth)" name="amount" type="number" handleChange={handleChange} />
                        <Input placeHolder="keyWord(gif)" name="keyword" type="text" handleChange={handleChange} />
                        <Input placeHolder="Enter message" name="message" type="text" handleChange={handleChange} />

                        <div className="h-[1px] w-full bg-gray-400 my-2" />

                        {false ? (
                            <Loader />
                        ) : (
                            <button type="button" onClick={handleSubmit} className="w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer">Send Now</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;