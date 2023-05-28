const GuessingGame = artifacts.require("GuessingGame");
const GuessingGameMock = artifacts.require("GuessingGameMock");

contract("GuessingGame", (accounts) => {
  let guessingGameInstances;
  let mockGuessingGame_instance;
  before(async () => {
    guessingGameInstances = await GuessingGame.deployed();
    mockGuessingGame_instance = await GuessingGameMock.deployed();
  });
  it("Should give owner address", async () => {
    await guessingGameInstances.getOwner();
  });
  it("Should return ETH price", async () => {
    let response = await mockGuessingGame_instance.getEthPrice();
    let ETH_price = response.words[0];
    assert.equal(ETH_price, 1700, "The ETH price need to be 1700");
  });

  it("Should deposit 5 usdc from user", async () => {
    let response = await mockGuessingGame_instance.testDepositUSDC(accounts[0]);
    let isDeposit = await response.logs[1].args.success;
    assert.equal(isDeposit, true, "Transfer Failed");
  });

  it("Should store guess user", async () => {
    let response = await mockGuessingGame_instance.storeUserGuess(
      1589,
      accounts[0]
    );
    let IsParticipant = await response.logs[1].args.success;
    assert.equal(IsParticipant, true, "User failed to participate");
  });
  it("Should start new around", async () => {
    await mockGuessingGame_instance.startTheLottery(accounts[0]);
  });

  it("Should up number around", async () => {
   let response = await mockGuessingGame_instance.newRound();
   let result = await  response.logs[0].args[0];
   assert.equal(result, true, "Failed to start new around");    
  });

  it("Should to get the closest guess", async () => {
    await mockGuessingGame_instance.storeUserGuess(1289, accounts[0]);
    await mockGuessingGame_instance.storeUserGuess(1589, accounts[1]);
    let response = await mockGuessingGame_instance.getUserGuess();
    let guessNumber = await response.guessNum.words[0];
    assert.equal(guessNumber, 1589, "The number need to be 1589");
  });
});
