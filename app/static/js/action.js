console.log("action.js");

const all_btns = document.querySelectorAll(".action-menu");
const all_pages = document.querySelectorAll(".page-action");
let today_attendance = document.querySelector(".today-attendance");
let month_attendance = document.querySelector(".month-attendance");

all_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    let index = btn.getAttribute("index");
    showPage(index);
    localStorage.setItem("button", index);
  });
});

let lastClick = localStorage.getItem("button");

if (lastClick != null || lastClick.length > 0) {
  showPage(lastClick);
}

function showPage(index) {
  all_pages.forEach((page) => {
    let pageIndex = page.getAttribute("index");
    if (index == pageIndex) {
      page.style.display = "flex";
    } else {
      page.style.display = "none";
    }
  });
  all_btns.forEach((buttons) => {
    if (buttons.getAttribute("index") == index) {
      buttons.classList.add("active");
    } else {
      buttons.classList.remove("active");
    }
  });
}

let shift_change = document.querySelector(".shift_change");
let today_attend_btn = document.querySelector(".today-attend-btn");
if (today_attend_btn) {
  today_attend_btn.addEventListener("click", () => {
    shift_change.style.visibility = "visible";
    today_attendance.style.display = "flex";
    month_attendance.style.display = "none";
  });
}
let month_attend_btn = document.querySelector(".month-attend-btn");
if (month_attend_btn) {
  month_attend_btn.addEventListener("click", () => {
    shift_change.style.visibility = "hidden";
    month_attendance.style.display = "flex";
    today_attendance.style.display = "none";
  });
}

const tag_btns = document.querySelectorAll(".click");
const all_frame = document.querySelectorAll(".frame");

// tag_btns.forEach((btn) => {
//   btn.addEventListener("click", () => {
//     let index = btn.getAttribute("index");
//     all_frame.forEach((page) => {
//       let pageIndex = page.getAttribute("index");
//       if (index == pageIndex) {
//         page.style.display = "block";
//       } else {
//         page.style.display = "none";
//       }
//     });
//     tag_btns.forEach((buttons) => {
//       buttons.classList.remove("active");
//     });
//     btn.classList.add("active");
//   });
// });

const btn_display = document.querySelectorAll(".btn-display");
const display_box = document.querySelectorAll(".empdisplay");

btn_display.forEach((btn) => {
  btn.addEventListener("click", () => {
    let btnIndex = btn.getAttribute("emp-index");
    console.log(btnIndex);
    display_box.forEach((box) => {
      let boxIndex = box.getAttribute("emp-index");
      if (btnIndex == boxIndex) {
        box.style.display = "flex";
      } else {
        box.style.display = "none";
      }
    });
    btn_display.forEach((display) => {
      display.classList.remove("active");
    });
    btn.classList.add("active");
  });
});

const btn_backup__display = document.querySelectorAll(".btn-backup-display");
const display_backup_box = document.querySelectorAll(".backupdisplay");

btn_backup__display.forEach((btn) => {
  btn.addEventListener("click", () => {
    let btnIndex = btn.getAttribute("backup-index");
    console.log(btnIndex);
    display_backup_box.forEach((box) => {
      let boxIndex = box.getAttribute("backup-index");
      if (btnIndex == boxIndex) {
        box.style.display = "flex";
      } else {
        box.style.display = "none";
      }
    });
    btn_backup__display.forEach((display) => {
      display.classList.remove("active");
    });
    btn.classList.add("active");
  });
});
