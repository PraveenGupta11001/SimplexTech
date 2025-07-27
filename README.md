## SimplerTech UI – Auth Assignment

A simple, responsive authentication system built using **Next.js (App Router)**, **Redux Toolkit**, and **Tailwind CSS**, supporting login and sign-up flows with protected routes and UI feedback.

---

## Tech Stack

* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS, `shadcn/ui`
* **State Management:** Redux Toolkit
* **Testing:** Jest + React Testing Library (basic test included)
* **Tooling:** ESLint, Prettier, PostCSS

---

## Features

* Sign-Up: Register users and store them in Redux state
* Login: Authenticate users from Redux store
* Dashboard: Protected route, only accessible after login
* Error Handling: Validations and login feedback with dismiss option
* Responsive UI using reusable components
* Navigation bar with route links
* Scalable and clean project structure

---

## Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/PraveenGupta11001/SimplexTech.git
   cd simplertech-ui
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Optional: Run tests

   ```bash
   npm run test
   ```

5. Access the app:

   * `/signup` – Sign-Up page
   * `/login` – Login page
   * `/dashboard` – Protected route (only after login)

---

## Project Structure

```
simplertech-ui/
├── app/
│   ├── signup/page.tsx
│   ├── login/page.tsx
│   ├── dashboard/page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── Navbar.tsx
├── features/
│   └── authSlice.ts
├── store/
│   └── userStore.ts
├── __test__/
│   └── Navbar.test.tsx
```

---

## Collaboration

1. Fork the repository
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make changes and commit
4. Push to your fork and open a pull request

---

## Notes

* This project uses mock authentication (no database or backend).
* State is managed fully on the client using Redux.
* Easily extensible to integrate with real APIs or third-party auth services.