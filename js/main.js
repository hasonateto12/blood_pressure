// Add Measurement
document.getElementById('addMeasurementForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const user_id = document.getElementById('user_id').value;
    const high_value = document.getElementById('high_value').value;
    const low_value = document.getElementById('low_value').value;
    const heart_rate = document.getElementById('heart_rate').value;
    const date = document.getElementById('date').value;

    const response = await fetch('/M/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, high_value, low_value, heart_rate, date }),
    });

    const result = await response.json();
    alert(result.msg);
    loadMeasurements();
});

// Update Measurement
document.getElementById('updateMeasurementForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const idx = document.getElementById('idx').value;
    const high_value = document.getElementById('update_high_value').value;
    const low_value = document.getElementById('update_low_value').value;
    const heart_rate = document.getElementById('update_heart_rate').value;
    const date = document.getElementById('update_date').value;

    const response = await fetch('/M/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idx, high_value, low_value, heart_rate, date }),
    });

    const result = await response.json();
    alert(result.msg);
    loadMeasurements();
});


// Load All Measurements
async function loadMeasurements() {
    const response = await fetch('/M/');
    const result = await response.json();
    const tableBody = document.getElementById('measurementsTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    result.data.forEach(row => {
        const newRow = tableBody.insertRow();
        newRow.insertCell(0).innerText = row.id;
        newRow.insertCell(1).innerText = row.user_id;
        newRow.insertCell(2).innerText = row.high_value;
        newRow.insertCell(3).innerText = row.low_value;
        newRow.insertCell(4).innerText = row.heart_rate;
        newRow.insertCell(5).innerText = row.date;
    });
}

loadMeasurements();