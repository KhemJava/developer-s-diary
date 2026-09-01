# Developer's Diary

A full-stack web application for developers to document their journey, track progress, and maintain coding records.

![Developer's Diary Logo](./screenshots/logo.png)

## 📋 Overview

Developer's Diary is a platform designed for developers to document their coding journey, track progress, and maintain technical records. With a clean, responsive UI built on Material UI, the application offers an intuitive user experience with minimal animations and a user-centered dashboard.

## ✨ Features

* **Clean & Responsive UI** built with Material UI
* **Card-Based Diary Posts** for easy visualization
* **Advanced Record Tracking** with robust search functionality
* **User-Centered Dashboard** with clean, minimal animations
* **Database-Driven Architecture** for reliable data persistence
* **RESTful API Design** for seamless front-end and back-end communication

## 🛠️ Tech Stack

### Frontend

* **React** - JavaScript library for building user interfaces
* **Material UI** - React component library implementing Google's Material Design

### Backend

* **Spring Boot** - Java-based framework for creating stand-alone, production-grade applications
* **Maven** - Software project management and comprehension tool

### Database

* **PostgreSQL** - Open-source relational database system

## 🚀 Installation & Setup

### Prerequisites

* Node.js (v14.x or above)
* Java JDK 11 or above
* Maven
* PostgreSQL

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/developers-diary.git

# Navigate to the frontend directory
cd developers-diary/frontend

# Install dependencies
npm install

# Start the development server
npm start
```

### Backend Setup

```bash
# Navigate to the backend directory
cd ../backend

# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

### Database Configuration

1. Create a PostgreSQL database named `developers_diary`
2. Update the database configuration in `application.properties`

## 📸 Screenshots

### 📊 Dashboard

![Dashboard](./screenshots/dashboard.png)

### ➕ Add Entry Page

![Add Entry](./screenshots/add-entry.png)

### 👤 Account Creation

![Account Creation](./screenshots/account-creation.png)

### 📧 SMTP Validation

![SMTP Validation](./screenshots/smtp-validation.png)

### 🔍 Search

![Search](./screenshots/search.png)

## 🔍 API Documentation

The backend exposes a RESTful API for communication with the frontend:

* `GET /api/posts` - Retrieve all diary posts
* `GET /api/posts/{id}` - Retrieve a specific diary post
* `POST /api/posts` - Create a new diary post
* `PUT /api/posts/{id}` - Update an existing diary post
* `DELETE /api/posts/{id}` - Delete a diary post
* `GET /api/posts/search?keyword={keyword}` - Search diary posts

### 🔐 Authentication API

The backend now uses Spring Security with stateless JWT authentication. All diary endpoints require a valid token except the two below.

* `POST /api/auth/register` - Create a new account

  ```json
  { "username": "khem", "email": "khem@example.com", "password": "yourpassword" }
  ```
* `POST /api/auth/login` - Log in and receive a JWT

  ```json
  { "username": "khem", "password": "yourpassword" }
  ```

  Response:

  ```json
  { "token": "eyJhbGciOi...", "type": "Bearer", "username": "khem", "email": "khem@example.com" }
  ```

For every protected request, include the token as a header:

```text
Authorization: Bearer <token>
```

## 📝 Future Improvements

* [x] Implement user authentication and authorization
* [ ] Add tagging functionality to diary posts
* [ ] Integrate with GitHub to automatically log coding activity
* [ ] Implement statistics and visualization of coding patterns
* [ ] Mobile application development

## 👨‍💻 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Created with ❤️ by KhemJava
