const sidemenu = document.querySelector(".sidemenu");
const toggle_sidemenu = document.querySelector(".toggle_sidemenu");
const main = document.querySelector(".main");
const all_sections = document.querySelectorAll(".section");
const all_click = document.querySelectorAll(".click");

const user = {};

let uId = document.querySelector(".uid").textContent.trim();      // the value is #1 so cutting the (#)
let emp_id=Number(uId.slice(1))
user.empId = emp_id;// the value is #1 so cutting the (#)
console.log(uId);

// toggle sidemenu
toggle_sidemenu.addEventListener("click", () => {
  sidemenu.classList.toggle("active");
  toggle_sidemenu.classList.toggle("active");
  main.classList.toggle("active");
});

// display respective sections
all_click.forEach((click) => {
  click.addEventListener("click", () => {
    let index = click.getAttribute("index");
    document.querySelector(".current_path_name").innerHTML =
      click.textContent.trim();
    showSection(index);
    localStorage.setItem("lastClick", index);
    // click.classList.add("active");
  });
});

function showSection(index) {
  all_sections.forEach((section) => {
    let sectionIndex = section.getAttribute("index");
    if (index == sectionIndex) {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  });
  all_click.forEach((btn) => {
    if (index == btn.getAttribute("index")) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

let lastClick = localStorage.getItem("lastClick");
if (lastClick != null) {
  showSection(lastClick);
}

const all_input = document.querySelectorAll(".input");
const all_btn = document.querySelectorAll(".submit");
const all_cancel = document.querySelectorAll(".cancel");
const all_field = document.querySelectorAll(".input_field");

all_input.forEach((input) => {
  input.addEventListener("click", () => {
    input.removeAttribute("readonly");
    let type = input.getAttribute("name");
    user.type = type;
    if (type === 'password') {
      user.old = '-';
    } else {
      user.old = input.value;
    }
    input.parentElement.classList.add("active");
  });
});

all_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    let confirmation = confirm("Confirm To send Request to HR")
    if (confirmation) {
      let newvalue = btn.previousElementSibling.value;
      if (newvalue.length > 0) {
        user.new = newvalue;
      } else {
        user.new = user.old;
      }
      btn.previousElementSibling.value = user.new;
      // send data to backend
      console.log(user);
      fetch("/user-edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((data) => data.json())
        .then((data) => {
          btn.parentElement.classList.remove("active");
          console.log(data);
          let model = document.querySelector(".message_model");
          model.classList.add("active");
          if (data.status == true) {
            model.classList.add("success");
            model.querySelector(".title").innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    Success
                `
          } else {
            model.classList.add("error");
            model.querySelector(".title").innerHTML = `
                    <i class="fas fa-exclamation-circle"></i>
                    Error
        `
          }
        

          model.querySelector(".message").innerHTML = data.message;

          setTimeout(() => {
            model.classList.remove("active");
          }, 5005);



        })
        .catch((error) => console.error("Error:", error));
      // after response
    }
    });
});

all_cancel.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.previousElementSibling.setAttribute("readonly", true);
    btn.parentElement.classList.remove("active");

    let input = btn.previousElementSibling.previousElementSibling;
    input.value = user.old;
  });
});

all_field.forEach((field) => {
  field.addEventListener("blur", () => {
    field.querySelector("input").setAttribute("readonly", true);
    field.classList.remove("active");
  });
});

// function check(emp_id){
//   fetch("/check_user_request", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(emp_id),
//   })
//     .then((response) => response.json()) // Adjust if the response is JSON
//     .then((data) => {
      
//     });
// };
// setInterval(check(emp_id),1000);