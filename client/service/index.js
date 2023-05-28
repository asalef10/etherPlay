const getETHPrice = async () => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
  );
  const data = await response.json();
  const price = data.ethereum.usd;
  return price;
};

const getETHPricePercentageChange = async () => {
  let prevPrice = null; 
  const newPrice = await getETHPrice();
  if (prevPrice !== 0) {
      const change = ((newPrice - prevPrice) / prevPrice) * 100;
      console.log(`ETH price change: ${change.toFixed(2)}%`);
    }


  prevPrice = newPrice;
  return newPrice;
};
module.exports = {
  getETHPrice,
  getETHPricePercentageChange
};
