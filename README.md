## Project Name: Zennith

This is a Next.js application with TypeScript, Tailwind CSS, and Next-Auth integration for authentication.

---

### Table of Contents
1. **Project Overview**
2. **Getting Started**
3. **Environment Setup**
4. **Directory Structure**
5. **Features**
6. **Contributing**
7. **License**

---

## 1. Project Overview

This project is a Next.js application that includes TypeScript for type safety, Tailwind CSS for styling, and 
Next-Auth for authentication. It's designed to provide a robust foundation for building modern web 
applications with user authentication capabilities.

The application includes the following key features:

- **TypeScript**: For static typing and better code quality.
- **Tailwind CSS**: For utility-first styling and responsive design.
- **Next-Auth**: For handling user authentication, including sign-in, sign-up, and session management.
- **Custom Components**: Reusable UI components for consistent styling across the application.
- **Utilities**: Helper functions to simplify common tasks.

---

## 2. Getting Started

To get started with this project, follow these steps:

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- A modern web browser
- Basic understanding of Next.js, TypeScript, and Tailwind CSS

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Shivoo29/Zennith
   cd Zennith
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`.
   - Update the values in `.env` as needed.

4. Start the development server:
   ```bash
   npm run dev
   ```
   The application should be available at `http://localhost:3000`.

---

## 3. Environment Setup

The project uses environment variables for configuration. The required environment variables are defined in 
`types/environment.d.ts` and include:

- `NEXTAUTH_URL`: URL of your Next.js application.
- `NEXTAUTH_SECRET`: Secret used by NextAuth to sign tokens.
- `ADMIN_EMAIL`: Email address for the admin user.
- `ADMIN_PASSWORD`: Password for the admin user.

Create a `.env` file in the root directory with these variables before starting the development server.

---

## 4. Directory Structure

```
src/
├── components/    # Reusable UI components
│   ├── auth/      # Authentication-related components
│   ├── layout/    # Layout and page structure components
│   └── utils/     # Utility components
├── pages/         # Next.js pages (e.g., home, login)
├── styles/        # Custom Tailwind CSS configurations
├── types/         # TypeScript type definitions
└── utils/         # Helper functions and utilities
```

---

## 5. Features

### Authentication
The application uses Next-Auth for authentication. The following features are implemented:

- User registration and login.
- Session management.
- Role-based access control (RBAC).

### Styling
The project uses Tailwind CSS for styling, with custom configurations in `styles/tailwind.config.js`. The 
design system includes:

- Responsive design.
- Custom utility classes.
- Consistent spacing and typography.

### Components
Reusable UI components are located in the `components` directory. These include:

- Auth-related components (e.g., LoginForm, RegisterForm).
- Layout components (e.g., Navigation, Footer).
- Utility components for common tasks.

---

## 6. Contributing

Contributions are welcome! To contribute to this project:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-branch`).
3. Commit your changes (`git commit -m "Add your-commit"`).
4. Push to the branch (`git push origin feature/your-branch`).
5. Open a Pull Request.

Please ensure that your code follows the project's coding standards and includes appropriate tests.

---

## 7. License

This project is licensed under the MIT License. See `LICENSE` for more information.

---

## 8. Code Structure

### Components
The `components` directory contains reusable UI elements:

- **Auth Components**: Located in `components/auth/`, these include login, registration, and password reset 
forms.
- **Layout Components**: Found in `components/layout/`, these define the overall structure of your pages 
(e.g., headers, footers).
- **Utility Components**: Helper components in `components/utils/` for tasks like modals or alerts.

### Pages
The `pages` directory contains Next.js route files. These include:

- Home page (`pages/index.tsx`).
- Authentication pages (`pages/auth/[login|register].tsx`).
- Other application-specific routes.

### Styles
Custom Tailwind CSS configurations are located in `styles/tailwind.config.js`. This file includes custom 
plugins, theme extensions, and other styling-related configurations.

### Types
Type definitions for the project are located in the `types` directory. These include:

- Custom Next-Auth types (e.g., user sessions, providers).
- Environment variable type definitions.
- Other application-specific TypeScript interfaces and types.

### Utilities
Helper functions and utilities are located in the `utils` directory. These may include:

- Authentication-related functions.
- Data validation functions.
- Helper functions for common tasks (e.g., date formatting).

---

## 9. Project Status

[Insert project status, e.g., "Active development", "In Beta", or "Stable"].

If you have any questions or need further assistance, feel free to reach out!

