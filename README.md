# Role-Based Authentication App

A secure web application implementing role-based authentication with Gmail sign-in via Clerk, role selection (Guest/Admin), and role-specific dashboards.

## Features

- **Authentication with Clerk**: Secure Gmail-based sign-in and sign-up
- **Role Selection**: Choose between Admin and Guest roles
- **Role-Based Access Control**: Different permissions based on user role
- **Admin Dashboard**: Full CRUD operations on a form with validation
- **Guest Dashboard**: Read-only access to data
- **Responsive UI**: Mobile-friendly design with modern aesthetics
- **Dark Mode Support**: Toggle between light and dark themes

## Tech Stack

- **Frontend & Backend**: Next.js 15.2.3 (App Router)
- **Authentication**: Clerk
- **Database**: MongoDB with Prisma ORM
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with ShadCN UI components
- **Animations**: Framer Motion
- **State Management**: React Hooks
- **TypeScript**: Type safety throughout the application

## Setup Instructions

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/role-based-auth-app.git
   cd role-based-auth-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory with the following variables:
   ```
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
   CLERK_SECRET_KEY=your_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/role-selection
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/role-selection
   
   # MongoDB
   DATABASE_URL=your_mongodb_connection_string
   ```

4. Set up the database
   ```bash
   npx prisma generate
   ```

5. Run the development server
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

### Preparing for Production

1. Build the application
   ```bash
   npm run build
   ```

2. Test the production build locally
   ```bash
   npm start
   ```

### Deploying to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure the environment variables in the Vercel dashboard
4. Deploy the application

## API Endpoints

- `GET /api/forms`: Get all forms
- `POST /api/forms`: Create a new form
- `PUT /api/forms`: Update an existing form
- `DELETE /api/forms`: Delete a form
- `POST /api/role`: Update user role

## Project Structure

- `/app`: Next.js App Router pages and API routes
- `/components`: Reusable React components
- `/lib`: Utility functions, API calls, hooks, and types
- `/prisma`: Prisma schema and migrations

## User Flow

1. User signs in with Gmail via Clerk
2. User selects a role (Admin or Guest)
3. User is redirected to the appropriate dashboard
   - Admin: Can create, read, update, and delete forms
   - Guest: Can only view forms

## License

This project is licensed under the MIT License.