var URL = "http://localhost:2135";
var users = [];
var selectedMeasurementId = null; // מזהה המדידה שנבחרה לעריכה

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

        let filteredData = reply.data.filter(measurement => measurement.user_id == userId);

        CreateTableBody(filteredData);
    } catch (error) {
        console.error("Error fetching measurements:", error);
    }
}

function CreateTableBody(measurements) {
    let tableBody = document.getElementById("mainTableData");
    tableBody.innerHTML = "";

    for (let row of measurements) {
        let smart_due = row.date !== "00-00-0000" ? row.date : "";
        let rowClass = row.highlight ? "highlighted" : "";

        tableBody.innerHTML += `
            <tr class="${rowClass}" id="row-${row.id}">
                <td>${row.high_value}</td>
                <td>${row.low_value}</td>
                <td>${row.heart_rate}</td>
                <td>${smart_due}</td>
                <td>
                    <button onclick="editMeasurement(${row.id}, ${row.high_value}, ${row.low_value}, ${row.heart_rate}, '${smart_due}')">ערוך</button>
                    <button onclick="deleteMeasurement(${row.id})" style="background-color: #27ae60;">🗑 מחק</button>
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


    if (!highValue || !lowValue || !heartRate || !measurementDate) {
        alert("נא למלא את כל השדות!");
        return;
    }

    let data = {
        high_value: highValue,
        low_value: lowValue,
        heart_rate: heartRate,
        date: measurementDate
    };

    console.log("Sending data to server:", data); // הדפסה של הנתונים המשלוחים לשרת

    try {
        let response = await fetch(`${URL}/M/${selectedMeasurementId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idx: selectedMeasurementId, // Ensure the backend receives "idx"
                high_value: highValue,
                low_value: lowValue,
                heart_rate: heartRate,
                date: measurementDate
            })
        });

        let result = await response.json();
        if (response.ok) {
            console.log("מדידה עודכנה בהצלחה", result);
            GetMeasurements(userId);
            document.getElementById("updateButton").style.display = "none";
            selectedMeasurementId = null;
        } else {
            console.error("שגיאה בעדכון המדידה", result);
            alert("שגיאה בעדכון הנתונים: " + result.errorMessage);
        }
    } catch (error) {
        console.error("ERROR", error);
        alert("שגיאה בעדכון הנתונים");
    }
}


// שליחת מדידה חדשה לשרת
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

async function deleteMeasurement(id) {


    try {
        let response = await fetch(`${URL}/M/${id}`, { method: "DELETE" });

        if (response.ok) {
            console.log("מדידה נמחקה בהצלחה");
            document.getElementById(`row-${id}`).remove(); // הסרת השורה מהטבלה מיידית
        } else {
            let result = await response.json();
            console.error("שגיאה במחיקת המדידה", result);
            alert("שגיאה במחיקת המדידה: " + result.message);
        }
    } catch (error) {
        console.error("ERROR", error);
        alert("שגיאה במחיקת הנתונים");
    }
}


function showInputSection() {
    let userId = document.getElementById("userSelectHistory").value;
    let inputTable = document.getElementById("inputTable");

    if (userId) {
        inputTable.style.display = "block";
    } else {
        inputTable.style.display = "none";
    }
}


function toggleTable() {
    let userId = document.getElementById("userSelectHistory").value;
    let table = document.getElementById("dataTable");

    if (userId) {
        table.style.display = "table";
        GetMeasurements(userId);
    } else {
        alert("נא לבחור משתמש");
        table.style.display = "none";
    }
}

async function BuildPage() {
    await GetUsers();
}

BuildPage();
