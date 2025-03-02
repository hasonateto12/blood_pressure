var URL = "http://localhost:2135";
var users = [];
var selectedMeasurementId = null; // משתנה לשמירת המדידה שנבחרה לעריכה

async function GetUsers() {
    try {
        let url = `${URL}/U/`;
        let response = await fetch(url);
        let reply = await response.json();
        users = reply.data;
        loadUsers();
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

function loadUsers() {
    let select = document.getElementById("userSelectHistory");
    select.innerHTML = '<option value="">בחירת משתמש</option>';
    for (let user of users) {
        select.innerHTML += `<option value="${user.id}">${user.name}</option>`;
    }
}

async function GetMeasurements(userId) {
    try {
        let url = `${URL}/M/?user_id=${userId}`;
        let response = await fetch(url);
        let reply = await response.json();

        console.log("Server Response:", reply); // 🔹 הדפסת הנתונים

        let filteredData = reply.data.filter(measurement => measurement.user_id == userId);
        CreateTableBody(filteredData);
    } catch (error) {
        console.error("Error fetching measurements:", error);
    }
}

function CreateTableBody(measurements) {
    let tableBody = document.getElementById("mainTableData");
    tableBody.innerHTML = "";

    console.log("Measurements to display:", measurements); // 🔹 הדפסת הנתונים

    if (measurements.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='5'>אין נתונים</td></tr>";
        return;
    }

    for (let row of measurements) {
        let smart_due = row.date !== "00-00-0000" ? row.date : "";
        let rowClass = row.highlight ? "highlighted" : "";

        tableBody.innerHTML += `
            <tr class="${rowClass}">
                <td>${row.high_value}</td>
                <td>${row.low_value}</td>
                <td>${row.heart_rate}</td>
                <td>${smart_due}</td>
                <td>
                    <button onclick="editMeasurement(${row.id}, ${row.high_value}, ${row.low_value}, ${row.heart_rate}, '${smart_due}')">✏️ ערוך</button>
                </td>
            </tr>
        `;
    }
}

function editMeasurement(id, high, low, heartRate, date) {
    document.getElementById("highValue").value = high;
    document.getElementById("lowValue").value = low;
    document.getElementById("heartRate").value = heartRate;
    document.getElementById("measurementDate").value = date;
    selectedMeasurementId = id;
    document.getElementById("updateButton").style.display = "block";
}

async function updateMeasurement() {
    if (!selectedMeasurementId) {
        alert("נא לבחור מדידה לעריכה!");
        return;
    }

    let userId = document.getElementById("userSelectHistory").value;
    let highValue = document.getElementById("highValue").value;
    let lowValue = document.getElementById("lowValue").value;
    let heartRate = document.getElementById("heartRate").value;
    let measurementDate = document.getElementById("measurementDate").value;

    let data = {
        high_value: highValue,
        low_value: lowValue,
        heart_rate: heartRate,
        date: measurementDate
    };

    console.log("🔹 Sending data:", JSON.stringify(data));

    try {
        let response = await fetch(`${URL}/M/${selectedMeasurementId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        let result = await response.json();
        console.log("✅ Server Response:", result);

        if (response.ok) {
            GetMeasurements(userId);
            document.getElementById("updateButton").style.display = "none";
            selectedMeasurementId = null;
        } else {
            console.error("❌ Update failed:", result);
            alert("שגיאה בעדכון הנתונים: " + (result.message || "בעיה לא ידועה"));
        }

    } catch (error) {
        console.error("❌ ERROR", error);
        alert("שגיאה בעדכון הנתונים");
    }
}


async function sendMeasurement() {
    let userId = document.getElementById("userSelectHistory").value;
    let highValue = document.getElementById("highValue").value;
    let lowValue = document.getElementById("lowValue").value;
    let heartRate = document.getElementById("heartRate").value;
    let measurementDate = document.getElementById("measurementDate").value;

    if (!userId) {
        alert("נא לבחור משתמש!");
        return;
    }

    if (!highValue || !lowValue || !heartRate || !measurementDate) {
        alert("בבקשה למלא את כל הנתונים לפני השליחה!");
        return;
    }

    let data = {
        user_id: userId,
        high_value: highValue,
        low_value: lowValue,
        heart_rate: heartRate,
        date: measurementDate
    };

    try {
        let response = await fetch(`${URL}/M/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        let result = await response.json();
        console.log("OK", result);

        GetMeasurements(userId);
    } catch (error) {
        console.error("ERROR", error);
        alert("שגיאה בהוספת הנתונים");
    }
}

function showInputSection() {
    let userId = document.getElementById("userSelectHistory").value;

    if (userId) {
        document.getElementById("dataTable").style.display = "block";
        document.getElementById("inputTable").style.display = "block";
        GetMeasurements(userId); // 🔹 טוען מדידות אוטומטית
    } else {
        document.getElementById("dataTable").style.display = "none";
        document.getElementById("inputTable").style.display = "none";
    }
}

async function BuildPage() {
    await GetUsers();
}

BuildPage();
