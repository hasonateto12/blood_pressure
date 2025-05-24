# 🩺 Blood Pressure Monitoring System

A web-based application built with **Node.js** for managing and monitoring blood pressure measurements of multiple users. It includes a backend API, a web interface, and built-in analytics for identifying abnormal readings.

## 📦 Features

- 👥 Manage multiple users (via API)
- 💾 Record systolic, diastolic, and heart rate values
- 📆 View measurements between specific dates
- 📊 Highlight abnormal values (20% above average)
- 📅 Monthly summary of average values and abnormal counts per user
- 🧪 Integrated Swagger UI at `/api-docs` for testing endpoints

---

## 📁 Project Structure

-Middleware/ # Middleware logic
-Routers/ # Express routers (user, data, etc.)
-css/ # Stylesheets
-js/ # Frontend JS
-views/ # HTML pages
-.idea/ # WebStorm project settings
- blood_pressure.sql # SQL file (schema + sample data)
 -database.js # DB connection setup
-gen_params.js # Parameter generators
-index.js # Main server file
-swagger.js # Swagger setup
-package.json # Node dependencies



## 🖥️ Web Pages
-Home Page – Main interface for entering and viewing data

-User Data Page (/userData) – Filter records by user and date

-Monthly Summary Page – View each user’s monthly average and abnormal readings

-Admin Page (optional) – Insert or manage users (if implemented)


## 📊 Abnormal Measurement Detection
-An "abnormal" reading is defined as:

-More than 20% higher than the user's average value for:

-Systolic

-Diastolic

-Pulse

-These are highlighted in the user data page.


## ⚙️ Technologies Used
=Node.js + Express.js

=MySQL

=JavaScript (Frontend)

=HTML + CSS

=Swagger for API documentation


