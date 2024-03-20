console.log("filter.js");
const all_rows = document.querySelectorAll(".today-attendance-table tbody tr");
const all_shiftDisplay = document.querySelectorAll(".currentShift");

let finaldetails;

filter(current_shifts);

let shiftSelect = document.getElementById("shift");

shiftSelect.addEventListener("change", () => {
  let shift = shiftSelect.value;
  if (shift == "current" || shift.length <= 0) {
    filter(current_shifts);
  } else if (shift == "all") {
    all_rows.forEach((row) => {
      row.style.display = "";
    });
  } else {
    filter(shift.toUpperCase());
  }
});
// function sendAlert(id, action) {
//   console.log("ID: ", id);

//   // Create an object with the ID
//   const data = { id: id };
//   let route = "";
//   let confirm_msg = false;
//   if (action === "cancel") {
//     confirm_msg = confirm("Are You Sure ? \nDo You Want to Cancel ?");
//     if (confirm_msg) {
//       route = "/send_message";
//       document.querySelector(".reload").classList.add("active");
//     }
//   } else if (action === "continue") {
//     confirm_msg = confirm("Are You Sure ? \nDo You Want to Continue ?");
//     if (confirm_msg) {
//       route = "/send_continue_message";
//       document.querySelector(".reload").classList.add("active");
//     }
//   }

//   fetch(route, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       document.querySelector(".reload").classList.remove("active");
//       console.log(data);
//       let cancel = document.querySelector(`.cancel-${id}`);
//       let continueBtn = document.querySelector(`.continue-${id}`);

//       cancel.disabled = "true";
//       cancel.style.cursor = "not-allowed";
//       if (continueBtn) {
//         continueBtn.disabled = "true";
//         continueBtn.style.cursor = "not-allowed";
//       }
//       window.location.href = "";
//     });
// }

function filter(currentShift) {
  all_rows.forEach((row) => {
    // console.log(
    //   currentShift.toUpperCase() == row.getAttribute("data-shift").toUpperCase()
    // );
   
    if (
      currentShift.includes(row.getAttribute("data-shift").toUpperCase())
    ) {
      row.style.display = "";
      // console.log(row);
      if (row.querySelector(".rowStatus")){
        if (row.querySelector(".rowStatus").textContent.toLowerCase().trim() ==
          "wrong shift:"
        ) {
          row.style.display = "";
        }
      }
    }
      
    if (
      (currentShift.includes(row.getAttribute("data-shift").toUpperCase())) ==
      false
    ) {
      row.style.display = "none";
     if (row.querySelector(".rowStatus")) {
       if (
         row.querySelector(".rowStatus").textContent.toLowerCase().trim() ==
         "wrong shift:"
       ) {
         row.style.display = "";
       }
     }
    }
    all_shiftDisplay.forEach((display) => {
      // console.log(currentShift.toUpperCase());
      // console.log(display.children[0]);
      shift = currentShift.replace("[", "");
      shift = shift.replace("]", "");
      shift = shift.replaceAll("'", "");
      
      display.children[0].innerHTML = `<span class='tag'>${shift.toUpperCase()}</span>`;
    });
  });
}


all_rows.forEach((row) => {
  let id = row.querySelector(".emp_id").innerHTML;
  let intime = row.querySelector(".intime");
  let outtime = row.querySelector(".outtime");
  let status = row.querySelector(".status");
  let action = row.querySelector(".action");
  let branch = row.querySelector(".branch");

  // // check intime for 10mins late
  let shiftOutTimeStr = row.querySelector(".shiftOutTime").textContent; // "20:00"
  let curr_date = row.querySelector(".attend_date").textContent; // "2024-02-06"
  // console.log('attend_date', curr_date);

  let shiftOutTime = new Date(curr_date + "T" + shiftOutTimeStr + ":00");
  // let shiftOutTime = new Date("Tue Feb 07 2024 08:49:00 GMT+0530 (India Standard Time)");
  let date = new Date();

  // Calculate 10 minutes after shiftOutTime
  let tenMinutesAfterShiftOutTime = new Date(
    shiftOutTime.getTime() + 10 * 60000
  );
  if (outtime && outtime.querySelector(".punchOptionsDiv")) {
    if (date >= shiftOutTime && date <= tenMinutesAfterShiftOutTime) {
      // Run your function here
      row.classList.add("mis-pinch");
      console.log(
        "Current time is between shiftOutTime and 10 minutes after shiftOutTime."
      );
    }
  }

  if (status.textContent.toLowerCase().trim() == "absent") {
    row.classList.add("mis-pinch");
  }

  // if (minutesDifference > 10) {
  //   intime.innerHTML = `<div class="table-tag punchOptionsDiv">
  //                           <label for="punchOptions">${hisInTimeStr}</label>
  //                           <select id="punchOptions" class='punchOptions'>
  //                               <option value="half-day">Half Day</option>
  //                               <option value="communicated">Communicated</option>
  //                               <option value="grace-time">Grace Time</option>
  //                           </select>
  //                       </div>`;
  //   action.innerHTML = `
  //                       <form class="btns-container">
  //                           <input type="hidden" name="empid" value="${id}">
  //                           <button type="button" class="table-btn continue continue-${id}">Save</button>
  //                       </form>
  //                     `;
  // }

  //check no in time or out time

  // if (
  //   (intime && (intime.innerHTML == "-" || intime.innerHTML == "")) ||
  //   (outtime && (outtime.innerHTML == "-" || outtime.innerHTML == ""))
  // ) {
  //   if (intime.innerHTML == "-") {
  //     row.classList.add("mis-pinch");
  //   }
  //   if (outtime.innerHTML == "-") {
  //     // let shiftInTimeStr = row.querySelector('.shiftOutTime').textContent;// 20:00

  //     // let shiftOutTimeStr = row.querySelector('.shiftOutTime').textContent;// 20:00
  //     // let hisOutTimeStr = row.querySelector('.outtime').textContent; //14:00

  //     // const currentTime = new Date();
  //     // const currentHours = currentTime.getHours();
  //     // const currentMinutes = currentTime.getMinutes();
  //     // const formattedCurrentTime = `${currentHours}:${currentMinutes}:00`;

  //     // let shiftOutTime = new Date(currentTime + "T" + shiftOutTimeStr + ":00");

  //     // let curr_date = row.querySelector('.attend_date').textContent;
  //     // let time = new Date(curr_date + "T" + formattedCurrentTime + ":00");

  //     // let timeDifference = shiftOutTime - time;

  //     //     row.querySelector(".action").innerHTML = `
  //     //     <form class="btns-container">
  //     //     <input type="hidden" name="empid" value="${id}">
  //     //     <button type="button")" class="table-btn">Save</button>
  //     // </form >
  //     //     `;
  //   }

  //   // action.innerHTML = `
  //   //         <form class="btns-container">
  //   //             <input type="hidden" name="empid" value="${id}">
  //   //             <button type="button" class="table-btn continue continue-${id}">Save</button>
  //   //         </form>
  //   //       `;
  // }

  //checking for wrong shift

  // if (status.textContent.toLowerCase().trim() == "wrong shift") {
  //   action.innerHTML = `
  //           <form class="btns-container">
  //               <input type="hidden" name="empid" value="${id}">
  //               <button type="button" class="table-btn continue continue-${id}">Save</button>
  //           </form>
  //         `;
  //   if (branch.textContent.toLowerCase().trim() == 'kkl') {
  //     status.innerHTML = `<div class="table-tag punchOptionsDiv">
  //                         <label for="punchOptions">Wrong Shift:</label>
  //                         <select id="punchOptions" class='punchOptions'>
  //                             <option value="call-duty">Call Duty (KKL)</option>
  //                             <option value="wrong-shift">Wrong Shift</option>
  //                         </select>
  //                     </div>`;
  //   }
  //   else {
  //     status.innerHTML = `<div class="table-tag punchOptionsDiv">
  //                         <label for="punchOptions">Wrong Shift:</label>
  //                         <select id="punchOptions" class='punchOptions'>
  //                         <option value="over-time">Over Time</option>
  //                         <option value="wrong-shift">Wrong Shift</option>
  //                             </select>
  //                     </div>`;
  //   }
  // }

  // if (status.textContent.toLowerCase().trim() == "communicated") {
  //   status.innerHTML = `<p class="table-tag">Communicated</p>`;
  //   row.classList.add("communicated");
  //   // row.querySelector(".action").innerHTML = `
  //   //     <div class="btns-container">
  //   //         <input type="hidden" name="type" id="type" value="${id}">
  //   //         <button type="button" onclick="sendAlert(${id},'cancel')" class="table-btn cancel cancel-${id}">Cancel</button>
  //   //         <button type="button" onclick="sendAlert(${id},'continue')" class="table-btn continue continue-${id}">Continue</button>
  //   //     </div>
  //   //   `;
  // } else {
  //   row.classList.remove("communicated");
  // }
  // if (status.textContent.toLowerCase().trim() == "absent") {
  //   status.innerHTML = `<p class="table-tag">Absent</p>`;
  //   row.classList.add("absent");
  //   // row.querySelector(".action").innerHTML = `
  //   //     <div class="btns-container">
  //   //         <input type="hidden" name="type" id="type" value="${id}">
  //   //         <button type="button" onclick="sendAlert(${id},'cancel')" class="table-btn cancel cancel-${id}">Cancel</button>
  //   //         <button type="button" onclick="sendAlert(${id},'continue')" class="table-btn continue continue-${id}">Continue</button>
  //   //     </div>
  //   //   `;
  // } else {
  //   row.classList.remove("absent");
  // }
  // if (status.textContent.toLowerCase().trim() == "present") {
  //   status.innerHTML = `<p class="table-tag">Present</p>`;
  //   row.classList.add("present");
  //   // row.querySelector(".action").innerHTML = `
  //   //     <div class="btns-container">
  //   //         <input type="hidden" name="type" id="type" value="${id}">
  //   //         <button type="button" onclick="sendAlert(${id},'cancel')" class="table-btn cancel cancel-${id}">Cancel</button>
  //   //         <button type="button" onclick="sendAlert(${id},'continue')" class="table-btn continue continue-${id}">Continue</button>
  //   //     </div>
  //   //   `;
  // } else {
  //   row.classList.remove("present");
  // }
  // if (status.textContent.toLowerCase().trim() == "ot") {
  //   status.innerHTML = `<p class="table-tag">OT</p>`;
  //   row.classList.add("overTime");
  //   // row.querySelector(".action").innerHTML = `
  //   //     <div class="btns-container">
  //   //         <input type="hidden" name="type" id="type" value="${id}">
  //   //         <button type="button" onclick="sendAlert(${id},'cancel')" class="table-btn cancel cancel-${id}">Cancel</button>
  //   //         <!-- <button type="button" onclick="sendAlert(${id},'continue')" class="table-btn continue continue-${id}">Continue</button>-->
  //   //     </div>
  //   //   `;
  // } else {
  //   row.classList.remove("overTime");
  // }
});

let shiftDetails = [
  {
    shiftName: "8A",
    shiftIntime: "06:00",
    shiftOuttime: "14:00",
  },
  {
    shiftName: "8B",
    shiftIntime: "14:00",
    shiftOuttime: "22:00",
  },
  {
    shiftName: "8C",
    shiftIntime: "22:00",
    shiftOuttime: "06:00",
  },
];

// let shiftDetail = getShift();
// console.log(shiftDet[0]);
// console.log(shiftDetails);

let alertSent = false;
let elapsedMinutes = 0; // Declare elapsedMinutes outside the functions

function getCurrentShiftInfo(currentTime) {
  const [currentHours, currentMinutes] = currentTime.split(":").map(Number);

  for (const shift of shiftDetails) {
    const shiftIntime = shift.shiftIntime.split(":").map(Number);
    const shiftOuttime = shift.shiftOuttime.split(":").map(Number);

    if (
      (currentHours > shiftIntime[0] ||
        (currentHours === shiftIntime[0] &&
          currentMinutes >= shiftIntime[1])) &&
      (currentHours < shiftOuttime[0] ||
        (currentHours === shiftOuttime[0] && currentMinutes < shiftOuttime[1]))
    ) {
      const remainingMinutes =
        shiftOuttime[0] * 60 +
        shiftOuttime[1] -
        (currentHours * 60 + currentMinutes);
      const shiftStartTime = `${shiftIntime[0]}:${shiftIntime[1]}`;

      return {
        currentShift: shift.shiftName,
        timeRemaining: remainingMinutes,
        shiftStartTime: shiftStartTime,
        totalShiftTime: shiftOuttime[0] * 60 + shiftOuttime[1],
      };
    }
  }

  return {
    currentShift: "No shift found",
    timeRemaining: 0,
    shiftStartTime: "N/A",
    totalShiftTime: 0,
  };
}

function convertMinutesToHoursAndMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return { hours, minutes: remainingMinutes };
}

function getTimeSinceShiftStarted(shiftStartTime, currentTime) {
  const [startHours, startMinutes] = shiftStartTime.split(":").map(Number);
  const [currentHours, currentMinutes] = currentTime.split(":").map(Number);

  const startTotalMinutes = startHours * 60 + startMinutes;
  const currentTotalMinutes = currentHours * 60 + currentMinutes;

  return currentTotalMinutes - startTotalMinutes;
}

function calculatePercentage(timeTaken, totalShiftTime) {
  return (timeTaken / totalShiftTime) * 100;
}

function calculateShiftProgress(elapsedMinutes, totalShiftTime) {
  const progressPercentage = (elapsedMinutes / totalShiftTime) * 100;
  return progressPercentage.toFixed(2);
}

function calculateCompletionPercentage(elapsedMinutes, totalShiftTime) {
  const completionPercentage = calculatePercentage(
    elapsedMinutes,
    totalShiftTime
  );
  console.log(`Percentage of Completion: ${completionPercentage.toFixed(2)}%`);
}

function sendAlertMsg(currentShift, lastShift) {
  if (!alertSent) {
    // console.log(currentShift,lastShift);

    fetch(
      `/send_message_data?current_shift=${currentShift}&last_shift=${lastShift}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
      });
  }
}

function logElapsedTime() {
  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  const currentMinutes = currentTime.getMinutes();
  const formattedCurrentTime = `${currentHours}:${currentMinutes}`;

  const shiftInfo = getCurrentShiftInfo(formattedCurrentTime);
  // Calculate time elapsed since the shift started
  if (shiftInfo.currentShift !== "No shift found") {
    elapsedMinutes = getTimeSinceShiftStarted(
      shiftInfo.shiftStartTime,
      formattedCurrentTime
    );
    const elapsedHoursAndMinutes =
      convertMinutesToHoursAndMinutes(elapsedMinutes);
    //   console.log(`Time Elapsed Since Shift Started: ${elapsedHoursAndMinutes.hours} hours ${elapsedHoursAndMinutes.minutes} minutes`);

    // Log the "Time Remaining for Next Shift" message
    //   console.log(`Time Remaining for Next Shift: ${convertMinutesToHoursAndMinutes(shiftInfo.timeRemaining).hours} hours ${convertMinutesToHoursAndMinutes(shiftInfo.timeRemaining).minutes} minutes`);
    let lastShift;
    if (shiftInfo.currentShift === "8A") {
      lastShift = "8C";
    } else if (shiftInfo.currentShift === "8B") {
      lastShift = "8A";
    } else if (shiftInfo.currentShift === "8C") {
      lastShift = "8B";
    } else {
      console.log("shift not found");
    }
    let current_last_shift = [shiftInfo.currentShift, lastShift];
    // console.log(current_last_shift);
    return current_last_shift;
  } else {
    // console.log("No shift found. Unable to calculate elapsed time.");
  }
}

function checkElapsedTime() {
  let current_last_shift = logElapsedTime();

  // Check if 17 minutes have elapsed and alert has not been sent
  if (elapsedMinutes >= 10 && !alertSent) {
    // console.log("Alert: 10 minutes have elapsed since the shift started!");
    if (!alertSent) {
      sendAlertMsg(current_last_shift[0], current_last_shift[1]);
    } // Set flag to true to indicate that the alert has been sent
    alertSent = true;
  }
}

setInterval(checkElapsedTime, 1000); // Check every 1000 milliseconds (1 second)
setInterval(logElapsedTime, 10000); // Log every 10 seconds

function save_changes(emp_id, date) {
  if (!window.confirm("Are you sure you want to save changes?")) {
    return;
  }

  console.log(emp_id);
  let formData = new FormData();
  formData.append("emp_id", emp_id);
  formData.append("date", date);

  // if (document.querySelector(".late-punch-in-" + emp_id)) {
  //   let latePunchIn = document.querySelector(".late-punch-in-" + emp_id).value;
  //   console.log("latePunchIn " + latePunchIn);
  //   formData.append("latePunchIn", latePunchIn);
  // }
  if (document.querySelector(".punch-in-" + emp_id)) {
    let punchIn = document.querySelector(".punch-in-" + emp_id).value;
    console.log("punchIn " + punchIn);
    formData.append("punchIn", punchIn);
  }
  if (document.querySelector(".punch-out-" + emp_id)) {
    let punchOut = document.querySelector(".punch-out-" + emp_id).value;
    console.log("punchOut", punchOut);
    formData.append("punchOut", punchOut);
  }
  if (document.querySelector(".wrongshift-" + emp_id)) {
    let wrongShift = document.querySelector(".wrongshift-" + emp_id).value;
    console.log("wrongShift", wrongShift);
    formData.append("wrongShift", wrongShift);
  }
  formData.forEach((key,data) => {
    console.log('key '+key+'data ',data);
  });

  fetch("/save_attendance", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle response data if necessary
      let action = document.querySelector(".action-" + emp_id);
      if (action) {
        action.innerHTML = `<p class="table-tag tag">N/A</p>`;
        // status.innerHTML=``
      } else {
        console.log("error here");
      }
      console.log(data);
      window.location.href = '';
    })
    .catch((error) => {
      // Handle fetch error
      console.error("Fetch error:", error);
    });
}

// change all innerHTMl according to response
