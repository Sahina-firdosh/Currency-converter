// new api
// https://v6.exchangerate-api.com/v6/13a8d17f8a1d5e80c07bbef3/latest/USD

const api_url = "https://v6.exchangerate-api.com/v6/13a8d17f8a1d5e80c07bbef3/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector(".calc");
const from_curr=document.querySelector(".from select");
const to_curr=document.querySelector(".to select");
const exchange_rate=document.querySelector(".exchange_rate");

document.querySelector(".to_amount input").readOnly=true;

for (let select of dropdowns) {
    for (currcode in countryList) {
        let new_option = document.createElement("option");
        new_option.innerText = currcode;
        new_option.value = currcode;
        if (select.name === "From" && currcode === "INR") {
            new_option.selected = "Selected";
        }
        else if (select.name === "To" && currcode === "USD") {
            new_option.selected = "Selected";
        }
        select.append(new_option);
    }
    select.addEventListener("change", (evnt) => {
        update_flag(evnt.target);
    })
}

function update_flag(element) {
    let currcode = element.value;
    let currid = countryList[currcode];
    let selected_img = "https://flagsapi.com/" + currid + "/flat/64.png";
    (element.parentElement.querySelector("img")).src = selected_img;
}

btn.addEventListener("click", async (evnt) => {
    evnt.preventDefault();
    let amount = document.querySelector(".from_amount input");
    let amount_val=amount.value;
    if (amount_val <0 || amount_val === "") 
    {
        amount_val = 0;
    }
    
    const final_url= api_url+from_curr.value;
    let response= await fetch(final_url);
    let data = await response.json();
    let rate= data.conversion_rates[to_curr.value];
    
    calc_rate= amount_val*rate;
    show(rate, calc_rate);
});

function show(rate, calc_rate)
{
    exchange_rate.innerText= "1 " + from_curr.value + " = " + rate +" "+ to_curr.value;
    document.querySelector(".to_amount input").value=calc_rate;
}