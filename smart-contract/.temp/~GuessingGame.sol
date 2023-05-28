// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@chainlink/contracts/src/v0.8/interfaces/~AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/~IERC20.sol";
import "./~MathUtils.sol";

contract GuessingGame {
    event WinnerAddressEvent(address);
    event GuessSaved(bool);
    event DepositStatus(bool);

    address public owner;
    uint256 private countLotteryRound;
    uint8 constant TOKEN_DECIMALS = 18;

    address constant USDC_TOKEN_ADDRESS =
        0x233175cecC981aedDcFbe4fB15A462B221f3C8C0;
    IERC20 constant USDC_TOKEN = IERC20(USDC_TOKEN_ADDRESS);
    AggregatorV3Interface internal priceFeed;
    MathUtils mathUtils;

    struct UserGuess {
        address userAddress;
        uint256 guessPrice;
        uint256 aroundNumber;
    }

    UserGuess[] users_guess;
    mapping(uint256 => UserGuess[]) private userGssAround_mapping;
    mapping(address => mapping(uint256 => bool)) private userDepositAround;
    mapping(uint256 => address) private winnerAddress;

    constructor() {
         owner = msg.sender;
        countLotteryRound = 1;
        priceFeed = AggregatorV3Interface(
            0x0715A7794a1dc8e42615F059dD6e406A6594651A 
        );
        mathUtils = new MathUtils();

    }

    modifier adminFunc() {
        require(msg.sender == owner, "Only owner can use this function");
        _;
    }

    function StartTheLottery() external adminFunc {
        (, address userWinAddress, ) = getWinner();
        require(userWinAddress != address(0), "Winners don't exist");
        winnerAddress[countLotteryRound] = userWinAddress;
        _depositToWinner(userWinAddress);
        _newRound();
        emit WinnerAddressEvent(userWinAddress);
    }

    function getWinner()
        public
        view
        returns (
            uint256 guessNumber,
            address addressGuess,
            uint256 aroundNumber
        )
    {
        uint256 closestGuess = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
        uint256 ethPrice = getEthPrice();
        address userWinAddress;
        uint256 around = countLotteryRound;
        UserGuess[] memory guesses = userGssAround_mapping[around];

        for (uint256 i = 0; i < guesses.length; i++) {
            uint256 guess = guesses[i].guessPrice;
            if (mathUtils.absDiff(guess, ethPrice) < mathUtils.absDiff(closestGuess, ethPrice)) {
                closestGuess = guess;
                userWinAddress = guesses[i].userAddress;
                aroundNumber = guesses[i].aroundNumber;
            }
        }
        return (closestGuess, userWinAddress, around);
    }

    function StoreUserGuess(uint256 _guessPrice) external {
        require(
            userDepositAround[msg.sender][countLotteryRound] != true,
            "Participant has already deposited"
        );
        _depositUSDC();
        UserGuess memory newGuess = UserGuess({
            userAddress: msg.sender,
            guessPrice: _guessPrice,
            aroundNumber: countLotteryRound
        });
        userDepositAround[msg.sender][countLotteryRound] = true;
        userGssAround_mapping[countLotteryRound].push(newGuess);
        emit GuessSaved(true);
    }

    function _depositUSDC() private {
        uint256 amount = 5 * (10**uint256(TOKEN_DECIMALS));
        require(
            userDepositAround[msg.sender][countLotteryRound] != true,
            "Participant has already deposited"
        );
        bool transferred = USDC_TOKEN.transferFrom(
            msg.sender,
            address(this),
            amount
        );
        userDepositAround[msg.sender][countLotteryRound] = true;
        require(transferred, "USDC transfer failed");
        emit DepositStatus(transferred);
    }

    function _depositToWinner(address userWinAddress) private adminFunc {
        uint256 amount = 5 * (10**uint256(TOKEN_DECIMALS));
        uint256 balance = getBalance_contract();
        require(
            userDepositAround[msg.sender][countLotteryRound],
            "To participate, the user must deposit money"
        );
        require(balance > 0, "Insufficient balance");
        require(
            winnerAddress[countLotteryRound] == userWinAddress,
            "Only winner can get the prize"
        );
        bool transferred = USDC_TOKEN.transfer(
            userWinAddress,
            balance
        );
        require(transferred, "USDC transfer failed");
        emit DepositStatus(transferred);
    }

    function _newRound() private adminFunc {
        countLotteryRound++;
    }

    function getEthPrice() public view returns (uint256) {
        (, int256 answer, , , ) = priceFeed.latestRoundData();
        return uint256(answer) * 10**10;
    }

    function getBalance_contract() public view returns (uint256) {
         uint256 balance = USDC_TOKEN.balanceOf(address(this));
        return balance;
    }

    function GetOwner() external view returns (address) {
        return owner;
    }
}


