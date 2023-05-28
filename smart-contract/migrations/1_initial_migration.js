const GuessingGame = artifacts.require("GuessingGame");
const GuessingGameMock = artifacts.require("GuessingGameMock");
module.exports = function(deployer) {
  deployer.deploy(GuessingGame);

};
