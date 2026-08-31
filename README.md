# Nutrition Plan Manager

## Application Overview

The **Nutrition Plan Manager** is a web application designed to support communication between Clients and Nutritionists.

Clients can submit nutrition requests containing their nutrition goals, dietary preferences, and allergy information. Nutritionists can review these requests, create and edit nutrition plans, and publish completed plans. Once a plan is published, the associated request status becomes **Plan Available** and the Client can view their published nutrition plan.

The application supports role-based access control so that Clients and Nutritionists can only access functionality relevant to their role.

---

## Main Features

### Client

* Register and login
* Logout
* Submit a nutrition request
* View submitted nutrition requests
* Track request status:
  * Pending
  * In Review
  * Plan Available
* View published nutrition plans
* View Nutritionist notes
* View an empty state when no plan is available

### Nutritionist

* Login and logout
* View submitted Client nutrition requests
* View Client request details
* Update request status
* Create nutrition plans
* Edit existing nutrition plans
* Publish completed nutrition plans

### Access Control

* Client and Nutritionist roles are protected using role-based access control
* Clients cannot access Nutritionist management pages
* Clients can only access their own nutrition requests and published nutrition plans

---

## Core Workflow

1. A Client logs in and submits a nutrition request.
2. The request is stored with the status **Pending**.
3. A Nutritionist reviews the Client request.
4. The request can be updated to **In Review**.
5. The Nutritionist creates and edits a nutrition plan.
6. The completed nutrition plan is published.
7. The associated request status becomes **Plan Available**.
8. The Client can view their published nutrition plan.

---

## Technologies Used

* **Frontend:** React
* **Backend:** Node.js and Express
* **Database:** MongoDB Atlas
* **Authentication:** JSON Web Token (JWT)
* **Version Control:** Git and GitHub
* **Project Management:** Jira
* **UI/UX Design:** Figma
* **System Design:** Draw.io / SysML
* **Deployment:** AWS EC2

---

## Prerequisites

Please install the following software and create the required accounts:

* **Node.js** [Download Node.js](https://nodejs.org/)
* **Git** [Download Git](https://git-scm.com/)
* **VS Code** [Download VS Code](https://code.visualstudio.com/)
* **MongoDB Account** [Create MongoDB Account](https://account.mongodb.com/account/login)
* **GitHub Account** [Create GitHub Account](https://github.com/signup)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/aliceee1221/Nutrition-Plan-Manager.git
cd Nutrition-Plan-Manager
```

Install and start the backend:

```bash
cd backend
npm install
node server.js
```

In a second terminal, install and start the frontend:

```bash
cd Nutrition-Plan-Manager/frontend
npm install
npm start
```

The frontend application will be available at:

http://localhost:3000

---

## Environment Configuration

Create a `.env` file inside the `backend` folder.

Add the following environment variables:

```env
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
JWT_SECRET=YOUR_JWT_SECRET
PORT=5001
```

The `.env` file contains sensitive information and must not be committed to GitHub.

---