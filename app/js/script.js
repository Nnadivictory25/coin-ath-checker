const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const unitsValueForm = document.querySelector("#coinUnitsForm");
const unitsInput = document.querySelector("#coinsUnits");
const searchBtn = document.querySelector("#searchBtn");
const loadingImg = document.querySelector("#loaderImg");
const coinsContainer = document.querySelector(".coinsCtn");
const errorMsgElement = document.querySelector(".errorMessage");
const walletBalanceEle = document.querySelector(".walletBalance");
const emptyMessage = document.querySelector(".emptyMessage");

const overlayElems = [overlay, closeModalBtn];

let coinQuery = "";
let unitValue = 0;
let imgUrl = "";
let coinName = "";
let walletBalance = 0;
let currentCoinPrice = 0;
let coinAth = 0;

let closeModal = () => {
  const elems = [overlay, modal];
  elems.forEach((elem) => {
    elem.classList.add("fade-out");
    if (elem.classList.contains("fade-in")) {
      elem.classList.remove("fade-in");
    }
  });
};

let openModal = () => {
  const elems = [overlay, modal];
  elems.forEach((elem) => {
    elem.classList.remove("fade-out");
  });
  modal.classList.add("fade-in");
  overlay.classList.add("fade_in_overlay");
};

let resetBtn = () => {
  searchBtn.textContent = "Search";
  loadingImg.classList.add("dn");
  searchInput.value = "";
  document.activeElement.blur();
};

let displayErrorMessage = (element, message, timeout = 3000) => {
  element.textContent = `${message}`;

  setTimeout(() => {
    element.textContent = "";
  }, timeout);
};

let updateBalance = () => {
  const total = coins
    .map((coin) => coin.value)
    .map((value) => +value.replaceAll(",", "").replace("$", ""))
    .reduce((a, b) => a + b, 0);
  walletBalance = total;
  walletBalance = walletBalance.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  walletBalanceEle.textContent = walletBalance;
};

let coins = JSON.parse(localStorage.getItem("coins")) || [];

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  searchBtn.textContent = "";
  searchBtn.style.height = "49px";
  loadingImg.classList.remove("dn");

  coinQuery = searchInput.value;

  await fetch(new Request("https://api.livecoinwatch.com/coins/single"), {
    method: "POST",
    headers: new Headers({
      "content-type": "application/json",
      "x-api-key": "2bf30367-3679-4c7e-b46b-05aa8c3ed935",
    }),
    body: JSON.stringify({
      currency: "USD",
      code: `${coinQuery.toUpperCase()}`,
      meta: true,
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      const coin = json;
      if (coin.name !== undefined) {
        openModal();
        resetBtn();
        imgUrl = coin.png64;
        coinName = coin.name;
        coinAth = coin.allTimeHighUSD.toFixed(3);
        currentCoinPrice = coin.rate;
        if (coinName.split(" ").length > 2) {
          coinName = coinName
            .split(" ")
            .map((name) => name[0])
            .join("");
        }

        modal.innerHTML = `
                    <div class="closeCtn"><i id="closeModalBtn" onclick="closeModal(); resetBtn()" class="bi bi-x absolute right-2 top-0 text-4xl cursor-pointer"></i></div>
                    <div class="coin_info flex justify-between items-center px-6 mt-4 pt-3 pb-2 border-b-2 border-t-2 border-indigo-500">
                    <img class="w-16 rounded-full mr-4 lg:mr-6" src=${
                      coin.png64
                    } alt="">
                    <p class="coinName font-bold lg:text-xl text-lg uppercase">${coinName}</p>
                    <div class="priceCtn flex flex-col text-center">
                        <p class="font-bold text-slate-300">ATH</p>
                        <p class="ath lg:font-bold font-semibold text-lg">$${coin.allTimeHighUSD.toFixed(
                          3
                        )}</p>
                        </div>
                </div>

                <div class="info px-8 flex gap-x-3 mt-2">
                    <i class="bi bi-info-circle"></i>
                    <p class="text-xs">Input how many ${coinName} you have below , then click 'add to wallet' to calculate the value of your holding when it goes back to all time high</p>
                </div>
                
                <div  id="coinUnitsForm" class="px-5 mt-4">
                    <p class="text-lg font-semibold py-3">How many ${coinName} do you have ?</p>
                    <input oninput="updateUnit(this.value, ${coin.allTimeHighUSD.toFixed(3)})" id="coinsUnits" class="w-full p-3 rounded-md mb-5 text-black"  placeholder="Enter coin quantity, eg '10,500'"  type="number" >
                    <h2 class="text-center font-bold text-xl">OR</h2>
                    <p class="text-lg font-semibold py-2">How many ${coinName} do you wanna buy ?</p>
                    <input oninput="updateUnitFiat(this.value)" id="fiatUnits" class="w-full p-3 rounded-md mb-5 text-black"  placeholder="Enter amount in $, eg '20,000'"  type="text">
                    <p class="addToWalletErrMsg text-red-600 py-2"></p>
                    <div class="valueDisplayCtn justify-between hidden py-1">
                    <div class="athCtn text-center basis-2/4">
                        <p class="font-bold text-slate-300">Value(ATH)</p>
                        <p class="athValue font-semibold py-2 text-lg">1000</p>
                    </div>
                    <div class="nowCtn text-center basis-2/4">
                        <p class="font-bold text-slate-300">Value(NOW)</p>
                        <p class="athValue font-semibold py-2 text-lg">1000</p>
                    </div>
                </div>
                    <button onclick="addCoin(${coin.allTimeHighUSD.toFixed(
                      3
                    )})" class="w-full rounded-md px-1 py-3 font-bold " type="submit">Add to wallet</button>
                    </div>
              
        `;
      } else {
          displayErrorMessage(errorMsgElement, "Something went wrong, try searching for another coin or try again later" );
          resetBtn()
      }
    })
    .catch((error) => {
      closeModal();
      resetBtn();

      displayErrorMessage(errorMsgElement, "Something went wrong, try searching for another coin or try again later" );
    });
});

let updateUnit = (value, coinAth) => {
  unitValue = value;
  let athValue = value * coinAth;
  let currentValue = currentCoinPrice * value;

  const valueDisplayElement = document.querySelector(".valueDisplayCtn");
  valueDisplayElement.classList.remove("hidden");
  valueDisplayElement.classList.add("flex");
  valueDisplayElement.innerHTML = `
    <div class="athCtn text-center">
        <p class="font-bold text-slate-300">Value(ATH)</p>
        <p class="athValue font-semibold py-2 text-lg">${athValue.toLocaleString(
          "en-US",
          { style: "currency", currency: "USD" }
        )}</p>
    </div>
    <div class="nowCtn text-center">
        <p class="font-bold text-slate-300">Value(NOW)</p>
        <p class="athValue font-semibold py-2 text-lg">${currentValue.toLocaleString("en-US",{ style: "currency", currency: "USD" })}</p>
    </div>
    `;
};

let updateUnitFiat = (value) => {
  let coinValue = +value / currentCoinPrice;
  document.querySelector("#coinsUnits").value = coinValue;
  updateUnit(+document.querySelector("#coinsUnits").value, coinAth);
};

let updateUI = () => {
  coinsContainer.innerHTML =
        '<h3 class="text-xl font-bold text-center mx-auto mt-5">WALLET</h3>';
    updateBalance()
  coins.map((coin) => {
    const { name, units, value, imgUrl } = coin;

    coinsContainer.innerHTML += `

        <div class="coinCtn w-full mt-7 flex justify-between items-center p-3 lg:py-4 lg:px-5">
            <div class="imgCtn flex flex-col justify-center items-center my-auto">
                <img class="w-16 rounded-full self-start items-start" src=${imgUrl} alt="...">
                <p class="coinName font-semibold py-1">${name}</p>
          </div>
            <div class="priceCtn flex flex-col text-center self-center">
                <p class="font-bold text-slate-300">Quantity</p>
                <p class="ath font-bold text-lg">${units.toString().indexOf('.') > -1 ? units.toLocaleString("en-US") : units.toLocaleString("en-US")}</p>
            </div>
            <div class="priceCtn flex flex-col text-center">
                <p class="font-bold text-slate-300">Value(ATH)</p>
                <p class="ath font-bold text-lg">${value}</p>
            </div>
        </div>
        `;
  });
};

let generatePortfolio = () => {
  if (coins.length !== 0) {
    emptyMessage.remove();
    updateBalance();
    updateUI();
  }
};

let addCoin = (coinAth, units = unitValue, img = imgUrl) => {
  const value = (coinAth * units).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  const addToWalletErrorMsg = document.querySelector(".addToWalletErrMsg");
  if (unitValue > 0 && !coins.find((coin) => coin.name === coinName)) {
    coins.push({
      name: coinName,
      units: units,
      value: value,
      imgUrl: img,
    });
    localStorage.setItem("coins", JSON.stringify(coins));
    console.log(coins);
    updateBalance();
    updateUI();
    closeModal();
    emptyMessage.remove();
    resetBtn();
  } else if (unitValue > 0 && coins.find((coin) => coin.name === coinName)) {
    displayErrorMessage(addToWalletErrorMsg, "Coin already exists", 3000);
    // addToWalletErrorMsg.textContent = 'Coin already exists'
  } else if (unitValue <= 0 && !coins.find((coin) => coin.name === coinName)) {
    displayErrorMessage(
      addToWalletErrorMsg,
      "Enter a value greater than 0",
      3000
    );
    // addToWalletErrorMsg.textContent = 'Enter a value greater than 0'
  }
};

overlayElems.forEach((ele) => {
  ele.addEventListener("click", () => {
    closeModal();
    resetBtn();
  });
});

generatePortfolio();
