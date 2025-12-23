# Healthcare Patient Manager Challenge

A robust, scalable frontend application built with React and TypeScript to manage patient records. This project focuses on **Clean Architecture principles**, **Custom UI Design**, and **State Management efficiency**.

##  Tech Stack

* **Core:** React 18, TypeScript, Vite.
* **State Management:** Redux Toolkit (configured for scalability).
* **Styling:** CSS Modules, CSS Variables (Design Tokens), Native Dark Mode support.
* **Architecture:** Pragmatic Clean Architecture (Role-based separation).
* **No UI Libraries:** All components (Modals, Cards, Inputs) are built from scratch 

##  Architecture & Design Decisions

The project structure follows a **Pragmatic Clean Architecture** approach to ensure scalability and maintainability without over-engineering.

### Folder Structure
```text
src/
├── adapters/       #  Transforms "dirty" API data into clean App Models.
├── components/     #  Reusable "dumb" UI components (Atoms/Molecules).
├── hooks/          #  Custom logic hooks (separation of concerns).
├── models/         #  TypeScript Interfaces defining the Domain Entities.
├── pages/          #  Views that connect Redux state with UI components.
├── redux/          #  Global State management slices.
├── services/       #  HTTP requests (API layer).
├── styles/         #  Design Tokens, Global Variables, and Resets.
└── utilities/      #  Pure functions (formatters, validators).