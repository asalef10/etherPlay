import Web3 from "web3";
import ethPlayJson from "@/artifacts/ethPlay.json";
import ERC20_ABI from "@/artifacts/erc20.json";

import useWeb3 from "../web3";
import { useState } from "react";

const useEthPlay = () => {
  const { account, chainId } = useWeb3();
  let web3, ethPlay, erc20Contract;
  const contractAddress = "0x19618BD91874A436D34532B661BC2c63ED714075";
  const USDC_TOKEN_ADDRESS = "0x233175cecC981aedDcFbe4fB15A462B221f3C8C0";
  const gasLimit = 8000000;
  const [process, setProcess] = useState(false);

  if (typeof window !== "undefined") {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      ethPlay = new web3.eth.Contract(ethPlayJson.abi, contractAddress);
      erc20Contract = new web3.eth.Contract(ERC20_ABI, USDC_TOKEN_ADDRESS);
    } else {
      console.log("No Ethereum provider found in window.ethereum");
    }
  } else {
    console.log("Running in a non-browser environment");
  }

  const approveContract = async () => {
    try {
      if (account && chainId === 80001) {
        await erc20Contract.methods
          .approve(contractAddress, 100000000000000)
          .send({ from: account, gas: 800000, gasPrice: 5000000000 });
        alert(" wallet approved");
        return true;
      }
    } catch (err) {
      console.log(err);
      return false;
    } finally {
    }
  };

  const storeGuess = async (priceGuess) => {
    try {
      if (account) {
        const estimatedGas = await ethPlay.methods
          .StoreUserGuess(priceGuess)
          .estimateGas({ from: account });
        await ethPlay.methods
          .StoreUserGuess(priceGuess)
          .send({ from: account, gas: estimatedGas, gasLimit: gasLimit });
        alert("Guess successfully");
      } else {
        alert("Connect MetaMask Wallet");
      }
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  };

  const startTheLottery = async () => {
    try {
      if (account) {
        let estimatedGas = await ethPlay.methods
          .StartTheLottery()
          .estimateGas({ from: account });

        await ethPlay.methods.StartTheLottery().send({
          from: account,
          gas: estimatedGas,
          gasLimit: gasLimit,
        });
      } else {
        alert("Connect MetaMask Wallet");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getOwner = async () => {
    try {
      if (account) {
        const contractOwner = await ethPlay.methods.GetOwner().call();
        return contractOwner;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getGuessWin = async () => {
    try {
      if (account) {
        const userWin = await ethPlay.methods.getWinner().call();
        return userWin;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const allowance = async () => {
    if (account) {
      if (chainId == 80001) {
        const allowance = await erc20Contract.methods
          .allowance(account, contractAddress)
          .call();

        if (allowance > 0) {
          console.log(
            `The user has approved the spender to transfer ${allowance} tokens`
          );
          return true;
        } else {
          console.log(
            `The user has not approved the spender to transfer any tokens`
          );
          return false;
        }
      }
    }
  };
  const getBalance_contract = async () => {
    if (window.ethereum) {
      if (chainId == 80001) {
        const balance = await ethPlay.methods.getBalance_contract().call();
        return balance;
      }
    }
  };

  return {
    approveContract,
    storeGuess,
    startTheLottery,
    getOwner,
    getGuessWin,
    allowance,
    getBalance_contract,
    process,
    setProcess,
  };
};
export default useEthPlay;
