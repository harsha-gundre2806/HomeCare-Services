components/admin/

AddEmployee.jsx - Pure UI form component with input fields (name, email, specialization, role) for creating new staff members. Receives onSubmit handler as prop from parent container, no API logic inside.

EditEmployee.jsx - Pure UI form component pre-filled with existing staff data passed as props for editing employee information. Receives staff object and onUpdate handler from parent, renders form UI only.


components/common/

LoadingSpinner.jsx - Reusable animated loading indicator component displayed during data fetching or async operations. Shows spinning animation, can be customized with size/color props.

Navbar.jsx - Top horizontal navigation bar component showing app logo, user role, and logout button. Purely presentational, receives user data and logout handler as props from layout.

Notification.jsx - Toast/popup notification component that displays success/error/info messages triggered by API responses or user actions. Receives message text, type (success/error), and auto-dismiss duration as props.

Sidebar.jsx - Vertical side navigation menu component with role-based links (different menu items for admin/staff/patient). Receives user role as prop to conditionally render appropriate navigation links.


components/patient/

AssignedStaffCard.jsx - Card component displaying assigned staff member's details (photo, name, specialization, rating, contact). Receives staff object as prop and renders information in a styled card format.

CreateProfile.jsx - Form component with input fields for new patients to enter personal info (name, age, DOB, address, medical notes). Pure UI component that receives onSubmit handler from parent container, handles local form state only.

EditProfile.jsx - Form component for updating existing patient profile with pre-filled current values passed as props. Receives patient object and onUpdate handler, manages form state and validation locally.

OTPStatus.jsx - Real-time status indicator showing OTP generation, sharing, and verification progress with visual timeline/stepper. Receives OTP status from props (WebSocket data) and displays current state (generated/verified/expired).

RaiseComplaint.jsx - Form component with textarea for complaint description and staff selection dropdown for patients to submit grievances. Receives staff list and onSubmit handler as props, validates minimum text length locally.

RateStaff.jsx - Interactive rating component with star selection (1-5 stars) and optional text feedback field for post-service rating. Receives service/staff ID as props and onSubmit handler to send rating to parent container.

ServiceRequest.jsx - Form component for creating new service requests with service type dropdown, urgency selection, and notes textarea. Pure UI receiving onSubmit handler from container, manages form state without API calls.


components/staff/

MyRatings.jsx - Display component showing staff member's average rating score, total ratings count, and list of individual patient feedback. Receives ratings array as prop from container and renders in card/list format.

OTPVerification.jsx - Input form component for staff to enter and verify patient's 4-6 digit OTP code with submit button. Receives onVerify handler as prop, validates OTP format locally before submission.

ServiceStatus.jsx - Progress indicator component showing service timeline (queued → assigned → medication → completed) with visual stepper. Receives current status and service details as props, displays "Mark as Done" button when applicable.


containers/admin/

AdminDashboard.jsx - Container component that fetches and manages state for admin overview data (stats, recent activity, pending requests). Makes API calls via useEffect, passes data down to presentational child components, handles business logic.

ComplaintsManager.jsx - Container managing complaints data fetching, filtering, and status updates with state management for pending/resolved tabs. Fetches complaints from API, provides handlers to child components for updating complaint status.

RevenueDashboard.jsx - Container component that fetches revenue analytics data from API and manages chart/metrics state for visualization. Handles date range filtering logic and passes processed data to chart components.

StaffManagement.jsx - Container managing staff CRUD operations, fetching employee list, and handling add/edit/activate/deactivate actions. Provides data and callback functions to AddEmployee, EditEmployee, and EmployeeList components.


containers/

PatientDashboard.jsx - Container fetching patient's current service request status, assigned staff info, and OTP details from API. Manages real-time WebSocket connection for live updates and passes data to child components.

StaffDashboard.jsx - Container fetching staff member's assigned patients, personal ratings, and today's tasks from API with state management. Provides data and action handlers to child components for OTP verification and service completion.


layout/

DashboardLayout.jsx - Wrapper layout component that renders Navbar + Sidebar + main content area, adapts menu based on user role. Receives children (page content) and user context, provides consistent layout structure across all dashboard pages.


lib/

supabase.js - Supabase client initialization and configuration file exporting configured client instance for use across the app. Contains Supabase URL and anon key, creates and exports single supabase client object.


pages/admin/

Analytics.jsx - Page component that imports and renders RevenueDashboard container with analytics charts and metrics display. Thin wrapper that may add page-specific layout or title, delegates data logic to container.

ComplaintsPage.jsx - Page component rendering ComplaintsManager container with full-page complaints management interface including tabs and filters. Acts as route entry point, may add page header or breadcrumbs.

QueueManagement.jsx - Page component displaying real-time service request queue with assign staff functionality and live updates via WebSocket. Main admin workflow page for managing patient requests and staff assignments.


pages/auth/

ForgotPassword.jsx - Authentication page with email input form that sends password reset link via backend API to user's email. Handles form submission, displays success/error messages, includes link back to login.

Login.jsx - Main authentication page with email/password form that validates credentials and redirects to role-based dashboard after successful login. Handles Supabase auth, stores user session, includes links to register and forgot password.


pages/patient/

MyRequests.jsx - Page displaying patient's service request history in table/card format with filtering by status (queued/completed/all). Fetches request data from API, allows viewing details and ratings given for each request.


pages/staff/

MyAssignments.jsx - Page displaying detailed list of all current and past patient assignments for logged-in staff member with action buttons. Shows patient details, service status, OTP verification section, and completion controls.


routes/

routes.jsx - Central routing configuration defining all application routes with role-based access control and protected routes. Maps URLs to page components, wraps routes with authentication/authorization checks based on user role.


styles/

AddEmp.css - Stylesheet specific to AddEmployee/EditEmployee form components with input styling, button styles, and form layout. Contains CSS for form validation states, error messages, and responsive design.

dashboard.css - Common dashboard page styling including card layouts, grid systems, stats widgets, and responsive breakpoints. Applied across all dashboard pages (admin/staff/patient) for consistent look.

global.css - Application-wide base styles including CSS resets, typography, color variables, and utility classes used everywhere. Loaded first, defines design system tokens (colors, spacing, fonts).

navbar.css - Styling for top navigation bar including logo placement, menu items, user dropdown, and mobile hamburger menu. Contains responsive behavior and hover/active states.

notification.css - Toast notification styling including positioning (top-right corner), animations (slide-in/fade-out), and color coding by type (success/error/info). Defines z-index for proper layering.

queue.css - Specific styling for queue management page including queue cards, status badges, assign dropdowns, and real-time update animations. Handles queue item layout and priority indicators.




src/
├── api/                  # Backend service connections
│   └── api.txt
├── assets/               # Static files (images, SVGs)
│   └── react.svg
├── components/           # UI Components (Presentational)
│   ├── admin/            # Admin-specific UI elements
│   │   ├── AddEmployee.jsx
│   │   └── EditEmployee.jsx
│   ├── common/           # Reusable UI across all roles
│   │   ├── LoadingSpinner.jsx
│   │   ├── Navbar.jsx
│   │   ├── Notification.jsx
│   │   └── Sidebar.jsx
│   ├── patient/          # Patient-specific UI elements
│   │   ├── AssignedStaffCard.jsx
│   │   ├── CreateProfile.jsx
│   │   ├── EditProfile.jsx
│   │   ├── OTPStatus.jsx
│   │   ├── RaiseComplaint.jsx
│   │   ├── RateStaff.jsx
│   │   └── ServiceRequest.jsx
│   └── staff/            # Staff-specific UI elements
│       ├── MyRatings.jsx
│       ├── OTPVerification.jsx
│       └── ServiceStatus.jsx
├── containers/           # Business logic & state management wrappers
│   ├── admin/            
│   │   ├── AddEmployeeContainer.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── ComplaintsManager.jsx
│   │   ├── RevenueDashboard.jsx
│   │   └── StaffManagement.jsx
│   ├── PatientDashboard.jsx
│   └── StaffDashboard.jsx
├── layout/               # Page structure templates
│   └── DashboardLayout.jsx
├── lib/                  # Third-party configurations
│   └── supabase.js       # Database connection logic
├── pages/                # Route-level components
│   ├── admin/
│   │   ├── AddEmployeePage.jsx
│   │   ├── Analytics.jsx
│   │   ├── ComplaintsPage.jsx
│   │   └── QueueManagement.jsx
│   ├── auth/             # Login and Password flows
│   │   ├── ForgotPassword.jsx
│   │   └── Login.jsx
│   ├── patient/
│   │   └── MyRequests.jsx
│   └── staff/
│       └── MyAssignments.jsx
├── routes/               # Navigation logic
│   └── routes.jsx
├── styles/               # CSS Modules and Global styles
│   ├── AddEmp.css
│   ├── Dashboard.css
│   ├── Global.css
│   ├── Navbar.css
│   ├── Notification.css
│   ├── Patientprofile.css
│   └── Queue.css
├── App.css
├── App.jsx               # Root Component
├── index.css             # Base styles
├── main.jsx              # Entry point
