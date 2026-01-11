# 🚀 Node.js & MySQL Dockerized App

A simple CRUD application built with Node.js and MySQL, fully containerized using Docker. This project demonstrates how to handle database connection retries and host-gateway networking.

## 🛠️ Tech Stack

* **Backend:** Node.js (Express)
* **Database:** MySQL 8.0
* **Containerization:** Docker

## 🚦 Getting Started

### 1. Prerequisites

* Docker installed on your machine.
* Git installed.

### 2. Run the Database

To avoid permission issues on Linux, run the MySQL container without local volumes for a quick start:

```bash
docker run -d --name my-mysql-server \
  -e MYSQL_ROOT_PASSWORD=12345 \
  -e MYSQL_DATABASE=test_db \
  -p 3306:3306 \
  mysql:8.0

```

### 3. Build and Run the App

Once the database is ready, build your image and link it to the host gateway:

```bash
# Build the image
docker build -t node-app .

# Run the container
docker run --name my-node-app \
  -p 3000:3000 \
  --add-host=host.docker.internal:host-gateway \
  node-app

```

## 🌐 API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| **GET** | `/` | Serves the frontend (public folder) |
| **GET** | `/users` | Returns all users from the DB |
| **POST** | `/users` | Adds a new user |
| **GET** | `/delete/:id` | Deletes a user by ID |

## 🐳 Docker Hub

You can find the ready-to-use image here:
`docker pull mumer423/my-node-app:v1`
* **Troubleshooting included:** It mentions the `host-gateway` trick which was the key to fixing your network errors.

**Would you like me to show you how to add this file to your GitHub repository using the terminal?**

# My Project
This is a test project.

AWS_KEY="AKIAIO5FODNN7EXAMPLE"
