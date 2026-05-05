# Anvaya CRM App

A full-stack Lead Management CRM application built with React, Express, and MongoDB. This system helps sales teams efficiently manage leads, track progress, collaborate via comments, and generate actionable reports.

---
## Demo Link
[Live Demo] (https://anvaya-f.vercel.app/)

## Quick Start

```
git clone https://github.com/binayjy8/ANVAYA-F.git
cd my-app
npm install
npm run dev

```

---

## Technologies
- React JS
- React Router
- Axios
- Chart.js
- Node JS
- Express
- Mongo DB

---

## Demo Video
Watch a walk through (4 minutes) of all the major features of the app:
[Video] (https://drive.google.com/file/d/1Gc1EphYtxaHjVJBm8AokTr-8QmuGL_AL/view?usp=sharing)
---

## Features

- Allows users to create, update, and delete leads.
- Enables users to assign leads to sales agents.
- Allows users to track the lead lifecycle: New → Contacted → Qualified → Proposal Sent → Closed.
- Enables users to add tags and set priority levels.
- Allows users to estimate the time required to close deals.

---

## API Reference

### **GET /leads**<br>
Retrieves all leads.<br>
Sample Response<br>
```
[{"name": "string", "source": "string", "salesAgent": "string", "status": "string", "tags": ["string"], "timeToClose": "number", "priority": "string"}]
```
### **GET /leads/:id**<br>
Retrieves a lead by ID.<br>
Sample Response<br>
```
[{"name": "string", "source": "string", "salesAgent": "string", "status": "string", "tags": ["string"], "timeToClose": "number", "priority": "string"}]
```

### **POST /leads**<br>
Creates a new lead.<br>
Sample Request<br>
```
[{"name": "string", "source": "string", "salesAgent": "string", "status": "string", "tags": ["string"], "timeToClose": "number", "priority": "string"}]
```

### **PATCH /leads/:id**<br>
Updates an existing lead.<br>
Sample Request<br>
```
[{"status": "string", "salesAgent": "string", "priority": "string", "tags": ["string"]}]
```

### **DELETE /leads/:id**<br>
Deletes a lead.<br>
Sample Response<br>
```
[{"message": "Lead deleted successfully"}]
```


## Contact

For bugs and feature request, please reach out to mohantabinaybhusan@gmail.com
