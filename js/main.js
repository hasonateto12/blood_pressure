var URL = "http://localhost:2135";
var users = [];

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
        tableBody.innerHTML += `
                    <tr>
                        <td>${row.high_value}</td>
                        <td>${row.low_value}</td>
                        <td>${row.heart_rate}</td>
                        <td>${smart_due}</td>
                    </tr>
                `;
    }
}

function loadUserMeasurements() {
    let select = document.getElementById("userSelectHistory");
    let userId = select.value;
    let messageDiv = document.getElementById("userMessage");
    let inputTable = document.getElementById("inputTable");
    let selectedUser = select.options[select.selectedIndex].text;

    if (userId) {
        messageDiv.innerHTML = ` <strong>${selectedUser}</strong>`;
        messageDiv.style.display = "block";
        inputTable.style.display = "block";
        GetMeasurements(userId);
    } else {
        messageDiv.innerHTML = "נא לבחר שם";
        messageDiv.style.display = "block";
        inputTable.style.display = "none";  // إخفاء النموذج إذا لم يتم اختيار مستخدم
    }
}

async function sendMeasurement() {
    let userId = document.getElementById("userSelectHistory").value;
    let highValue = document.getElementById("highValue").value;
    let lowValue = document.getElementById("lowValue").value;
    let heartRate = document.getElementById("heartRate").value;
    let measurementDate = document.getElementById("measurementDate").value;

    if (!userId) {
        alert("נא לבחר שם!");
        return;
    }

    if (!highValue || !lowValue || !heartRate || !measurementDate) {
        alert("בבקשה למלא כל הנתונים לפני השליחה!");
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

        // بعد إرسال البيانات بنجاح، استدعاء GetMeasurements لعرض البيانات الجديدة
        GetMeasurements(userId);

        // إظهار الجدول بعد إدخال البيانات
        let table = document.getElementById("dataTable");
        table.style.display = "table";

    } catch (error) {
        console.error("ERROR", error);
        alert("error in adding data");
    }
}

async function BuildPage() {
    await GetUsers();
    toggleTable();  // تحديث الواجهة لتكون متوافقة مع حالة المستخدم المختار
}

function toggleTable() {
    let userId = document.getElementById("userSelectHistory").value;
    let table = document.getElementById("dataTable");
    let inputTable = document.getElementById("inputTable");

    if (userId) {
        table.style.display = "none";  // إخفاء الجدول
        inputTable.style.display = "block";  // إظهار النموذج لإرسال البيانات
    } else {
        table.style.display = "none";  // إخفاء الجدول
        inputTable.style.display = "none";  // إخفاء النموذج
    }
}

toggleTable();
BuildPage();
