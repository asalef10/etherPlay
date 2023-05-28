import useWeb3 from "@/web3/web3";
import React from "react";
import Link from "next/link";
import useEthPlay from "@/web3/hook/useEthPlay";
import { useState,useEffect  } from "react";
export default function Header() {
  const { connectWallet, account, addressShortcut } = useWeb3();
  const { getOwner } = useEthPlay();
  const [adminAccount, setAdminAccount] = useState("");
  useEffect(() => {
    getOwner_handle();
  }, [account]);
  const getOwner_handle = async () => {
    const adminAddress = await getOwner();
    setAdminAccount(adminAddress);
  };
  return (
    <header className="text-white body-font">
      <div className="container mx-auto flex flex-wrap p-5 md:flex-row">
        <button
          onClick={connectWallet}
          className="flex title-font font-medium text-white mb-4 md:mb-0 pr-4"
        >
          <span className="ml-3 text-3xl underline hover:text-blue-500 text-white cursor-pointer text-xl">
            {!account ? "Connect Wallet" : addressShortcut(account)}{" "}
          </span>
        </button>
        <div
          className={"md:flex flex-grow items-center flex"}
          id="example-navbar-danger"
        >
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center font-semibold pl-7">
            <Link className="mr-6 hover:text-white" href="/">
              Home
            </Link>
            <Link className="mr-6 hover:text-white" href="/faucet">
              Faucet
            </Link>
            {
            account != undefined && adminAccount == account ? 
              <Link className="mr-6 hover:text-white" href="/admin">
              Admin
            </Link>:""
            }
          </nav>
        </div>
      </div>
    </header>
  );
}
