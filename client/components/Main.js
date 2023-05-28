import Image from "next/image";
import useWeb3 from "@/web3/web3.js";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import StartGame from "../components/startGame/StartAgame.js";
import AboutGame from "./aboutGame/AboutGame.js";
import Link from "next/link.js";
import CountdownTimer from "./countdownTimer/CountdownTimer.js";
export default function Main({ ethPrice }) {
  const { account } = useWeb3();
  let date = "2023-06-09T00:00:00"
  const targetDate = new Date(date);

  return (
    <section className="text-black body-font lg:pt-20">
      <div className="container px-5 pt-32 mx-auto lg:px-4 lg:py-4">
        <div className="flex flex-col w-full mb-2 text-left md:text-center ">
          <h1 className="mb-2 text-6xl font-bold tracking-tighter text-white lg:text-8xl md:text-7xl">
            <span> EtherPlay - Crypto</span>
            <br className="hidden lg:block"></br>
          </h1>
          <br></br>
          <p className="mx-auto  text-xl font-normal leading-relaxed text-gray-600 dark:text-gray-300 lg:w-2/3">
            Test Your Prediction Skills{" "}
            <Link href="/" className="underline">
              and
            </Link>{" "}
            Win Cryptocurrency - EtherPlay{" "}
          </p>
        </div>
      </div>
      <div className="container flex flex-col items-center justify-center py-8 mx-auto rounded-lg md:p-1 p-3 w-1/2">
        <Image src="/img/ethGold.jpg" alt="ethGold" width={900} height={800} />
        <CountdownTimer targetDate={targetDate} />
      </div>
      <section className="text-gray-600 body-font">
        <AboutGame
          title={"Join the Ethereum Price Guessing Game ."}
          imgUrl={"/img/ethRed.jpg"}
          description={`Join our Ethereum Price Guessing Game, predict the price of ETH every 15 days, and deposit 5 USDC to participate. Our fully decentralized game ensures secure fund management and fair gameplay. Don't miss out on the chance to win big! Follow these steps:

          Step 1: Connect your MetaMask wallet to the Polygon testnet network.
          Step 2: Navigate to the top of the website and click on the "Faucet" button to receive fake USDC tokens.
          Step 3: Approve the contract to deposit your USDC by clicking the "Approve" button.
          Step 4: Submit your guess for the price of Ethereum every 15 days and deposit 5 USDC into the prize pool to participate.
          Step 5: Wait for the end of the guessing period to find out if you're a winner! Our game is fully decentralized, meaning your funds are always secure, and the gameplay is fair and transparent. Join now and put your prediction skills to the test!        
`}
        />

        <section className="text-gray-600 body-font">
          <div className="container px-5 py-10 mx-auto">
            <div className="flex flex-wrap -m-4 text-center items-center justify-center">
              <div className="p-4">
                <h2 className="title-font font-medium sm:text-5xl text-3xl text-white mb-4">
                  <CountUp end={ethPrice} redraw={true}>
                    {({ countUpRef, start }) => (
                      <VisibilitySensor onChange={start} delayedCall>
                        <span ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                </h2>
                <p className="leading-relaxed">ETH Price</p>
              </div>
            </div>
          </div>
        </section>

        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          {account ? (
            <>
              <StartGame DATE={date} />
            </>
          ) : (
            <AboutGame
              title={
                "Get in on the Action: Connect Your Wallet and Play to Win!"
              }
              imgUrl={"/img/ethPhone.jpg"}
            />
          )}
        </div>
      </section>
    </section>
  );
}
