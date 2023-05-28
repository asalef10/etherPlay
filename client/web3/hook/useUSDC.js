import Web3 from "web3";
import USDC_JSON from "@/artifacts/usdc";
import useWeb3 from "../web3";

const useUSDC = () => {
  const { account } = useWeb3();
  let web3;
  let usdcInstance;
  const USDC_TOKEN_ADDRESS = "0x233175cecC981aedDcFbe4fB15A462B221f3C8C0";
  if (typeof window !== "undefined") {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      usdcInstance = new web3.eth.Contract(USDC_JSON.abi, USDC_TOKEN_ADDRESS);
    } else {
      console.log("No Ethereum provider found in window.ethereum");
    }
  } else {
    console.log("Running in a non-browser environment");
  }

  const getUSDC_Token = async () => {
    try {
      if (account) {
        const gasLimit = 4000000;
        let estimatedGas = await usdcInstance.methods
          .mint()
          .estimateGas({ from: account });
        await usdcInstance.methods
          .mint()
          .send({ from: account, gas: estimatedGas, gasLimit: gasLimit });
        alert("You have successfully received the currency  ");
      }
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  };
  const getBalance = async () => {
    try {
      if (account) {
        let balance = await usdcInstance.methods.getBalance(account).call();
        let result = convertToWei(balance);

        return Number(result);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const convertToWei = (valueInEther) => {
    if (account) {
      const valueInWei = web3.utils.fromWei(valueInEther.toString(), "ether");
      const formattedValue = Number.parseFloat(valueInWei).toFixed(12);
      return formattedValue;
    }
  };
  return {
    getUSDC_Token,
    getBalance,
  };
};
export default useUSDC;
