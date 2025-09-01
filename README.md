<img width="1000" height="211" alt="Workly" src="..//workly/frontend/docs/WORKLYreadm.png" />
<img src="https://img.shields.io/badge/STATUS-EN%20DESAROLLO-green">

# INTEGRATIVE PROYECT 

This repository contains everything you need to understand the final proyect of basic route.

Workly (SaaS) is a  `web application`  designed to simplify and optimize employee information and leave management in company administration departments. Its main goal is to reduce repetitive and time-consuming tasks by offering an intuitive and efficient interface. 

In many administration departments, a significant amount of time is spent managing employee data with Excel sheets and processing leave requests through inefficient channels like WhatsApp.

Where managing employee information and leave became slow and repetitive in diferent companys. Out of this real necessity, `WORKLY` was created — a tool to digitalize and speed up these processes.


## 🛠️ What is Workly?

Workly is a web application that centralizes employee information and leave management.
Depending on the user’s role, different actions can be performed:

	Employee:
	-View personal information.
	-Access contract, salary, and job details.
	-Request leaves and absences.
	-Administrator:
	-View information of all employees.
	-Create, update, or delete employee records.
	-Approve or reject leave requests.



## 🚀 Advantages of Workly
	-Automates repetitive administrative tasks.
	-Replaces Excel sheets and unstructured channels like WhatsApp.
	-Speeds up leave request and approval processes.
	-Offers a simple and intuitive interface.
	-Fits companies of different sizes seeking to optimize their admin workflows.
   -   Because with Workly, you work quickly.


## 📖Technologies used📖
-  **Html.**  
-  **JavaScript.** 
-  **Bootstrap5.** 
-  **database: Sql**

## 📖Dependence used📖
-  **SweetAlert**  
-  **JsonWebToken(jwt).** 
-  **Bycryp.** 
-  **Cors**
-  **VITE** 

## 🧩Main features🧩

-  **Authentication** with roles (`admin` and `employee`).
-  **Protected routes** based on session and role.
-  **Session persistence** with `localStorage`.
-  **Event CRUD** for administrators.
-  **Event visualization** for all users.
-  **Modern** and responsive interface with boostrap for the styles.
-  **Database** simulation with `json-server`.


### 📆Event CRUD (Admin only)📆

* Administrators can:

* *Create employee* (personal information).
* *Edit existing employee*.
* *View all employee in the dashboard*.
* *All of this is saved in json-server, simulating a real database.*

### 👁️Viewing (All)👁️

### *We has a diferents views depence of the user login in the page.*

#### FOR ALL USERS: 
* *Login: Entree in the page.*
* *Not found: message error in charge tha page.* 
* *Main: See your information and create the request for the permissions.*

#### ADMIN:

* *AdminDashboard: Their information and diferents option.*
* *Create employee: You can create a new personal for the company (personal information).*
* *Edit employee: Edit the personal information or status in the company .*
* *Employee List: List os everythig empoyees.*
* *Request Approval: Approve the permission .*
* *Request History: All Permissions, approval, denied and the unchecked permissions.*

#### EMPLOYEE:

* *Employee contract: You can see the information information of contract.*
* *Employee dashboard: You see the all thinks you an use .*
* *Employee details: Details of employee.*
* *Employee leave history: History permmissions, approval, denied and the unchecked permissions..*
* *Employee Payments: Payments received by the company .*



## 🚀 Getting started 🚀

_This space of instructions will allow you to obtain a working copy of the project on your local machine for development and testing purposes._

### 📋Pre-requisites 

_What things do you need to install the software and how to install them?_ 
* You need to open the terminal in your pc (Ctrl + Alt + T)
* You need visual studio code.
* npm install
* npx json-server --watch db.json --port 3000
* npm run dev

  

```
Example: npm install 
```

<img width="811" height="271" alt="Captura desde 2025-07-14 11-14-56" src=""  />

### 🔧Install thinks And run the code

_what you need to run to have a development environment running_
_In your terminal you need the star a things, for example:_
```
npm install
```

_🥇Clone the repository_

## 📦 Installation 

#### Clone the repository
git clone https://github.com/josephlgarcia/workly.git

# Enter the directory
``` 
cd workly
```
# Install dependencies
``` 
npm install
``` 

# Start the server

``` 
npm start for the backend
```
<img width="811" height="244" alt="Captura desde 2025-07-14 11-25-05" src=".//frontend/docs/image copy.png"/> 

``` 
npm start for the frontend
```
<img width="811" height="244" alt="Captura desde 2025-07-14 11-25-05" src=".//frontend/docs/image copy 2.png"/> 

_The other things:_

```
npm run dev
```
<img width="811" height="244" alt="Captura desde 2025-07-14 11-25-05" src=".//frontend/docs/image.png"/> 

```
The application will be available at:
```
```
`http://localhost:3000`
```



### You need to learn this:
* If an unauthenticated user attempts to access paths like /dashboard, /dashboard/events/create, or /dashboard/events/edit, they will be redirected to a 404 page.*
* If an authenticated user attempts to go to /login or /register, they will be automatically redirected to the dashboard.*
* Even if you reload the page, your session remains active until you manually log out (you can add a logout button if you wish).*



### 🔩Project structure:

```
├─ README.md
├─ backend
│  ├─ .env
│  ├─ .env.example
│  ├─ Bitacora.md
│  ├─ database
│  │  ├─ data.sql
│  │  ├─ db.js
│  │  └─ schema.sql
│  ├─ docs
│  │  └─ ER-Workly.drawio.png
│  ├─ package-lock.json
│  ├─ package.json
│  └─ src
│     ├─ config
│     │  └─ multer.js
│     ├─ controllers
│     │  ├─ approval_status.controller.js
│     │  ├─ city.controller.js
│     │  ├─ contract.controller.js
│     │  ├─ contract_status.controller.js
│     │  ├─ contract_type.controller.js
│     │  ├─ departament.controller.js
│     │  ├─ employee.controller.js
│     │  ├─ leave.controller.js
│     │  ├─ leaves_status.controller.js
│     │  ├─ leaves_type.controller.js
│     │  ├─ paysheet.controller.js
│     │  ├─ position.controller.js
│     │  └─ role.controller.js
│     ├─ models
│     │  ├─ approval_status.model.js
│     │  ├─ attachment.model.js
│     │  ├─ city.model.js
│     │  ├─ contract.model.js
│     │  ├─ contract_status.model.js
│     │  ├─ contract_type.model.js
│     │  ├─ departament.model.js
│     │  ├─ employee.model.js
│     │  ├─ leave.model.js
│     │  ├─ leaves_status.model.js
│     │  ├─ leaves_type.model.js
│     │  ├─ paysheet.model.js
│     │  ├─ position.model.js
│     │  ├─ role.model.js
│     │  └─ salary_history.model.js
│     ├─ routes
│     │  ├─ approval_status.routes.js
│     │  ├─ city.routes.js
│     │  ├─ contract.routes.js
│     │  ├─ contract_status.routes.js
│     │  ├─ contract_type.routes.js
│     │  ├─ departament.routes.js
│     │  ├─ employee.routes.js
│     │  ├─ leave.routes.js
│     │  ├─ leaves_status.routes.js
│     │  ├─ leaves_type.routes.js
│     │  ├─ paysheet.routes.js
│     │  ├─ position.routes.js
│     │  └─ role.routes.js
│     ├─ server.js
│     └─ uploads
│        ├─ leave_file-1756578535219-346748380.png
│        ├─ leave_file-1756578917977-18622692.pdf
│        ├─ leave_file-1756664720508-294248115.jpg
│        └─ leave_file-1756665053095-215692202.png
└─ frontend
   ├─ docs
   │  ├─ INICIAR SESION.jpg
   │  ├─ empresa (1).png
   │  └─ empresa.png
   ├─ index.html
   ├─ package-lock.json
   ├─ package.json
   └─ src
      ├─ api
      │  └─ api.js
      ├─ controllers
      │  ├─ adminDashboardController.js
      │  ├─ createEmployeeController.js
      │  ├─ editEmployeeController.js
      │  ├─ employeeContractController.js
      │  ├─ employeeDashboardController.js
      │  ├─ employeeLeaveHistoryController.js
      │  ├─ employeeLeaveRequestController.js
      │  ├─ employeeListController.js
      │  ├─ employeePaymentsController.js
      │  ├─ loginController.js
      │  ├─ requestApprovalController.js
      │  └─ requestHistoryController.js
      ├─ main.js
      ├─ routes
      │  └─ router.js
      └─ views
         ├─ admin
         │  ├─ adminDashboard.js
         │  ├─ createEmployee.js
         │  ├─ editEmployee.js
         │  ├─ employeeList.js
         │  ├─ requestApproval.js
         │  └─ requestHistory.js
         ├─ employee
         │  ├─ employeeContract.js
         │  ├─ employeeDashboard.js
         │  ├─ employeeDetails.js
         │  ├─ employeeLeaveHistory.js
         │  ├─ employeeLeaveRequest.js
         │  └─ employeePayments.js
         ├─ login.js
         └─ nofound.js
```


## ✒️Authors

_Made with:_

* **Joseph Garcia Escobar** - *Product owner* - [josephlgarcia](https://github.com/josephlgarcia)

* **Iris Martelo Martelo** - *In the Frontend* - [IrisMar7](https://github.com/IrisMar7)

* **Kelmin Miranda Hurtado** - *In the Backend* - [KlmnEly](https://github.com/KlmnEly)

* **Dylan Sanchez Vanegas** - *In the Backend* - [Dylanskr09](https://github.com/Dylanskr09)

* **Breiner Barrios Castilla** - *In the Frontend* - [Breiner-Barrios](https://github.com/Breiner-Barrios)





## 🤝 Contributing

Contributions are welcome!
To contribute:
1.	Fork the project.
2.	Create a new branch (git checkout -b feature/new-feature).
3.	Commit your changes (git commit -m 'Add new feature').
4.	Push the branch (git push origin feature/new-feature).
5.	Open a Pull Request.

## 📄Licencia.
This project was developed as part of a technical test to demonstrate knowledge of JavaScript, session management, authentication, and CRUD operations without frameworks.
