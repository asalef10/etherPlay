import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { NextSeo } from "next-seo";
import useUSDC from "@/web3/hook/useUSDC";
import Spinner from "@/components/spinner/Spinner";
import { useState } from "react";
import useWeb3 from "@/web3/web3";
export default function Contact() {
  const [isGetUSDC, setIsGetUSDC] = useState(false);

  const { getUSDC_Token } = useUSDC();
  const { account, chainId } = useWeb3();

  const getUSDC_Token_handle = async () => {
    try {
      if (!account) {
        alert("You Need Connect Wallet");
      } else {
        if (chainId !== 80001) {
          alert("You Need Connect Polygon Testnet Network.");
          return false;
        }
        setIsGetUSDC(true);
        await getUSDC_Token();
        setIsGetUSDC(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGetUSDC(false);
    }
  };

  return (
    <div className="bg-black  text-white">
      <NextSeo title="EtherPlay" description="Get Faucet!" />
      <Head>
        <title>EtherPlay</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section className="text-gray-600 body-font relative h-screen">
        <div className="container px-5 pt-24 pb-16 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-5xl text-2xl font-semibold title-font mb-4 text-white">
              Get Faucet
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base font-semibold">
              Click the button below to get your faucet.
            </p>
          </div>
          <div className="p-2 w-full flex justify-center">
            {!isGetUSDC ? (
              <button
                onClick={getUSDC_Token_handle}
                className="bg-transparent hover:bg-blue-500 text-red-600 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                GET USDC
              </button>
            ) : (
              <Spinner />
            )}
          </div>
        </div>
      </section>
      <br></br>
      <Footer />
    </div>
  );
}
