# Holidaze

Holidaze is an accommodation booking site that provides a seamless experience for users to book holidays at various venues. The application includes both customer-facing and admin-facing interfaces. Customers can browse and book venues, while admins can register, manage and delete venues.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Scripts](#scripts)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Code Quality](#code-quality)
- [Contributing](#contributing)
- [License](#license)

## Features

- Customer-facing side:
  - Browse and search for venues
  - View venue details
  - Book venues
  - Profile management
  - Responsive design for various devices
- Admin-facing side:
  - Register and manage venues
  - Profile management

## Technologies

- **Frontend:**

  - React 18
  - React Router Dom
  - Tailwind CSS
  - Zustand
  - Axios
  - Yup
  - React Icons, React Hook Form, React Day Picker, React Lazyload, React Modal, React Slick (carousel), React Helmet Async (SEO)

- **Build Tools:**

  - Vite

- **Code Quality:**
  - ESLint
  - Prettier
  - Prettier Plugin TailwindCSS
  - ESLint Plugins:
    - eslint-plugin-import
    - eslint-plugin-jsx-a11y
    - eslint-plugin-react
    - eslint-plugin-react-hooks
    - eslint-plugin-react-refresh
    - eslint-plugin-tailwindcss
    - eslint-plugin-unused-imports

## Installation

### Prerequisites

- Node.js (version 14 or later)
- npm

1. Clone the repository:

   ```bash
   git clone https://github.com/kribac12/holidaze.git
   ```

2. Navigate to the project directory:

   ```bash
   cd holidaze
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Scripts

- **Start the development server:**

  ```bash
  npm run dev
  ```

- **Build the project:**

  ```bash
  npm run build
  ```

- **Preview the production build:**

  ```bash
  npm run preview
  ```

- **Lint the code:**

  ```bash
  npm run lint
  ```

- **Format the code:**
  ```bash
  npm run format
  ```

## Usage

1. **Starting the application:**

   ```bash
   npm run dev
   ```

2. **Open your browser and navigate to:**

   ```
   http://localhost:5173
   ```

3. **Explore the features:**
   - Browse venues
   - Book a venue
   - Admin functionalities (register, manage venues)

## API Integration

The Holidaze front end interacts with the Noroff Holidaze API to fetch and manage data. Ensure to follow the official API documentation for endpoints and data structure.

## Code Quality

This project uses ESLint and Prettier to maintain code quality and formatting standards. Tailwind CSS classes are also automatically sorted using `prettier-plugin-tailwindcss`.

### ESLint Configuration

- The `.eslintrc.js` file includes configurations for React, hooks, accessibility, and Tailwind CSS linting.
- Plugins:
  - `eslint-plugin-import`
  - `eslint-plugin-jsx-a11y`
  - `eslint-plugin-react`
  - `eslint-plugin-react-hooks`
  - `eslint-plugin-react-refresh`
  - `eslint-plugin-tailwindcss`
  - `eslint-plugin-unused-imports`

### Prettier Configuration

- The `.prettierrc` file includes configurations for formatting the codebase consistently.
- It uses `prettier-plugin-tailwindcss` to ensure Tailwind CSS classes are sorted correctly.

### Linting and Formatting

- To lint the code:
  ```bash
  npm run lint
  ```
- To format the code:
  ```bash
  npm run format
  ```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code follows the project's coding standards and passes all linting and formatting checks.

## License

This project is licensed under the MIT License.
