import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import './App.css';

const getEthereumObject = () => window.ethereum;

const findMetaMaskAccount = async () => {
  try {
    const ethereum = getEthereumObject();

    /*
    * First make sure we have access to the Ethereum object.
    */
    if (!ethereum) {
      console.error("Make sure you have Metamask!");
      return null;
    }

    console.log("We have the Ethereum object", ethereum);
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      return account;
    } else {
      console.error("No authorized account found");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  useEffect(() => {
    findMetaMaskAccount().then((account) => {
      if (account !== null) {
        setCurrentAccount(account)
      }
    });
  }, [])

  const connect = async () => {
    try {
      const ethereum = getEthereumObject();
      if(!ethereum)  {
        alert("Get Metamask");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error)
    }
  };
  
  const wave = async () => {
    try {
      const {ethereum} = window;

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getWaves();

        console.log("Retrived total wave count....", count.toNumber());
      } else {
        console.log("Ethereum object dosen't exist");
      }
    } catch (err) {
      console.log(err)
    }
  }
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        I am Mihir and I worked on NFT's so that's pretty cool right? Connect your Polygon wallet and wave at me!
        </div>
        {!currentAccount ? (
        <button className="waveButton" onClick={connect}>
          Connect Wallet
        </button>
        ) : (
            <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
        )}
      </div>
    </div>
  );
}
