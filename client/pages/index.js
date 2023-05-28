import Head from "next/head";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { NextSeo } from "next-seo";
import { getETHPrice } from "@/service";
import useWeb3 from "@/web3/web3";

export default function Home({ ethPrice }) {
  const { account, chainId } = useWeb3();

  return (
    <div className="text-white bg-black">
      {account && chainId !== 80001 ? (
        <h1 className="text-green-400">
          You need connect to the Polygon Testnet network !
        </h1>
      ) : (
        ""
      )}
      <NextSeo
        title="Home: EtherPlay"
        description="Welcome to EtherPlay."
        canonical="/"
        openGraph={{
          url: "/",
        }}
      />
      <Head>
        <title>EtherGuess</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main ethPrice={ethPrice} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const ethPrice = await getETHPrice();
  return { props: { ethPrice } };
}
