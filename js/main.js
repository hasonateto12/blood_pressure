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