🩺 Blood Pressure Monitoring System
This project is a Node.js-based blood pressure monitoring system designed to manage and visualize users' blood pressure data. It supports multiple users, calculates abnormal measurement averages, and provides a Swagger API for testing and documentation.

📁 Project Structure
bash
Copy
Edit
.
├── Middleware/              # Custom middleware logic
├── Routers/                 # Route definitions
├── css/                     # Stylesheets
├── js/                      # Client-side JavaScript
├── views/                   # HTML pages
├── .idea/                   # WebStorm project settings
├── blood_pressure.sql       # Database export with structure and test data
├── database.js              # DB connection setup
├── gen_params.js            # Parameter generation logic
├── index.js                 # Main server file
├── swagger.js               # Swagger configuration
├── package.json             # Node.js dependencies
🚀 Features
📋 User management (via API, no frontend interface for it)

📈 Record blood pressure measurements (systolic, diastolic, pulse)

📊 View history between selected dates

Highlights abnormal measurements (20% above user average)

📅 Monthly average statistics per user

🌐 Swagger API documentation at /api-docs

🛠️ Installation
Clone the repository:

bash
Copy
Edit
git clone <repository-url>
cd blood_pressure
Install dependencies:

bash
Copy
Edit
npm install
Setup the database:

Import the blood_pressure.sql file into your MySQL server.

Update database credentials in database.js as needed.

Start the server:

bash
Copy
Edit
node index.js
📘 API Documentation
After starting the server, visit:

bash
Copy
Edit
http://localhost:4225/api-docs
This serves the Swagger UI for testing and exploring the available API endpoints.

📌 Pages Overview
Homepage: Main interface to log or view data

User Data Page (/userData) – View a specific user's history between dates

Monthly Summary Page – Show all users’ monthly averages & abnormal counts

🧠 Notes
All abnormal readings are defined as any value exceeding 20% above the user’s average.

User list and available shifts are hardcoded.

