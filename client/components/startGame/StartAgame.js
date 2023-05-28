import useEthPlay from "@/web3/hook/useEthPlay";
import useWeb3 from "@/web3/web3";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import useUSDC from "@/web3/hook/useUSDC";
import Link from "next/link";

const StartGame = ({ DATE }) => {
  const {
    storeGuess,
    getBalance_contract,
    allowance,
    approveContract,
    setProcess,
    process,
  } = useEthPlay();
  const { account, chainId, convertFromWei } = useWeb3();
  const { getBalance } = useUSDC();

  const [guess, setGuess] = useState(null);
  const [isApproved, setIsApproved] = useState(true);
  const [isStore_guess, setIsStore_guess] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [balanceContract, setBalanceContract] = useState(500);
  const [userBalance, setUserBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState("");
  
  useEffect(() => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const shortDate = new Date(DATE).toLocaleDateString("en-GB", options);
    setDate(shortDate);
  }, []);
  useEffect(() => {
    checkIsApproved_contract();
    getBalance_handle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId, process,isStore_guess]);

  const getBalance_handle = async () => {
    const amountContract = await getBalance_contract();
    const userBalance = await getBalance();
    const result = convertFromWei(amountContract);
    setBalanceContract(result);
    setUserBalance(userBalance);
  };

  const store_Handle = async (guess) => {
    try {
      setIsStore_guess(true);
      await storeGuess(guess);
      setIsStore_guess(false);
    } catch (err) {
      console.log(err);
    } finally {
      setProcess((prev) => !prev);
    }
  };
  const checkIsApproved_contract = async () => {
    try {
      const isApprovedContract = await allowance();
      if (isApprovedContract) {
        setIsApproved(true);
        return true;
      } else {
        setIsApproved(false);
        return false;
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };
  const approveContract_handle = async () => {
    setSpinner(true);
    try {
      let isApproved = await approveContract();
      isApproved ? setIsApproved(true) : setIsApproved(false);
    } catch (error) {
      console.error(error);
    } finally {
      setProcess((prev) => !prev);

      setSpinner(false);
    }
  };

  return (
    <>
      {!isLoading ? (
        <section className="text-gray-600 body-font contents">
          <div className="container px-5 mx-auto">
            <div className="text-center mb-20">
              <h2 className="sm:text-5xl font-medium title-font text-white mb-4 underline">
                Lets start
              </h2>
              <p className="title-font font-medium text-lg text-orange-300">
                Guess ETH price in {date}
              </p>
              {isApproved ? (
                <div className="flex flex-col items-center">
                  <span className="text-red-300">
                    Prize Pot Balance: {balanceContract} USDC
                  </span>
                  <span className="text-cyan-300">
                    Your Amount: {userBalance} USDC
                  </span>
                  <input
                    onChange={(e) => {
                      setGuess(e.target.value);
                    }}
                    className="shadow appearance-none border rounded w-3/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    placeholder="1875"
                  />
                  <br />
                  {!isStore_guess ? (
                    <button
                      onClick={() => {
                        store_Handle(guess);
                      }}
                      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                      Start
                    </button>
                  ) : (
                    <Spinner />
                  )}
                </div>
              ) : (
                <>
                  <p className="title-font font-medium text-lg text-green-300">
                    Allowing the smart contract to access and deduct 5 USDC from
                    your account
                  </p>
                  <br />
                  {!userBalance && (
                    <p>
                      First You Need Get USDC Faucet Token{" "}
                      <Link href="/faucet">
                        <p className="underline">Click Here</p>
                      </Link>{" "}
                    </p>
                  )}
                  {spinner ? (
                    <Spinner />
                  ) : (
                    <button
                      onClick={approveContract_handle}
                      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    >
                      Approve
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      ) : (
        <div className="flex justify-center items-center h-full w-full">
          <Spinner />
        </div>
      )}
    </>
  );
};
export default StartGame;
