let date = new Date();

let currentDate = date.getDate();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

let displayDate = currentDate + "/" + (currentMonth + 1) + "/" + currentYear;

document.querySelector(".date").innerHTML = `Date : ${displayDate}`;

setInterval(() => {
  document.querySelector(
    ".time"
  ).innerHTML = `Time : ${new Date().toLocaleTimeString()}`;
}, 1000);

const toggle = document.querySelector(".toogle-sidebar");

toggle.addEventListener("click", () => {
  document.querySelector(".sidebar").classList.toggle("active");
  document.querySelector(".main").classList.toggle("active");
});

let documentDelete = document.querySelector(".download-btn");

if (documentDelete) {
  documentDelete.addEventListener("click", function () {
    let confirmation = confirm("are you sure..?");

    if (confirmation) {
      document.querySelector(".model-footer").style.display = "none";
      html2canvas(document.querySelector(".notification-model")).then(
        (canvas) => {
          // Create an image and set its source to the canvas data
          var image = canvas.toDataURL("image/png");
          // Create a temporary link to trigger the download
          var tmpLink = document.createElement("a");
          tmpLink.download = "username.png"; // Set the download name
          tmpLink.href = image;

          // Temporarily add the link to the document and trigger the download
          document.body.appendChild(tmpLink);
          tmpLink.click();
          document.body.removeChild(tmpLink);
          document.querySelector(".model-footer").style.display = "flex";
        }
      );
    }
  });
}

let printBtn = document.querySelector(".print-btn");

if (printBtn) {
  printBtn.addEventListener("click", function () {
    window.print();
  });
}

const bell_btn = document.querySelector(".notification-btn");
const notifications_div = document.querySelector(".notifications");

bell_btn.addEventListener("click", () => {
  notifications_div.classList.toggle("active");
});

document.addEventListener("click", function (event) {
  const isNotificationButton = event.target.closest(".notification-btn");
  const isNotificationContainer = event.target.closest(".notifications");

  if (!(isNotificationButton || isNotificationContainer)) {
    notifications_div.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  let all_downloads = document.querySelectorAll(".download");

  all_downloads.forEach((download) => {
    download.addEventListener("click", () => {
      loadPage();
      let parent = download.parentElement.parentElement.parentElement;
      let table = parent.querySelector("table");

      // Convert the table to a worksheet
      let ws = XLSX.utils.table_to_sheet(table);

      // Create a workbook with a single worksheet
      let wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      // Convert the workbook to an array buffer
      var wbArrayBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });

      // Create a Blob from the array buffer
      var blob = new Blob([wbArrayBuffer], {
        type: "application/octet-stream",
      });

      // Trigger download using FileSaver.js
      let fileName = parent.querySelector(".frame-details").textContent.trim();
      saveAs(blob, `${fileName}.xlsx`);
      document.querySelector(".reload").classList.remove("active");
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var dropArea = document.getElementById("drop-area");
  var fileInput = document.getElementById("file");
  var actions = document.getElementById("file-actions");
  var cancelBtn = document.getElementById("cancel-btn");
  var fileNameDisplay = document.createElement("p");
  fileNameDisplay.id = "file-name-display";
  dropArea.appendChild(fileNameDisplay); // Add the file name display to the drop area

  // Function to update UI with file name
  function updateFileNameDisplay(file) {
    fileNameDisplay.innerHTML = file
      ? `Selected file: <strong>${file.name}</strong>`
      : "";
  }

  // Open file selector when clicked on the drop area
  dropArea.addEventListener("click", function () {
    fileInput.click();
  });

  fileInput.addEventListener("change", function () {
    handleFileSelection(this.files);
  });

  dropArea.addEventListener("dragover", function (e) {
    e.preventDefault();
    dropArea.classList.add("drag-over");
  });

  dropArea.addEventListener("dragleave", function (e) {
    e.preventDefault();
    dropArea.classList.remove("drag-over");
  });

  dropArea.addEventListener("drop", function (e) {
    e.preventDefault(); // Prevent the default action (open as link)
    dropArea.classList.remove("drag-over");
    handleFileSelection(e.dataTransfer.files);
  });

  cancelBtn.addEventListener("click", function () {
    clearFileInput();
  });

  function handleFileSelection(files) {
    if (files && files.length > 0) {
      var allowedFileTypes = ["xlsx", "xls", "csv"];
      var file = files[0];
      var fileExtension = file.name.split(".").pop().toLowerCase();

      if (allowedFileTypes.indexOf(fileExtension) === -1) {
        alert("Invalid file type. Please select a valid file.");
        clearFileInput();
        return;
      }

      // Manually set the files for the file input
      fileInput.files = files;

      updateFileNameDisplay(file);
      actions.style.display = "block";
    }
  }

  function clearFileInput() {
    fileInput.value = ""; // Clear the file input
    updateFileNameDisplay(null);
    actions.style.display = "none";
  }
});

let all_radios = document.querySelectorAll('input[type="radio"]');

all_radios.forEach((radio) => {
  radio.addEventListener("click", () => {
    all_radios.forEach((rad) => {
      rad.parentElement.classList.remove("active");
    });
    if (radio.checked == true) {
      radio.parentElement.classList.add("active");
    }
  });
});

const upload_model = document.querySelector(".upload-model");
const uploadClose = document.querySelectorAll(".close-btn");

uploadClose.forEach((element) => {
  element.addEventListener("click", () => {
    element.parentElement.parentElement.style.display = "none";
  });
});

const upload_button = document.querySelector(".upload-option");

upload_button.addEventListener("click", () => {
  upload_model.style.display = "flex";
});

const emp_disp_button = document.querySelector(".emp-disp-option");
const emp_disp_model = document.querySelector(".employee-container");
emp_disp_button.addEventListener("click", () => {
  emp_disp_model.style.display = "flex";
});

const delete_model = document.querySelector(".delete-model");
const delete_option = document.querySelector(".delete-option");

delete_option.addEventListener("click", () => {
  document.querySelector(".delete-model").style.display = "flex";
});

const edit_model = document.querySelector(".edit-model");
const edit_option = document.querySelector(".edit-option");

edit_option.addEventListener("click", () => {
  document.querySelector(".edit-model").style.display = "flex";
});

//to close section if clicked out of it
document.addEventListener("click", function (event) {
  const is_Side_Section = event.target.closest(".side-sections");
  const main_section = event.target.closest(".main-section");

  if (is_Side_Section && !main_section) {
    const openSections = document.querySelectorAll(
      '.side-sections[style="display: flex;"]'
    );

    openSections.forEach((section) => {
      section.style.display = "none";
      console.log("closed open section");
    });
  }
});

let empArray = [];

function showSingleEmp() {
  document.querySelector(".single-form").style.display = "flex";
  document.querySelector(".table-container").style.display = "none";
  // parseData.type = "single employee";

  all_checkbox.forEach((checkbox) => {
    checkbox.checked = false;
  });
  empArray = [];
  handleInfoHeader();
}

function showMultiEmp() {
  document.getElementById("empid").value = "";
  document.querySelector(".single-form").style.display = "none";
  document.querySelector(".table-container").style.display = "block";
  // parseData.type = "multiple employee";
}

function handleInfoHeader() {
  let selectedCount = empArray.length;
  document.querySelector(".counter .tag").innerHTML = selectedCount;
}

function handleCheckbox(checkbox) {
  checkbox.click();
  empArray = [];
  all_checkbox.forEach((checkbox) => {
    if (checkbox.checked == true) {
      let value = checkbox.value;
      empArray.push(value);
    }
  });
  handleInfoHeader();
}

const deleteRows = document.querySelectorAll(
  ".delete-table .delete-table-body tr"
);
const all_checkbox = document.querySelectorAll(
  ".delete-table .delete-table-body tr input[type='checkbox']"
);
deleteRows.forEach((row) => {
  row.addEventListener("click", () => {
    let checkbox = row.querySelector("input[type='checkbox']");
    handleCheckbox(checkbox);
  });
});

all_checkbox.forEach((checkbox) => {
  checkbox.addEventListener("click", function () {
    handleCheckbox(checkbox);
  });
});

let selectCancel = document.querySelector(".delete-btns.cancel");

selectCancel.addEventListener("click", () => {
  all_checkbox.forEach((checkbox) => {
    checkbox.checked = false;
  });
  empArray = [];
  handleInfoHeader();
});

let inputDelete = document.querySelector(".delete-btns.submit");
let selectDelete = document.querySelector(".delete-btns.confirm");

inputDelete.addEventListener("click", () => {
  let input = document.getElementById("empid");
  if (input.value > 0) {
    empArray.push(input.value);
  } else {
    alert("empty input to delete user");
  }
});

selectDelete.addEventListener("click", () => {
  if (empArray.length <= 0) {
    alert("Select Atleast one Employee to delete..");
  }
});

function bringUserEdit() {
  fetch("/user_edit_data", {
    method: "POST",
    body: "hello",
  })
    .then((response) => response.json()) // Adjust if the response is JSON
    .then((data) => {
      console.log(data.data);
      // const dataArray = Array.isArray(data) ? data : [data];
      var edit_requests = document.querySelector(".edit-requests-body");
      edit_requests.innerHTML = "";
      data.data.forEach((user) => {
        edit_requests.innerHTML += `<tr>
          <td>${user.id}</td>
          <td>${user.emp_id}</td>
          <td>${user.name}</td>
          <td>${user.data_type}</td>
          <td>${user.old_data}</td>
          <td>${user.new_data}</td>
          <td>
            <div class="action-btns">
              <input
                type="hidden"
                name="empid"
                id="empid"
                value="${user.emp_id}"
              />
              <button class="request-btns confirm-request" data-action="accept" data-id="${user.id}">
                <i class="fas fa-check"></i>Confirm
              </button>
              <button class="request-btns cancel-request" data-action="decline" data-id="${user.id}">
                <i class="fas fa-times"></i>Cancel
              </button>
            </div>
          </td>
        </tr>`;
      });
    })
    .catch((error) => console.error("Error:", error));
}

edit_option.addEventListener("click", bringUserEdit);

document.body.addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("request-btns")) {
    const action = target.dataset.action;
    const id = target.dataset.id;

    if (action === "accept") {
      AcceptEdit(id);
    } else if (action === "decline") {
      DeclineEdit(id);
    }
  }
});

function AcceptEdit(id) {
  const data = {
    id: id
  };
  fetch("/accept_edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json()) // Adjust if the response is JSON
    .then((data) => {
      bringUserEdit();
    });
}

function DeclineEdit(id, emp_id, name, data_type, old_data, new_data) {
  const data = {
    id: id
  };
  fetch("/decline_edit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json()) // Adjust if the response is JSON
    .then((data) => {
      bringUserEdit();
    });
}
const fetchBtn = document.querySelector(".fetch");
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".fetch").addEventListener("click", function (e) {
    let form = document.getElementById("fetch-form");
    fetch("/fetch_emp_details", {
      method: "POST",
      body: new FormData(form),
    })
      .then((response) => response.json()) // Adjust if the response is JSON
      .then((data) => {
        console.log(data);
        // Make sure 'editInput' exists in your HTML
        let editInput = document.getElementById("editInput");
        if (editInput) {
          editInput.value = data.value;
        } else {
          console.error("Element with ID 'editInput' not found.");
        }
      })
      .catch((error) => console.error("Error:", error));
  });
});

//reload part
const load_btn = document.querySelector(".reload-option");

function loadPage() {
  let loadDiv = document.querySelector(".reload");
  loadDiv.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  loadPage();
});

load_btn.addEventListener("click", () => {
  loadPage();
  setTimeout(() => {
    document.querySelector(".reload").classList.remove("active");
  }, 2000);
});

let loadDiv = document.querySelector(".reload");

window.addEventListener("load", () => {
  loadDiv.classList.remove("active");
});

window.addEventListener("beforeunload", () => {
  loadDiv.classList.remove("active");
});
// reload part end

function open_req_profile(id, permission_type) {
  var popupContainer = document.querySelector(".myPopup");
  var approve_btn = document.querySelector(".approve-btn");
  var decline_btn = document.querySelector(".decline-btn");
  popupContainer.style.display = "flex";

  fetch("/bring_req_profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id, permission_type: permission_type }),
  })
    .then((response) => response.json())
    .then((det) => {
      let info = det.data;
      let status = info.status;
      console.log("received");
      document.querySelectorAll(".emp_id").forEach((data) => {
        data.innerText = info.emp_id;
      });
      document.querySelectorAll(".emp_name").forEach((data) => {
        data.innerText = info.emp_name;
      });
      document.querySelectorAll(".from_time").forEach((data) => {
        data.innerText = info.from_time;
      });
      document.querySelectorAll(".to_time").forEach((data) => {
        data.innerText = info.to_time;
      });
      document.querySelectorAll(".reason").forEach((data) => {
        data.innerText = info.reason;
      });
      document.getElementsByName("request_id").value = info.emp_id;
      document.querySelector(".leave_bal").innerText = info.leave_balance;
      document.querySelector(".ph_number").innerText = info.ph_number;
      document.querySelector(".shift").innerText = info.shift;
      document.querySelector(".address").innerText = info.address;
      document.querySelector(".req_time").innerText = info.req_time;
      document.querySelector(".req_date").innerText = info.req_date;
      document.querySelector(".late_bal").innerText = info.late_balance;
      console.log(status);
      approve_btn.onclick = function () {
        handleApproval(permission_type, "approve", info.id);
      };
      decline_btn.onclick = function () {
        handleApproval(permission_type, "decline", info.id);
      };
      console.log("Status check ", status);
      if (status == "Approved") {
        approve_btn.innerHTML = `<i class="fas fa-check-circle"></i>
                                <span class="btn-text">Approved</span>`;
        // approve_btn.style.transform = 'scale(1.1)';
        approve_btn.classList.add("approved");
        // approve_btn.classList.remove('approve');
        approve_btn.disabled = true;
      } else {
        approve_btn.innerHTML = `<i class="fas fa-check-circle"></i>
                                    <span class="btn-text">Approve</span>`;
        // approve_btn.classList.add('approve');
        approve_btn.classList.remove("approved");
        approve_btn.disabled = false;
      }
      if (status == "Declined") {
        decline_btn.innerHTML = `<i class="fas fa-times-circle"></i>
                                    <span class="btn-text">Declined</span>`;
        decline_btn.classList.add("declined");
        // decline_btn.style.transform = 'scale(1.1)';
        // decline_btn.classList.remove('decline');
        decline_btn.disabled = true;
      } else {
        decline_btn.innerHTML = `<i class="fas fa-times-circle"></i>
                                      <span class="btn-text">Decline</span>`;
        // decline_btn.classList.add('decline');
        decline_btn.classList.remove("declined");
        decline_btn.disabled = false;
      }
    });
}

function handleApproval(permissionType, action, id) {
  loadDiv.classList.add("active");

  fetch(`/${permissionType.toLowerCase()}_${action.toLowerCase()}`, {
    method: "POST",
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .then((data) => {
      loadDiv.classList.remove("active");

      console.log("Response from server:", data);
      const status = data.hr_approval;
      let approved_by = data.approved_by;
      const elementId = action.toLowerCase();
      document.getElementById(elementId).disabled = true;
      document.getElementById(
        elementId === "approve" ? "decline" : "approve"
      ).disabled = false;
      document.getElementById(elementId).innerHTML = `<i class="fas fa-${
        status === "Approved" ? "check-circle" : "times-circle"
      }"></i><span class="btn-text">${status}</span>`;
      document.getElementById(
        elementId === "approve" ? "decline" : "approve"
      ).innerHTML = `<i class="fas fa-${
        status === "Declined" ? "check-circle" : "times-circle"
      }"></i><span class="btn-text">${
        status === "Approved" ? "Decline" : "Approve"
      }</span>`;
      var approve_btn = document.querySelector(".approve-btn");
      var decline_btn = document.querySelector(".decline-btn");
      // Inside handleApproval function
      // if (elementId === 'approve') {
      //   approve_btn.classList.add('approved');
      //   decline_btn.classList.remove('declined');
      // } else if (elementId === 'decline') {
      //   approve_btn.classList.remove('approved');
      //   decline_btn.classList.add('declined');
      // }
      // The else block is not needed in this case, as the action can only be 'approve' or 'decline'

      // if (approve_btn.classList.contains('approved') || decline_btn.classList.contains('declined')) {
      //   approve_btn.classList.toggle('approved');
      //   decline_btn.classList.toggle('declined');
      // }
      console.log(`testing in script 596`);
      if (elementId === "approve") {
        approve_btn.classList.add("approved");
        decline_btn.classList.remove("declined");
      } else if (elementId == "decline") {
        approve_btn.classList.remove("approved");
        decline_btn.classList.add("declined");
      } else {
        console.log("error here");
      }

      let table = document.getElementById(permissionType + "-table");
      table_tr = table.querySelector("." + permissionType + "-" + id);
      console.log("." + permissionType + "-" + id);
      let row_status = table_tr.querySelector(".status");
      console.log("619");
      let row_approved_by = table_tr.querySelector(".approved_by");
      console.log("621");

      if (action == "approve") {
        row_approved_by.textContent = approved_by;
        row_status.textContent = "Approved";
        table_tr.classList.add("Approved");
        table_tr.classList.remove("Declined");
      } else {
        row_approved_by.textContent = approved_by;
        row_status.textContent = "Declined";
        table_tr.classList.add("Declined");
        table_tr.classList.remove("Approved");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// socket.on('${permission_type}_hr_approval_update', function(data) {
//     console.log(`${permission_type} details socket`);
//     const userId = data.userId;
//     const hrApproval = data.hr_approval;
//     //document.getElementById(hrApproval.toLowerCase()).textContent = hrApproval;
//     if (hrApproval=='Approved'){
//         document.getElementById('approve').textContent = hrApproval;
//     }
//     else if (hrApproval=='Declined'){
//         document.getElementById('decline').textContent = hrApproval;
//     }
// });

let model_close = document.querySelector(".model-close");
model_close.addEventListener("click", () => {
  var popupContainer = document.querySelector(".myPopup");
  // console.log(popupContainer);
  popupContainer.style.display = "none";
});

document
  .querySelector(".uploaded-file")
  .addEventListener("keydown", function (event) {
    // Check if the pressed key is Enter (keyCode 13)
    if (event.keyCode === 13) {
      // Trigger the button click event
      document.getElementById("upload-btn").click();
    }
  });

//flash message js

// function removeFlashMessage(id) {
//   console.log(id);
//   var element = document.getElementById(id);
//   if (element) {
//       element.remove();
//   }
// }
document.querySelector('.file-upload').addEventListener('click', function (event) {
  let form = document.querySelector('.upload_form')
  let checkboxes = form.querySelectorAll('input[type="radio"]');
  let isChecked = false;
  console.log('cjnxfdvkjjv \n\n\n');

  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      isChecked = true;
    }
  });

  if (!isChecked) {
    alert('Please select a file type before submitting.');
    event.preventDefault(); // Prevent form submission
  }
});

let unfreezeButtons = document.querySelectorAll('.unfreeze-btn');
if (unfreezeButtons) {
  unfreezeButtons.forEach((btn) => {
    let emp_id = btn.getAttribute('emp-id'); // Use data attribute instead of name
    console.log(emp_id);
    btn.addEventListener('click',()=> {
      fetch("/unfreeze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emp_id: emp_id }), // Pass emp_id as an object
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data === "Unfreezed") {
            btn.innerHTML = `<div class="tag">Active</div>`; // Update status cell
            btn.parentElement.classList.remove('freezed');
          } else {
            alert('Employee Not Found or Already Unfreezed'); // Alert if error occurred
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    })
  })
}