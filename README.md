# Patient Management Dashboard

A modern, high-performance Single Page Application (SPA) for managing patient records. This project focuses on **scalability**, **maintainable architecture**, and a polished **User Experience (UX)**.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Architecture & Design Patterns](#architecture--design-patterns)
- [Key Features & Optimizations](#key-features--optimizations)
- [Getting Started](#getting-started)
- [Accessing from Any Device](#accessing-from-any-device-network-mode)

---

## Project Overview

This dashboard allows users to view, create, and edit patient data efficiently. It was built to demonstrate advanced frontend concepts such as **Server-State Management**, **Component Composition**, and **Performance Optimization** techniques.

## Tech Stack

- **Core:** React 18, TypeScript, Vite.
- **State Management:** Redux Toolkit (RTK) & RTK Query.
- **Styling:** CSS Modules (BEM methodology adapted).

## Architecture & Design Patterns

The application follows a **Modular Component-Based Architecture**, adhering to **Flux** principles for predictable state flow.

### Implemented Design Patterns

1.  **Adapter Pattern (Data Transformation Layer):**
    -   Implemented a transformation layer to decouple the Frontend from the Backend.
    -   Raw API responses are normalized into clean Domain Models before reaching the Redux Store, ensuring the UI remains resilient to backend changes (e.g., snake_case to camelCase conversion).

2.  **Facade Pattern (Custom Hooks):**
    -   Used custom hooks (e.g., `usePatients`) to abstract the complexity of `RTK Query`.
    -   The UI components interact with a simplified API interface, remaining unaware of the underlying fetching library.

3.  **Container/Presentational Pattern:**
    -   **Smart Components (Containers):** Handle logic and state orchestration (e.g., `MainSection`).
    -   **Dumb Components (Presentational):** Purely visual, reusable components driven by props (e.g., `PatientCard`, `Modal`).

4.  **Observer Pattern:**
    -   Leveraged Redux's subscription model to automatically update the UI whenever the server state changes (e.g., after a mutation).

---

## Key Features & Optimizations

-   **Server-State Management:** Utilized **RTK Query** with automatic caching and tag-based invalidation. Lists update automatically upon creation/edition without manual refetches.
-   **Responsive Grid Layout:** A fluid CSS Grid implementation (`repeat(auto-fit, minmax(...))`) ensuring perfect rendering from Desktop to Mobile/Tablet.
-   **Interactive UI:**
    -   **Expandable Cards:** Smooth CSS transitions for revealing long text descriptions.
    -   **Toast Notifications:** Custom feedback system for success/error actions with auto-dismiss logic.
-   **Performance:**
    -   **Lazy Loading:** Native `loading="lazy"` on images to improve LCP (Largest Contentful Paint) and reduce page load times.
    -   **Client-Side Pagination:** Instant page transitions handled locally to minimize network latency.

---

## Getting Started

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/MatiasMarchese/challenge-healthcare.git](https://github.com/MatiasMarchese/challenge-healthcare.git)
    ```
2.  Navigate to the project directory:
    ```bash
    cd challenge-healthcare
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```

### Running Locally

To start the development server on your machine:

```bash
npm run dev