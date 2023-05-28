pragma solidity ^0.8.0;

import "c:/Users/Asalef alena/Desktop/guessETH/node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "c:/Users/Asalef alena/Desktop/guessETH/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "c:/Users/Asalef alena/Desktop/guessETH/node_modules/@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";


contract MockUSDC_TOKEN is ERC20 {
    address owner;
    int256 private price;
    event IsDeposit(bool success);
    event IsParticipant(bool success);
    // event ClosesGueses(uint256 NU);

    constructor() ERC20("USDC", "USDC") {
        owner = msg.sender;

        _mint(address(this), 10 * (10**uint256(decimals())));
        mint();
        countLotteryRound = 1;
    }

    struct UserGuess {
        address userAddress;
        uint256 guessPrice;
        uint256 aroundNum;
    }

    UserGuess[] users_guess;
    uint256 private countLotteryRound;
    AggregatorV3Interface internal priceFeed;

    mapping(uint256 => UserGuess[]) private userGssAround_mapping;
    mapping(address => mapping(uint256 => bool)) private isDeposit;
    mapping(uint256 => address) private winnerAddress;

    modifier adminFunc() {
        require(msg.sender == owner, "Only owner can use this function");
        _;
    }

    function mint() public returns (bool) {
        _mint(address(this), 10000000000000000);
        return true;
    }

    function storeUserGuess(uint256 _guessPrice,address userAddress) external {
        require(
            isDeposit[userAddress][countLotteryRound] != true,
            "Participant has already deposited"
        );
        testDepositUSDC();
        UserGuess memory newGuess = UserGuess({
            userAddress: userAddress,
            guessPrice: _guessPrice,
            aroundNum: countLotteryRound
        });
        isDeposit[userAddress][countLotteryRound] = true;
        userGssAround_mapping[countLotteryRound].push(newGuess);
        emit IsParticipant(true);
    }
 function getUserGuess()
        public
        view
        returns (
            uint256 guessNum,
            address addressGuss,
            uint256 aroundNum
        )
    {
        uint256 closestGuess = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
        uint256 ethPrice = getEthPrice();
        address userWinAddress;
        uint256 around = countLotteryRound;
        UserGuess[] memory guesses = userGssAround_mapping[countLotteryRound];

        for (uint256 i = 0; i < guesses.length; i++) {
            uint256 guess = guesses[i].guessPrice;
            if (absDiff(guess, ethPrice) < absDiff(closestGuess, ethPrice)) {
                closestGuess = guess;
                userWinAddress = guesses[i].userAddress;
                aroundNum = guesses[i].aroundNum;
            }
        }
        return (closestGuess, userWinAddress, around);
    }
    function testDepositUSDC() public {
        bool success = IERC20(address(this)).transfer(msg.sender, 1);
        emit IsDeposit(success);
    }

    function newRound() public adminFunc {
        countLotteryRound++;
    }
     function getEthPrice()
        public
        view
        returns (
            uint256
        )
    {
       return   1700;
    }
    
    function absDiff(uint256 a, uint256 b) public pure returns (uint256) {
        if (a > b) {
            return a - b;
        } else {
            return b - a;
        }
    }


}
