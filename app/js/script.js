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
let currentCoinQuery = ''


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
    if (coins.length !== 0) {
        emptyMessage.remove();
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
    } else {
        walletBalanceEle.textContent = '$0'
    }
};

let coins = JSON.parse(localStorage.getItem("coins")) || [];

let updateCoinCurrentValue = () => {
  let coinRate = ''
  if (coins.length !== 0) {
    coins.forEach((coin) => {
     fetch(new Request("https://api.livecoinwatch.com/coins/single"), {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
          "x-api-key": "2bf30367-3679-4c7e-b46b-05aa8c3ed935",
        }),
        body: JSON.stringify({
          currency: "USD",
          code: `${coin.coinQuery}`,
          meta: true,
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          const Curcoin = json;
          coinRate = Curcoin.rate
          coin.coinCurPrice = coinRate
        })
        
    })
  }

}

let updateLocalStorage = () => {
  localStorage.setItem("coins", JSON.stringify(coins));
}


searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  searchBtn.textContent = "";
  searchBtn.style.height = "49px";
  loadingImg.classList.remove("dn");

  coinQuery = (searchInput.value).toUpperCase();

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
        // if the coin's nme is longer than two words , display only the initials 
        if (coinName.split(" ").length > 2) {
          coinName = coinName
            .split(" ")
            .map((name) => name[0])
            .join("");
        }

        // opening the modal and populating it with the gotten coin details
        modal.innerHTML = `
                    <div class="closeCtn"><i id="closeModalBtn" onclick="closeModal(); resetBtn()" class="bi bi-x absolute right-2 top-0 text-4xl cursor-pointer"></i></div>
                    <div class="coin_info flex justify-between items-center px-6 mt-4 pt-3 pb-2 border-b-2 border-t-2 border-indigo-500">
                    <img class="w-16 rounded-full mr-4 lg:mr-6" src=${coin.png64} alt="">
                    <p class="coinName font-bold lg:text-xl text-lg uppercase">${coinName}</p>
                    <div class="priceCtn flex flex-col text-center">
                        <p class="font-bold text-slate-300">ATH</p>
                        <p class="ath lg:font-bold font-semibold text-lg">${(+coin.allTimeHighUSD.toFixed(3)).toLocaleString("en-US",{ style: "currency", currency: "USD" })}</p>
                        </div>
                </div>

                <div class="info px-8 flex gap-x-3 mt-2">
                    <i class="bi bi-info-circle"></i>
                    <p class="text-xs">Input how many ${coinName} you have below , then click 'add to wallet' to calculate the value of your holding when it goes back to all time high</p>
                </div>
                
                <div  id="coinUnitsForm" class="px-5 mt-4">
                    <p class="text-lg font-semibold py-3"> ${coinName} quantity :</p>
                    <input oninput="updateUnit(this.value, ${coin.allTimeHighUSD.toFixed(3)}, true)" id="coinsUnits" class="w-full p-3 rounded-md mb-5 text-black font-semibold text-lg"  placeholder="Enter coin quantity, eg '10,500'"  type="number" >
                    <h2 class="text-center font-bold text-xl">OR</h2>
                    <p class="text-lg font-semibold py-2">${coinName} value in $ :</p>
                    <input oninput="updateUnitFiat(this.value, true, ${currentCoinPrice}, ${coin.allTimeHighUSD.toFixed(3)})" id="fiatUnits" class="w-full p-3 rounded-md mb-5 text-black font-semibold text-lg"  placeholder="Enter amount in $, eg '20,000'"  type="number">
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
                    <button onclick="addCoin(${coin.allTimeHighUSD.toFixed(3)})" class="w-full rounded-md px-1 py-3 font-bold " type="submit">Add to wallet</button>
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


let updateUnit = (value, coinAth, fromSearch = false, curPrice) => {
  unitValue = value;
  let athValue = value * coinAth;
  let currentValue = 0
  if (fromSearch) {
    currentValue = currentCoinPrice * +value;
  } else if (!fromSearch) {
    currentCoinPrice = curPrice
    currentValue = curPrice * +value
  }
  

  const valueDisplayElement = document.querySelector(".valueDisplayCtn");
  valueDisplayElement.classList.remove("hidden");
  valueDisplayElement.classList.add("flex");
  valueDisplayElement.innerHTML = `
    <div class="athCtn text-center">
        <p class="font-bold text-slate-300">Value(ATH)</p>
        <p class="athValue font-semibold py-2 text-lg">${athValue.toLocaleString("en-US",{ style: "currency", currency: "USD" })}</p>
    </div>
    <div class="nowCtn text-center">
        <p class="font-bold text-slate-300">Value(NOW)</p>
        <p class="currentValue font-semibold py-2 text-lg">$${currentValue.toString().indexOf('.') > -1 ? currentValue.toFixed(4) : currentValue}</p>
    </div>
    `;
  document.querySelector('#fiatUnits').value = Math.round(+currentValue)
};



let updateUnitFiat = (value, fromSearch = false, currCoinPrice, coinAth) => {
  currentCoinPrice = currCoinPrice
  let coinValue = +value / currentCoinPrice;
  document.querySelector("#coinsUnits").value = coinValue;
  updateUnit(+document.querySelector("#coinsUnits").value, coinAth, fromSearch, currentCoinPrice);
};



let updateUI = () => {
    coinsContainer.innerHTML =
        `<h3 class="text-xl font-bold text-center mx-auto mt-5 mb-4">WALLET</h3>
         ${coins.length == 0 ?
            ` <p class="emptyMessage font-bold text-slate-400 text-xl py-5">Your wallet is empty :(
        </p>` : ''
        }
    `;
    updateBalance()
    if (coins.length !== 0) {
        emptyMessage.remove();
        coinsContainer.innerHTML += `
        <div class="deleteBtnCtn absolute right-6 top-5 ">
        <i onclick="clearAll()" class="bi bi-trash3 cursor-pointer text-2xl"></i>
        <p class="font-semibold  text-xs">Clear All</p>
        </div>`
        coins.map((coin) => {
          const { name, units, value, imgUrl } = coin;
      
          coinsContainer.innerHTML += `
      
              <div class="coinCtn relative w-full mt-7 flex justify-between items-center px-3 py-7 md:py-4 md:px-5">
                <div class="actionsCtn absolute right-4 top-2">
                    <div id="${name}" class="iconsCtn flex gap-x-4">
                        <i onclick="edit('${name}')" class="bi bi-pencil-square cursor-pointer"></i>
                        <i onclick="deleteItem('${name}')" class="bi bi-trash3 cursor-pointer"></i>
                    </div>
               </div>
                  <div class="imgCtn flex flex-col justify-center self-center items-center my-auto w-1/3">
                      <img class="w-16 rounded-full " src=${imgUrl} alt=${name}>
                      <p class="coinName font-semibold py-1">${name}</p>
                </div>
                  <div class="priceCtn flex flex-col text-center self-center w-1/3">
                      <p class="font-bold text-slate-300">Quantity</p>
                      <p class="ath font-bold text-lg">${(+units).toLocaleString("en-US")}</p>
                  </div>
                  <div class="priceCtn flex flex-col text-center w-1/3">
                      <p class="font-bold text-slate-300">Value(ATH)</p>
                      <p class="ath font-bold text-lg">${value}</p>
                  </div>
              </div>
              `;
        });
    } 
};



let deleteItem = (nameOfCoin) => {
  let coinIndex = coins.findIndex((coin) => coin.name === nameOfCoin)
  coins.splice(coinIndex, 1)
  generatePortfolio()
  updateLocalStorage()
}



let coinObject


let updateCurrentUnit = (coinName) => {
  let buttonCtn = document.querySelector('.btnCtn')
  let Inputvalue = document.querySelector('#coinsUnits').value
  coinObject.units = +Inputvalue

  let { name, units, value, imgUrl, coinAth, currentValue, athValue, coinCurPrice, coinQuery } = coinObject;

  buttonCtn.innerHTML = `
  <button onclick="addCoinEdit(${coinAth}, ${units}, '${imgUrl}', ${coinCurPrice}, '${name}')" class="w-full rounded-md px-1 py-3 font-bold " type="submit">Save</button>
  `
  
}


let edit = (nameOfCoin) => {
    openModal()
    coinName = nameOfCoin
    coinObject = coins.find((coin) => coin.name === nameOfCoin)
    let { name, units, value, imgUrl, coinAth, currentValue, athValue, coinCurPrice, coinQuery } = coinObject;
    currentCoinPrice = coinCurPrice
    currentCoinQuery = coinQuery
      
  
  
    modal.innerHTML = `
            <div class="closeCtn"><i id="closeModalBtn" onclick="closeModal(); resetBtn()" class="bi bi-x absolute right-2 top-0 text-4xl cursor-pointer"></i></div>
            <div class="coin_info flex justify-between items-center px-6 mt-4 pt-3 pb-2 border-b-2 border-t-2 border-indigo-500">
            <img class="w-16 rounded-full mr-4 lg:mr-6" src=${imgUrl} alt=${name}>
            <p class="coinName font-bold lg:text-xl text-lg uppercase">${name}</p>
            <div class="priceCtn flex flex-col text-center">
                <p class="font-bold text-slate-300">ATH</p>
                <p class="ath lg:font-bold font-semibold text-lg">$${coinAth.toLocaleString("en-US")}</p>
                </div>
         </div>

        <div class="info px-8 flex gap-x-3 mt-2">
            <i class="bi bi-info-circle"></i>
            <p class="text-xs">Input how many ${name} you have below , then click 'add to wallet' to calculate the value of your holding when it goes back to all time high</p>
        </div>

        <div  id="coinUnitsForm" class="px-5 mt-4">
            <p class="text-lg font-semibold py-3"> ${name} quantity :</p>
            <input oninput="updateUnit(this.value, ${coinAth}, false, ${coinCurPrice}); updateCurrentUnit('${name}')" id="coinsUnits" value="${units}" class="w-full p-3 rounded-md mb-5 text-black font-semibold text-lg"  placeholder="Enter coin quantity, eg '10,500'"  type="number" >
            <h2 class="text-center font-bold text-xl">OR</h2>
            <p class="text-lg font-semibold py-2"> ${name} value in $ :</p>
            <input oninput="updateUnitFiat(this.value, false, ${coinCurPrice}, ${coinAth}); updateCurrentUnit('${name}')"  id="fiatUnits" class="w-full p-3 rounded-md mb-5 text-black font-semibold text-lg"  placeholder="Enter amount in $, eg '20,000'"  type="text">
            <p class="addToWalletErrMsg text-red-600 py-2"></p>
            <div class="valueDisplayCtn justify-between hidden py-1">
            <div class="athCtn text-center basis-2/4">
                <p class="font-bold text-slate-300">Value(ATH)</p>
                <p class="athValue font-semibold py-2 text-lg">${value}</p>
            </div>
            <div class="nowCtn text-center basis-2/4">
                <p class="font-bold text-slate-300">Value(NOW)</p>
                <p class="athValue font-semibold py-2 text-lg"></p>
            </div>
        </div>
        <div class="btnCtn">
        <button onclick="addCoinEdit(${coinAth}, ${units}, '${imgUrl}', ${coinCurPrice}, '${name}')" class="w-full rounded-md px-1 py-3 font-bold " type="submit">Save</button>
        </div>
            </div>

        `;
}





let generatePortfolio = () => {
  updateCoinCurrentValue()
  updateUI();
};


let clearAll = () => {
    coins = []
    updateLocalStorage()
    updateUI()
}


let addCoinEdit = (coinAth, units, imgUrl, coinCurPrice, nameOfCoin) => {
  let athValue = +units * coinAth;
  let currentValue = coinCurPrice * +units;
  const value = (coinAth * +units).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  let selectedCoinIndex = coins.findIndex((coin) => coin.name === coinName)
  coins.splice(selectedCoinIndex, 1)

  const addToWalletErrorMsg = document.querySelector(".addToWalletErrMsg");
  if (+units > 0 && !coins.find((coin) => coin.name === coinName)) {

    coins.splice(selectedCoinIndex, 0, {
      name: coinName,
      units: units,
      value: value,
      imgUrl: imgUrl,
      coinAth: coinAth,
      currentValue: currentValue,
      athValue: athValue,
      coinCurPrice: currentCoinPrice,
      coinQuery: currentCoinQuery,
    })

    updateLocalStorage()
    generatePortfolio();
    closeModal();
    emptyMessage.remove();
    resetBtn();

  } else if (+units > 0 && coins.find((coin) => coin.name === coinName)) {
    displayErrorMessage(addToWalletErrorMsg, "Coin already exists", 3000);
  } else if (+units <= 0 && !coins.find((coin) => coin.name === coinName)) {
    displayErrorMessage(
      addToWalletErrorMsg,
      "Enter a value greater than 0",
      3000
    );
  }
}


let addCoin = (coinAth, units = unitValue, img = imgUrl) => {
    let athValue = unitValue * coinAth;
    let currentValue = currentCoinPrice * unitValue;
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
      coinAth: coinAth,
      currentValue: currentValue,
      athValue: athValue,
      coinQuery: coinQuery
    });

    updateLocalStorage()
    generatePortfolio()
    closeModal();
    emptyMessage.remove();
    resetBtn();
    console.log(coins);
  } else if (unitValue > 0 && coins.find((coin) => coin.name === coinName)) {
    displayErrorMessage(addToWalletErrorMsg, "Coin already exists", 3000);
  } else if (unitValue <= 0 && !coins.find((coin) => coin.name === coinName)) {
    displayErrorMessage(
      addToWalletErrorMsg,
      "Enter a value greater than 0",
      3000
    );
  }
};

overlayElems.forEach((ele) => {
  ele.addEventListener("click", () => {
    closeModal();
    resetBtn();
  });
});


// console.log(coins);
generatePortfolio();