console.log("chart.js");

var myData,
  total_employee,
  total_absent,
  total_present,
  kkl_employee,
  dr_employee,
  ft_employee,
  yesterday_total_present,
  yesterday_total_absent;
fetch("/get_chart")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    myData = data;
    processData(myData);
  })
  .catch((error) => console.error("Error fetching data:", error));

function processData(data) {
  total_present = data.total_present;
  kkl_employee = data.kkl_employee;
  dr_employee = data.dr_employee;
  ft_employee = data.ft_employee;

  console.log(data);

  let totalData = [
    // { label: "Total Present", value: total_present },
    { label: "KKL Present", value: kkl_employee },
    { label: "DR Present", value: dr_employee },
    { label: "FT Present", value: ft_employee },
  ];

  // let present = [
  //   { label: "KKL Present", value: kkl_employee },
  //   { label: "DR Present", value: dr_employee },
  //   { label: "FT Present", value: ft_employee },
  // ];

  // let absent = [
  //   { label: "KKL Absent", value: ft_employee },
  //   { label: "DR Absent", value: kkl_employee },
  //   { label: "FT Absent", value: dr_employee },
  // ];
  // let yesterdayData = [
  //   { label: "Total Present", value: yesterday_total_present },
  //   { label: "Total Absent", value: yesterday_total_absent },
  // ];

  let ctx = document.getElementById("myPieChart").getContext("2d");
  let myPieChart; // Declare myPieChart in the global scope

  function employeeDisplay(title, employee) {
    let all_data = document.querySelector(".details");
    all_data.innerHTML = "";
    all_data.innerHTML = `
    <li class="detail title">
        <span class="detail_title"><span class="tota">${title}</span></span>
    </li>
    <li class="detail">
        <span><span class="tota">Total Employees ${total_present}</span></span>
    </li>
    `;
    employee.forEach((data) => {
      let li = document.createElement("li");
      li.className = "detail";
      li.innerHTML = ` <span class="detail_title">${data.label} : <span class="tota">${data.value}</span></span>`;
      all_data.appendChild(li);
    });

    // Destroy existing chart if it exists
    if (myPieChart) {
      myPieChart.destroy();
    }

    myPieChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: employee.map((emp) => emp.label),
        datasets: [
          {
            label: "Employee Distribution",
            data: employee.map((emp) => emp.value),
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  employeeDisplay("today employee", totalData);

  // Function to handle changes in the select element
  // document
  //   .getElementById("selectOption")
  //   .addEventListener("change", function () {
  //     let selectedOption = this.value;
  //     if (selectedOption === "today employee") {
  //       employeeDisplay(this.value, totalData);
  //     } else if (selectedOption === "today attendance") {
  //       employeeDisplay(this.value, present);
  //     } else if (selectedOption === "yesterday employee") {
  //       employeeDisplay(this.value, yesterdayData); // Change this to yesterday's employee data if available
  //     }
  //     // else if (selectedOption === "yesterday attendance") {
  //     //     employeeDisplay(this.value, absent); // Change this to yesterday's attendance data if available
  //     // }
  //   });

  document
    .querySelector(".downloadImage")
    .addEventListener("click", function () {
      // Select the chart container element
      const chartContainer = document.querySelector(".chart_container");
      let fileName = document
        .querySelector(".chart_container .details .title")
        .textContent.trim();
      // Use html2canvas to capture the content of the chart container
      html2canvas(chartContainer).then((canvas) => {
        // Convert the canvas to a data URL
        const dataURL = canvas.toDataURL();

        // Create a temporary link element
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = `${fileName}.png`; // Set the download filename

        // Append the link to the document and trigger a click event to download the image
        document.body.appendChild(link);
        link.click();

        // Remove the temporary link from the document
        document.body.removeChild(link);
      });
    });
}
