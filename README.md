# CareFlow - On-Demand Home Care Services Platform

CareFlow (Care.xyz) is a responsive, full-stack web application built using **Next.js (App Router)** and **MongoDB**. The platform allows users to book customized, professional home care services—ranging from baby care and babysitting to elderly support and sick patient care—across major structural areas in Dhaka and Chattogram.

This project features a clean, single-user testing environment equipped with simulation controls to bypass complex administrative hierarchies, making it incredibly easy to test state lifecycles dynamically.

---

## 🌐 Live Deployment

🚀 **Try the Live Demo:**
(https://care-flow-lyart.vercel.app/)

---

## 🚀 Core Features

- **Hierarchical Location Routing:** Dynamic selection matching Division ➔ District ➔ City ➔ Area constraints.
- **Dynamic Matrix Pricing:** Live calculation fields computed via client state mechanisms before booking persistence.
- **Interactive Care Ledger:** A clean layout displaying all user bookings without horizontal layout crowding.
- **Built-in Workflow Simulator:** Real-time state advancement pipeline controls directly inside the user canvas to transition statuses easily: `Pending` ➔ `Confirmed` ➔ `Completed` ➔ `Cancelled`.
- **Fully Responsive Interface:** Seamlessly transitions between a data-dense grid view on desktop screens to compact card stacks on mobile devices.
- **Persistent Server Actions:** Status transitions and cancellations are directly committed to MongoDB Atlas and survive browser reloads.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js (React Server Components & Client Hooks)
- **Styling:** Tailwind CSS (Responsive Design Engine)
- **Database:** MongoDB Atlas (Mongoose ODM layer)
- **State Management:** React Hooks (`useState`, `useEffect`) & React Context Layer

---

## 📦 Operational Lifecycle States

1. 🟡 **Pending:** Request is successfully logged in the database and sits in the assignment queue. Users retain cancellation privileges.
2. 🔵 **Confirmed:** A simulated caregiver has been assigned to lock down the shift parameters.
3. 🟢 **Completed:** Care duration is fulfilled, freezing the database index parameters.
4. 🔴 **Cancelled:** User flags the ledger entry as obsolete, locking out further changes.

---

## ⚙️ Installation & Local Setup

Follow these steps to run the platform locally on your machine:

1. **Clone the Repository**
   ```bash
   git clone [https://github.com/kamrul397/CareFlow.git](https://github.com/kamrul397/CareFlow.git)
   cd CareFlow
   ```
