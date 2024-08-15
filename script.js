let heading = document.querySelector(".heading");
let headingMatter = document.querySelector(".heading-matter");
let step = document.querySelectorAll(".next-step");
let number = document.querySelectorAll(".number");
let nextStep = document.querySelectorAll(".submit");
let confirm = document.querySelector(".confirm");
let goBack = document.querySelectorAll(".go-back");
let buttons = document.querySelector(".buttons");
let detailsContainer = document.querySelector(".details-container");
let myForm = document.querySelector(".my-form");
let totalAmount = document.querySelector(".total-amount");
let totalName = document.querySelector(".total-name");
let currentStep = 1;
let validation = "";
let headings = [
  "Personal info",
  "Select your plan",
  "Pick add-ons",
  "Finishing up",
];
let headingMatters = [
  "Please provide your name, email address, and phone number.",
  "You have the option of monthly or yealry billing.",
  "Add-ons help enhance your gaming experience.",
  "Double-check everything looks OK before confirming.",
];
// myForm.onsubmit = (e) => {
//   e.preventDefault();
//   if (currentStep > 1) return;
//   if (checkValidation()) {
//     handleSteps();
//   }
// };
nextStep.forEach((ele) => {
  ele.addEventListener("click", () => {
    console.log("clicked");
    if (currentStep == 1 && !checkValidation()) return;
    if (currentStep == 4) {
      detailsContainer.classList.add("hidden");
      document.querySelector(".nav-buttons-mobile").style.display = "none";
    }
    heading.innerText = headings[currentStep];
    headingMatter.innerText = headingMatters[currentStep];
    handleSteps();
    totalAmount.innerText = getTotalAmount();
    if(planPeriod === "monthly") {
      totalName.innerText = "Total (per month)";
    }else {
      totalName.innerText = "Total (per year)";
    }
    currentStep += 1;
  });
});


goBack.forEach((ele) => {
    ele.addEventListener("click", () => {
        step[currentStep - 2].classList.remove("hidden");
        step[currentStep - 1].classList.add("hidden");
    number[currentStep - 1].classList.remove("number-active");
    number[currentStep - 2].classList.add("number-active");
    currentStep -= 1;
    console.log(currentStep);
    heading.innerText = headings[currentStep - 1];
    headingMatter.innerText = headingMatters[currentStep - 1];
    if (currentStep == 1) {
        goBack.classList.add("hidden");
        buttons.style.justifyContent = "flex-end";
    }
  });
});

function handleSteps() {
  step[currentStep].classList.remove("hidden");
  step[currentStep - 1].classList.add("hidden");
  if (currentStep < 4) {
    number[currentStep - 1].classList.remove("number-active");
    number[currentStep].classList.add("number-active");
  }
  goBack.forEach(ele => {
      ele.classList.remove("hidden");
  });
  buttons.style.justifyContent = "space-between";
}

function checkValidation() {
  let formName = document.querySelector("#name").value.trim();
  let nameError = document.querySelector(".name-error");
  let formAddress = document.querySelector("#email").value.trim();
  let emailError = document.querySelector(".email-error");
  let formNumber = document.querySelector("#phone").value.trim();
  let numberError = document.querySelector(".number-error");
  let name = document.querySelector("#name");
  let address = document.querySelector("#email");
  let phone = document.querySelector("#phone");
  let result = true;
  if (formName === "") {
    handleError(name, nameError);
    result = false;
  } else {
    handleSucess(name, nameError);
  }

  if (formAddress === "") {
    handleError(address, emailError);
    result = false;
  } else if (!isEmail(formAddress)) {
    handleError(address, emailError);
    emailError.innerText = "Not a Valid Email";
    result = false;
  } else {
    handleSucess(address, emailError);
  }

  if (formNumber === "") {
    handleError(phone, numberError);
    result = false;
  } else {
    handleSucess(phone, numberError);
  }
  return result;
}

function handleError(element, errorElement) {
  errorElement.style.display = "inline";
  element.classList.add("error-line");
}

function handleSucess(element, errorElement) {
  errorElement.style.display = "none";
  element.classList.remove("error-line");
}

function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

// step - 2

let planBoxes = document.querySelectorAll(".box");
let periodChange = document.querySelector(".plan-button");
let prices = document.querySelectorAll(".price");
let discount = document.querySelectorAll(".discount");
let changeButton = document.querySelector(".change");
let planPeriod = "monthly";
let monthlyPlanPrices = [9, 12, 15];
let yearlyPlanPrices = [90, 120, 150];
let selectedPlan = planBoxes[0];
selectedPlan.classList.add("selected");
planBoxes.forEach((ele, curr) => {
  ele.addEventListener("click", () => {
    currEle = ele;
    selectedPlan = ele;
    handlePlanChange(currEle);
    updateCheckOut();
  });
});

periodChange.addEventListener("click", () => {
  if (planPeriod === "monthly") {
    periodChange.style.justifyContent = "flex-end";
    planPeriod = "yearly";
    changePlans();
    updateAddOnPrices();
    updateCheckOut();
  } else {
    periodChange.style.justifyContent = "flex-start";
    planPeriod = "monthly";
    changePlans();
    updateAddOnPrices();
    updateCheckOut();
  }
});

changeButton.addEventListener("click",() => {
    step[currentStep - 1].classList.add("hidden");
    step[currentStep - 3].classList.remove("hidden");
    number[currentStep - 1].classList.remove("number-active");
    number[currentStep - 3].classList.add("number-active");
    currentStep -= 2;
})

function handlePlanChange(currEle) {
  planBoxes.forEach((ele) => {
    if (ele === currEle) {
      ele.classList.add("selected");
    } else {
      ele.classList.remove("selected");
    }
  });
}

let currentPlanPrices = [];
function changePlans() {
  if (planPeriod === "monthly") {
    for (let i = 0; i < monthlyPlanPrices.length; i++) {
      currentPlanPrices[i] = `$${monthlyPlanPrices[i]}/mo`;
      discount[i].style.display = "none";
    }
  } else {
    for (let i = 0; i < monthlyPlanPrices.length; i++) {
      currentPlanPrices[i] = `$${yearlyPlanPrices[i]}/yr`;
      discount[i].style.display = "inline";
    }
  }
  for (let i = 0; i < monthlyPlanPrices.length; i++) {
    prices[i].innerText = currentPlanPrices[i];
  }
}

//  step - 3

let addOnBoxes = document.querySelectorAll(".add-ons-box");
let addOnMonthlyPrices = [1, 2, 2];
let addOnYearlyPrices = [10, 20, 20];
let selectedAddOns = document.querySelectorAll(".selected-add-on-details");
let addOns = [];
addOnBoxes.forEach((ele, index) => {
  ele.addEventListener("click", () => {
    let checkBox = ele.querySelector(".check-box");
    if (checkBox.checked) {
      checkBox.checked = false;
      ele.classList.remove("selected");
      addOns[index] = null;
    } else {
      checkBox.checked = true;
      ele.classList.add("selected");
      addOns[index] = ele;
    }
    updateCheckOut();
  });
});

// step - 4
function updateCheckOut() {
  let selectedPlanName = document.querySelector(".selected-plan-name");
  let selectedPlanPrice = document.querySelector(".selected-plan-price");
  selectedPlanName.innerHTML =
    selectedPlan.querySelector(".plan-name").innerHTML;
  selectedPlanPrice.innerText = selectedPlan.querySelector(".price").innerText;
  addOns.forEach((ele, index) => {
    if (ele === null) {
      selectedAddOns[index].classList.add("hidden");
    } else {
      selectedAddOns[index].classList.remove("hidden");
    }
  });
}

let currentAddOnPrices = [];
function updateAddOnPrices() {
  let addOnPrices = document.querySelectorAll(".add-on-price");
  let selectedAddOnPrice = document.querySelectorAll(".selected-add-on-price");
  if (planPeriod === "monthly") {
    for (let i = 0; i < addOnMonthlyPrices.length; i++) {
      currentAddOnPrices[i] = `+$${addOnMonthlyPrices[i]}/mo`;
    }
  } else {
    for (let i = 0; i < addOnMonthlyPrices.length; i++) {
      currentAddOnPrices[i] = `+$${addOnYearlyPrices[i]}/yr`;
    }
  }
  for (let i = 0; i < addOnMonthlyPrices.length; i++) {
    addOnPrices[i].innerText = currentAddOnPrices[i];
    selectedAddOnPrice[i].innerText = currentAddOnPrices[i];
  }
}

function getTotalAmount() {
  let total = 0;
  let currSelectedAddOn = document.querySelectorAll(".selected-add-on-details");
  planBoxes.forEach((ele, index) => {
    if (selectedPlan === ele) {
      if (planPeriod === "monthly") {
        total += monthlyPlanPrices[index];
      } else {
        total += yearlyPlanPrices[index];
      }
    }
  });

  currSelectedAddOn.forEach((ele, index) => {
    if (!ele.classList.contains("hidden")) {
      if (planPeriod === "monthly") {
        total += addOnMonthlyPrices[index];
      } else {
        total += addOnYearlyPrices[index];
      }
    }
  });
  if (planPeriod === "monthly") {
    return `+$${total}/mo`;
  }
  return `+$${total}/yr`;
}
