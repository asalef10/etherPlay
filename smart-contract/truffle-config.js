const HDWalletProvider = require("@truffle/hdwallet-provider");
let WALLET_KEY = process.env.WALLET_KEY;
module.exports = {
  networks: {
    // development: {
    //   host: "localhost",
    //   port: 7545,
    //   network_id: "*", // Match any network id
    //   gas: 5000000
    // },
    testnet: {
      provider: () =>
        new HDWalletProvider(
          WALLET_KEY,
          `https://matic-mumbai.chainstacklabs.com/`
        ),
      network_id: 80001,
      confirmations: 0,
      timeoutBlocks: 10,
      skipDryRun: true,
    },

    // mainnet: {
    //   provider: () =>
    //     new HDWalletProvider(
    //       WALLET_KEY,
    //       `https://polygon-rpc.com/`
    //     ),
    //   network_id: 137,
    //   gas: 8000000,
    //   gasPrice: 100000000000, // 5 Gwei
    //   confirmations: 2,
    //   timeoutBlocks: 200,
    //   skipDryRun: true,
    // },
  },

  compilers: {
    solc: {
      version: "^0.8.0",
    },
  },
};
