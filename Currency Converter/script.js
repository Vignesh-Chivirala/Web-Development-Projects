

  const base_url ="https://2024-03-06.currency-api.pages.dev/v1/currencies/";

  const dropdowns = document.querySelectorAll(".dropdown select");
  const butn=document.querySelector("form button");
  const fromCurr=document.querySelector(".from select");
  const toCurr=document.querySelector(".to select");
  const msg=document.querySelector(".msg");

for(let select of dropdowns){
    for (currCode in countryList){
        let newOption =document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode ==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currCode ==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    }
    )
}


const updateExchangeRate = async ()=>{
    let amount =document.querySelector("form input");
    let amtval=amount.value;
    if(amtval==="" || amtval<1){
        amtval=1;
        amount.value=1;
    }



const URL=`${base_url}/${fromCurr.value.toLowerCase()}.json`;
let response = await fetch(URL);
let data = await response.json();
let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

// console.log("API Response:", data);


// console.log(URL);
let finalAmount = (rate * parseFloat(amtval)).toFixed(2);
msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    


};

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src =newsrc;

};

butn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load",()=>{
    updateExchangeRate();
});