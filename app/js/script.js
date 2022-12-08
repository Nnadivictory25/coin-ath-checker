const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const unitsValueForm = document.querySelector("#coinUnitsForm");
const unitsInput = document.querySelector("#coinsUnits");
const searchBtn = document.querySelector("#searchBtn");
const loadingImg = document.querySelector("#loaderImg");
const coinsContainer = document.querySelector(".coinsCtn");
const errorMsgElement = document.querySelector('.errorMessage')
const walletBalance = document.querySelector('.walletBalance')
const emptyMessage = document.querySelector('.emptyMessage')

let coinQuery = "";
let unitValue = 0
let imgUrl = ''
let coinName = ''


let closeModal = () => {
    overlay.classList.add('vh')
    modal.classList.add('vh')
}

let openModal = () => {
    overlay.classList.remove('vh')
    modal.classList.remove('vh')
}

let resetBtn = () => {
    searchBtn.textContent = "Search";
    loadingImg.classList.add("dn");
    searchInput.value = ''
}

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
      code: `${coinQuery}`,
      meta: true,
    }),
  }).then((res) => res.json())
      .then((json) => {
          
        
          console.log(json);
          const coin = json
          openModal()
          imgUrl = coin.png64
          coinName = coin.name
          if (coinName.split(' ').length > 2) {
             coinName = coinName.split(' ').map((name) => name[0]).join('')
          }
          modal.innerHTML = `
          <div class="coin_info flex justify-between items-center px-6 pb-2 border-b-2 border-indigo-500">
          <img class="w-16 rounded-full" src=${coin.png64} alt="">
          <p class="coinName font-bold text-2xl uppercase">${coinName}</p>
          <div class="priceCtn flex flex-col text-center">
              <p class="font-bold text-slate-300">ATH</p>
              <p class="ath font-bold text-lg">$${(coin.allTimeHighUSD).toFixed(3)}</p>
          </div>
      </div>

      <div class="info px-8 flex gap-x-3 mt-2">
          <i class="bi bi-info-circle"></i>
          <p class="text-xs">Input how many ${coinName} you have below , then click 'add to wallet' to calculate the value of your holding when it goes back to all time high</p>
      </div>

      <div  id="coinUnitsForm" class="px-5 mt-8">
          <p class="text-lg font-semibold py-3">How many ${coinName} do you have ?</p>
          <input oninput="updateUnit(this.value)" id="coinsUnits" class="w-full p-3 rounded-md mb-5 text-black"  placeholder="Enter coin quantity, eg '10,500'" required type="text">
          <p class="unitvalueErrMsg text-red-600 py-2"></p>
          <button onclick="addCoin(${(coin.allTimeHighUSD).toFixed(3)})" class="w-full rounded-md px-1 py-3 font-bold " type="submit">Add to wallet</button>
      </div>

          `
          console.log(unitValue);
      })
      .catch(error => {
          errorMsgElement.textContent = 'Something went wrong, try searching for another coin or try again later'
          closeModal()
          resetBtn()

          setTimeout(() => {
            errorMsgElement.textContent = ''
          }, 4000)
    });
});

let updateUnit = (value) => {
    this.value = this.value.toLocaleString('en-US')
    unitValue = +value
    console.log(unitValue);
}


let addCoin = (coinAth, units = unitValue, img = imgUrl) => {
    if (unitValue > 0) {
        closeModal()
        emptyMessage.remove()
        resetBtn()
    
        const value = (coinAth * units).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        console.log(coinAth, units);
        coinsContainer.innerHTML += `
    
        <div class="coinCtn w-full mt-7 flex justify-between items-center p-3 lg:py-4 lg:px-5">
            <div class="imgCtn flex flex-col justify-center items-center my-auto">
                <img class="w-16 rounded-full" src=${img} alt="...">
                <p class="coinName font-semibold py-1">${coinName}</p>
          </div>
            <div class="priceCtn flex flex-col text-center">
                <p class="font-bold text-slate-300">Quantity</p>
                <p class="ath font-bold text-lg">${units}</p>
            </div>
            <div class="priceCtn flex flex-col text-center">
                <p class="font-bold text-slate-300">Value(ATH)</p>
                <p class="ath font-bold text-lg">${value}</p>
            </div>
        </div>
        `
    }
    
}