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

## Demo Video
W

## Features

- Lead Management
- Create, update, delete leads
- Assign leads to sales agents
- Track lead lifecycle:
    New → Contacted → Qualified → Proposal Sent → Closed
- Add tags and priority levels
- Estimate time to close deals

---

## API Reference

### **/leads**<br>
List all Leads<br>
Sample Response<br>
```
[{name, source, salesAgent, status, tags, timeToClose, priority}]
```
### **/leads/:id**<br>
GET – Get Lead by ID<br>
Sample Response<br>
```
[{name, source, salesAgent, status, tags, timeToClose, priority}]
```

### **/leads**<br>
POST – Create Lead<br>
Sample Request<br>
```
[{name, source, salesAgent, status, tags, timeToClose, priority}]
```

### **/leads/:id**<br>
PATCH – Update Lead<br>
Sample Request<br>
```
[{status, salesAgent, priority, tags}]
```

### **/leads/:id**<br>
DELETE – Delete Lead<br>
Sample Response<br>
```
[{message}]
```


## Contact

For bugs and feature request, please reach out to mohantabinaybhusan@gmail.com