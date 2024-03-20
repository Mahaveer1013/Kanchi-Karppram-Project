console.log("filter.js");
const all_rows = document.querySelectorAll(".today-attendance-table tbody tr");
const all_shiftDisplay = document.querySelectorAll(".currentShift");

let finaldetails;

let shiftSelect = document.getElementById("shift");

shiftSelect.addEventListener("change", () => {
  let shift = shiftSelect.value;
  if (shift == "" || shift.lenght <= 0) {
    filter(currentShift.shiftName);
  } else {
    filter(shift.toLowerCase());
  }
});
function sendAlert(id, action) {
  console.log("ID: ", id);

  // Create an object with the ID
  const data = { id: id };
  let route = "";
  let confirm_msg = false;
  if (action === "cancel") {
    confirm_msg = confirm("Are You Sure ? \nDo You Want to Cancel ?");
    if (confirm_msg) {
      route = "/send_message";
      document.querySelector(".reload").classList.add("active");
    }
  } else if (action === "continue") {
    confirm_msg = confirm("Are You Sure ? \nDo You Want to Continue ?");
    if (confirm_msg) {
      route = "/send_continue_message";
      document.querySelector(".reload").classList.add("active");
    }
  }

  fetch(route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".reload").classList.remove("active");
      console.log(data);
      let cancel = document.querySelector(`.cancel-${id}`);
      let continueBtn = document.querySelector(`.continue-${id}`);

      cancel.disabled = "true";
      cancel.style.cursor = "not-allowed";
      if (continueBtn) {
        continueBtn.disabled = "true";
        continueBtn.style.cursor = "not-allowed";
      }
      window.location.href = "";
    });
}

function filter(currentShift) {
  all_rows.forEach((row) => {
    // console.log(currentShift.toUpperCase() == row.getAttribute("data-shift").toUpperCase());

    if (
      (currentShift.toUpperCase() ==
        row.querySelector(".shift").textContent.trim().toUpperCase()) ==
      true
    ) {
      row.style.display = "";
      // console.log(row);
      if (
        row.querySelector(".status").textContent.toLowerCase().trim() ==
        "wrong shift"
      ) {
        row.style.display = "";
      }
    }

    if (
      (currentShift.toUpperCase() ==
        row.querySelector(".shift").textContent.trim().toUpperCase()) ==
      false
    ) {
      row.style.display = "none";
      if (
        row.querySelector(".status").textContent.toLowerCase().trim() ==
        "wrong shift"
      ) {
        row.style.display = "";
      }
    }
    all_shiftDisplay.forEach((display) => {
      display.children[0].innerHTML = `<span class='tag'>${currentShift.toUpperCase()}</span>`;
    });
  });
}

function getCurrentShift() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour >= 6 && currentHour < 14) {
    return "8A";
  } else if (currentHour >= 14 && currentHour < 22) {
    return "8B";
  } else if (currentHour >= 22 && currentHour < 6) {
    return "8C";
  } else {
    return "8A";
  }
}

const currentShift = getCurrentShift();
filter(currentShift);

// all_rows.forEach((row) => {
//   let id = row.querySelector(".id").innerHTML;
//   let intime = row.querySelector(".intime");
//   let outtime = row.querySelector(".outtime");
//   let status = row.querySelector(".status");
//   if (
//     (intime && (intime.innerHTML == "-" || intime.innerHTML == "")) ||
//     (outtime && (outtime.innerHTML == "-" || outtime.innerHTML == ""))
//   ) {
//     row.classList.add("mis-pinch");
//     if (intime.innerHTML == "-") {
//       intime.innerHTML = `<div class="table-tag punchOptionsDiv">
//                             <label for="punchOptions">Punch In:</label>
//                             <select id="punchOptions" class='punchOptions'>
//                                 <option value="shiftContinue">Shift Continue</option>
//                                 <option value="overTime">Over Time</option>
//                                 <option value="graceTime">Grace Time</option>
//                                 <option value="missPunch">Miss Punch</option>
//                             </select>
//                         </div>`;
//     }
//     if (outtime.innerHTML == "-") {
//       // outtime.innerHTML = `<div class="table-tag">Punch out</div>`;
//       outtime.innerHTML = `<div class="table-tag punchOptionsDiv">
//                               <label for="punchOptions">Punch Out:</label>
//                               <select id="punchOptions" class='punchOptions'>
//                                   <option value="shiftContinue">Shift Continue</option>
//                                   <option value="overTime">Over Time</option>
//                                   <option value="graceTime">Grace Time</option>
//                                   <option value="missPunch">Miss Punch</option>
//                               </select>
//                            </div>`

//       row.querySelector(".action").innerHTML = `
//       <form class="btns-container">
//       <input type="hidden" name="empid" value="${id}">
//       <button type="button")" class="table-btn">Save</button>
//   </form >
//       `;
//     }

//     row.querySelector(".action").innerHTML = `
//         <form class="btns-container">
//             <input type="hidden" name="empid" value="${id}">
//             <button type="button" onclick="sendAlert(${id},'cancel')"  class="table-btn cancel cancel-${id}">Cancel</button>
//             <button type="button" onclick="sendAlert(${id},'continue')" class="table-btn continue continue-${id}">Continue</button>
//         </form>
//       `;
//   } else {
//     row.classList.remove("mis-pinch");
//   }

//   if (status.textContent.toLowerCase().trim() == "wrong shift") {
//     status.innerHTML = `<p class="table-tag">Wrong Shift</p>`;
//     row.classList.add("wrongShift");
//     row.querySelector(".action").innerHTML = `
//         <div class="btns-container">
//             <input type="hidden" name="type" id="type" value="${id}">
//             <button type="button" onclick="sendAlert(${id},'cancel')" class="table-btn cancel cancel-${id}">Cancel</button>
//             <button type="button" onclick="sendAlert(${id},'continue')" class="table-btn continue continue-${id}">Continue</button>
//         </div>
//       `;
//   } else {
//     row.classList.remove("wrongShift");
//     row.classList.remove("overTime");
//   }
//   if (status.textContent.toLowerCase().trim() == "communicated") {
//     status.innerHTML = `<p class="table-tag">Communicated</p>`;
//     row.classList.add("communicated");
//     row.querySelector(".action").innerHTML = `
//         <div class="btns-container">
//             <input type="hidden" name="type" id="type" value="${id}">
//             <button type="button" onclick="sendAlert(${id},'cancel')" class="table-btn cancel cancel-${id}">Cancel</button>
//             <button type="button" onclick="sendAlert(${id},'continue')" class="table-btn continue continue-${id}">Continue</button>
//         </div>
//       `;
//   }
//   // console.log(status.textContent.toLowerCase().trim());
//   if (status.textContent.toLowerCase().trim() == "absent") {
//     status.innerHTML = `<p class="table-tag">Absent</p>`;
//     row.classList.add("absent");
//     row.querySelector(".action").innerHTML = `
//         <div class="btns-container">
//             <input type="hidden" name="type" id="type" value="${id}">
//             <button type="button" onclick="sendAlert(${id},'cancel')" class="table-btn cancel cancel-${id}">Cancel</button>
//             <button type="button" onclick="sendAlert(${id},'continue')" class="table-btn continue continue-${id}">Continue</button>
//         </div>
//       `;
//   } else if (status.textContent.toLowerCase().trim() == "present") {
//     // status.innerHTML = `<p class="table-tag">Present</p>`;
//     row.classList.add("present");
//     row.querySelector(".action").innerHTML = `
//         <div class="btns-container">
//             <input type="hidden" name="type" id="type" value="${id}">
//             <button type="button" onclick="sendAlert(${id},'cancel')" class="table-btn cancel cancel-${id}">Cancel</button>
//             <button type="button" onclick="sendAlert(${id},'continue')" class="table-btn continue continue-${id}">Continue</button>
//         </div>
//       `;
//   } else {
//     row.classList.remove("wrongShift");
//     row.classList.remove("overTime");
//   }
//   if (status.textContent.toLowerCase().trim() == "ot") {
//     status.innerHTML = `<p class="table-tag">OT</p>`;
//     row.classList.add("overTime");
//     row.querySelector(".action").innerHTML = `
//         <div class="btns-container">
//             <input type="hidden" name="type" id="type" value="${id}">
//             <button type="button" onclick="sendAlert(${id},'cancel')" class="table-btn cancel cancel-${id}">Cancel</button>
//             <!-- <button type="button" onclick="sendAlert(${id},'continue')" class="table-btn continue continue-${id}">Continue</button>-->
//         </div>
//       `;
//   } else {
//     row.classList.remove("wrongShift");
//     row.classList.remove("overTime");
//   }

//   // console.log(status.textContent.trim());
// });
async function getShift() {
  try {
    var datas = [];

    const response = await fetch("/getshift", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ get: true }),
    });

    const data = await response.json();

    console.log(data);

    for (const res in data.res) {
      if (Object.hasOwnProperty.call(data.res, res)) {
        const element = data.res[res];
        datas.push(element);
      }
    }

    // Call a function or do something with datas here if needed

    // Return the datas array
    return datas;
  } catch (error) {
    // Handle any errors that may occur during the fetch operation
    console.error("Error fetching data:", error);
    throw error; // You can choose to handle the error or propagate it
  }
}

async function fetchData() {
  try {
    let shiftDetail = await getShift();
    console.log(shiftDetail);
    return shiftDetail
  } catch (error) {
    // Handle errors from getShift
    console.error("Error:", error);
  }
}

// Call the function to initiate the fetch operation
let shiftDet=fetchData();

// Call the getShift function to initiate the fetch operation
// getShift();

all_rows.forEach((row) => {
  let id = row.querySelector(".emp_id").innerHTML;
  let intime = row.querySelector(".intime");
  let outtime = row.querySelector(".outtime");
  let status = row.querySelector(".status");
  let action = row.querySelector(".action");

  
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
console.log(shiftDet);
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
        console.log(data);
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
    console.log("Alert: 10 minutes have elapsed since the shift started!");
    if (!alertSent) {
      sendAlertMsg(current_last_shift[0], current_last_shift[1]);
    } // Set flag to true to indicate that the alert has been sent
    alertSent = true;
  }
}

setInterval(checkElapsedTime, 1000); // Check every 1000 milliseconds (1 second)
setInterval(logElapsedTime, 10000); // Log every 10 seconds


// console.log('table name = '+ activeTableName);

function displayTable(){

    document.querySelectorAll(".table").forEach(table => {
        table.style.display = 'none';
    });

    var activeTableName = sessionStorage.getItem('active');
    
    if (activeTableName === undefined || activeTableName === null) {
        document.querySelector(`.leavetable`).style.display = 'table';
    }else{
        document.querySelector(`.${activeTableName}`).style.display = 'table';
    }
    
}

displayTable();