import Footer from "../components/Footer";
import Spinner from "@/components/spinner/Spinner";
import { useEffect, useState } from "react";
import useEthPlay from "@/web3/hook/useEthPlay";
import useWeb3 from "@/web3/web3";
import Header from "@/components/Header";
export default function Admin() {
  const { account } = useWeb3();
  const { getOwner } = useEthPlay();

  const [isStartNewAround, setIsStartNewAround] = useState(false);
  const [adminAccount, setAdminAccount] = useState("");
  useEffect(() => {
    getOwner_handle();
  }, [account]);
  const getOwner_handle = async () => {
    const adminAddress = await getOwner();
    setAdminAccount(adminAddress);
  };
  const { startTheLottery } = useEthPlay();
  const startTheLottery_handle = async () => {
    try {
      setIsStartNewAround(true);
      await startTheLottery();
    } catch (err) {
      console.log(err);
    } finally {
      setIsStartNewAround(false);
    }
  };

  return (
    <>
      <div className="bg-black  text-white">
        <Header />
        <div className="bg-black  text-white">
          <section className="text-gray-600 body-font relative h-screen">
            {account != undefined && adminAccount == account ? (
              <div className="container px-5 pt-24 pb-16 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                  <h1 className="sm:text-5xl text-2xl font-semibold title-font mb-4 text-white">
                    Admin Page
                  </h1>
                </div>
                <div className="p-2 w-full flex justify-center">
                  {!isStartNewAround ? (
                    <>
                      <button
                        onClick={startTheLottery_handle}
                        className="bg-transparent hover:bg-blue-500 text-red-600 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      >
                        Start New Around
                      </button>
                    </>
                  ) : (
                    <Spinner />
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col text-center w-full mb-12">
                <h1 className="sm:text-5xl text-2xl font-semibold title-font mb-4 text-red-600">
                  Only admin has access !
                </h1>
              </div>
            )}
          </section>
          <br></br>
          <Footer />
        </div>
      </div>
    </>
  );
}
