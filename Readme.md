# Courier Web Application

## Features

- User Registration
- User Login
- Create Shipments
- View Shipments
- Update Shipment Tracking Status
- Role-Based Authorization for Admin and Users

## Tech Stack

- **Backend**: PostgreSQL, Express.js, Node.js (with TypeScript)
- **Frontend**: React.js, Tailwind CSS, Shadcn
- **ORM**: Prisma
- **API Documentation**: Swagger
- **Development Tools**: yarn, nodemon, eslint, prettier, husky

---

## Getting Started

After cloning the repository, you will see two folders: `client` and `server`. You need to run both servers separately. Follow these instructions in the given order.

### Backend Setup

1. Navigate to the `server` folder.
2. Create a file in the `server` folder and name it `.env`.
3. Open `.env.sample` and copy all the environment variables listed in it.
4. Paste the copied data into the newly created `.env` file.
5. Update the values of the environment variables in `.env` as required (e.g., `DATABASE_URL`). You can keep the default values except for `DATABASE_URL`.

#### Run Backend Server

1. Open the `server` folder in a terminal.
2. Run the following commands sequentially:

   ```bash
   yarn install
   yarn seed
   yarn dev
   ```

   > **Note**: `yarn seed` creates an `ADMIN` user. So, don't miss it.

3. The backend server should be now running on **http://localhost:5000**.

### Frontend Setup

1. Navigate to the `client` folder.
2. Open the `client` folder in a terminal.
3. Run the following commands sequentially.

   ```bash
   yarn install
   yarn dev
   ```

4. The frontend server will run on **http://localhost:5173**.

5. Open `http://localhost:5173` in a browser to access the application. Refer to the user instructions below before proceeding.

---

## User Instructions

The application supports two user roles: **ADMIN** and **USER**.

- **ADMIN Account**: Created by running `yarn seed`.

  - **Email**: `admin@example.com`
  - **Password**: `admin123`

- **USER Accounts**: Created via sign-up on the frontend.
  - **Note**: Only ADMIN users can update shipment tracking statuses.

---

## Application Security

The application includes robust security measures to safeguard against vulnerabilities:

### Backend Security

1. **Password Hashing**: Uses `bcrypt` to hash passwords before storage.
2. **JWT Authentication**: Implements role-based authorization.
3. **Secure JWTs**: HttpOnly and Secure cookies for secured token storage (in production).
4. **CORS Protection**: Prevents unauthorized cross-origin requests.
5. **Secure HTTP Header**: Adds secure HTTP headers with `helmet`.
6. **Schema Validation**: Validates data integrity of request inputs with `joi`.
7. **XSS Protection**: Sanitizes request inputs using the `xss` library. Prevents croos-site scripting.
8. **Rate Limiting**: Uses `express-rate-limit` to prevent DDoS and brute-force attacks.

### Frontend Security

1. **Protected Routes**: Restricts access to authorized users.
2. **HttpOnly Cookies**: Manages JWT securely.

---

## Developer Instructions

### Code Quality and Formatting

- **Eslint** and **Prettier** are set up for proper code formatting. These tools will be installed and configured automatically when you install dependencies.
- **Pre-commit Hooks**: Husky is set up as a pre-commit hook to ensure code quality.
  - When you commit changes, eslint will automatically fix fixable issues and display errors for non-fixable ones.
  - If you want to add Prettier formatting as a pre-commit task, update the `test` script in `package.json` by adding the `yarn format` command.

These configurations are present in both the `client` and `server` repositories.

---

Application built by m@st3rm1nd-d3v (Sapthaka Morahela) for HalfLife assignment.
