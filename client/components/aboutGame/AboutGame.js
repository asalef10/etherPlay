import Image from "next/image";
import useWeb3 from "@/web3/web3";
const AboutGame = ({ imgUrl, title, description }) => {
  const { connectWallet } = useWeb3();
  return (
    <>
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
          <Image src={imgUrl} alt="eth" width={900} height={800} />
        </div>
        <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
          <div className="flex flex-col mb-10 lg:items-start items-center">
            <div className="flex-grow">
              <h2 className="text-white text-2xl title-font font-medium mb-3 ">
                {title}
              </h2>
              {title ==
                `Get in on the Action: Connect Your Wallet and Play to Win!` && (
                <button
                  onClick={connectWallet}
                  className="flex title-font font-medium text-white mb-4 md:mb-0 pr-4 "
                >
                  <span className="ml-3 text-3xl underline">
                    {"Connect Wallet"}
                  </span>
                </button>
              )}
              <h5 className="leading-relaxed text-lg text-white ">
                {description?.split("\n").map((item, key) => {
                  return (
                    <span key={key}>
                      {item}
                      <br />
                    </span>
                  );
                })}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AboutGame;
