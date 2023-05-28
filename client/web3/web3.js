import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";

const injected = new InjectedConnector({
  supportedChainIds: [1337, 80001, 1, 3, 4, 5, 42, 137, 56, 43114, 421611],
});
const useWeb3 = () => {
  let web3;
  if (typeof window !== "undefined") {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
    } else {
      console.log("No Ethereum provider found in window.ethereum");
    }
  } else {
    console.log("Running in a non-browser environment");
  }
  const { account, activate, chainId } = useWeb3React();

  const connectWallet = async () => {
    await activate(injected);
    return account;
  };

  const addressShortcut = (addressWallet) => {
    let address = `${addressWallet?.slice(0, 6)}...${addressWallet?.slice(
      -4
    )} `;
    return address;
  };
  const convertFromWei = (valueInEther) => {
    if (account && chainId ===80001) {

      const valueInWei = web3.utils.fromWei(valueInEther, "ether");
      return valueInWei;
    }
  };
  return {
    connectWallet,
    addressShortcut,
    account,
    chainId,
    convertFromWei,
  };
};
export default useWeb3;
