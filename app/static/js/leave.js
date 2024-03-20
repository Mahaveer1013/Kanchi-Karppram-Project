console.log(`"_leave.js connected..!_"`);

const profileSection = document.querySelector(".profileSection");
const closeForm = document.querySelectorAll(".closeForm");
const leaveBtn = document.querySelector(".leaveBtn");
const lateBtn = document.querySelector(".lateBtn");

leaveBtn.addEventListener("click", function () {
  document.querySelector(".leave_section").classList.add("active");
  document.querySelector(".late_section").classList.remove("active");
  profileSection.classList.remove("active");
});

lateBtn.addEventListener("click", function () {
  document.querySelector(".leave_section").classList.remove("active");
  document.querySelector(".late_section").classList.add("active");
  profileSection.classList.remove("active");
});

closeForm.forEach((close) => {
  close.addEventListener("click", function () {
    close.parentElement.parentElement.classList.remove("active");
    profileSection.classList.add("active");
    document.querySelector(".leave").reset();
  });
});

// document.addEventListener("click", function (event) {
//   const changeField = document.querySelector(".chnageField");
//   const isChangeField = event.target.closest(".chnageField");
//   const changeOptContainer = document.querySelector(".changeOptContainer");

//   if (changeField.style.display!='none' && !isChangeField) {
//     changeOptContainer.style.display = 'none';
//   }
// });

const user_input = document.querySelectorAll(".user_input");

user_input.forEach((input) => {
  input.addEventListener("focus", function () {
    user_input.forEach((userInp) => {
      userInp.classList.remove("active");
    });
    input.classList.add("active");
  });
});

const changeOpts = document.querySelectorAll(".change");

changeOpts.forEach((change) => {
  change.addEventListener("click", function () {
    document.getElementById("uname").value = change.innerHTML;
    document.querySelector(".changeOptContainer").style.display = "block";
  });
});

document.addEventListener("click", function (event) {
  const isChangeField = event.target.closest(".chnageField");
  const isChangeOptContainer = event.target.closest(".changeOptContainer");
  const changeOptContainer = document.querySelector(".changeOptContainer");

  if (isChangeOptContainer && !isChangeField) {
    changeOptContainer.style.display = 'none';
  }
});

const unameInput = document.getElementById("uname");

const user = {};

user.ID = document.querySelector(".uid").innerHTML;
user.oldName = document.querySelector(".uname").innerHTML;
user.oldphone = document.querySelector(".uphone").innerHTML;
user.oldemail = document.querySelector(".uemail").innerHTML;
user.oldDate = document.querySelector(".udoj").innerHTML;
console.log(user);

function checkInputType(input) {
  if (!isNaN(parseFloat(input)) && isFinite(input)) {
    return "Number";
  } else if (typeof input === "string") {
    if (!isNaN(Date.parse(input))) {
      return "Date";
    } else if (input.includes("@") && input.includes(".")) {
      return "Email";
    } else if (/^[a-zA-Z\s]+$/.test(input)) {
      return "StringAlphabetical";
    } else {
      return "String";
    }
  } else {
    return "Unknown";
  }
}

console.log(user);

function send_data(data) {
  fetch("/user-edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error("Error:", error));
}

function changeUserDet() {
  const input = unameInput.value;
  if (input) {
    const output = checkInputType(input);

    if (output === "Number") {
      if (/^\d{10}$/.test(input)) {
        user.newMobileNumber = input;
        document.querySelector(".changeOptContainer").style.display = "none";
        document.querySelector(".uphone").innerHTML = input;
        console.log(user);
        send_data(user);
      } else {
        alert("Phone number should have exactly 10 digits.");
      }
    } else if (output === "StringAlphabetical") {
      user.newName = input;
      document.querySelector(".uname").innerHTML = input;
      document.querySelector(".changeOptContainer").style.display = "none";
      console.log(user);
      send_data(user);
    } else if (output === "Email") {
      user.newEmail = input;
      document.querySelector(".changeOptContainer").style.display = "none";
      document.querySelector(".uemail").innerHTML = input;
      console.log(user);
      send_data(user);
    } else if (output === "Date") {
      user.newDate = input;
      document.querySelector(".changeOptContainer").style.display = "none";
      document.querySelector(".udoj").innerHTML = input;
      console.log(user);
      send_data(user);
    } else {
      alert("Give a valid input!");
    }
  } else {
    alert("Empty request");
  }
}
