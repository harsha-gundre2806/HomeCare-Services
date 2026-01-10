components/admin/

AddEmployee.jsx - Form component with input fields for creating new staff profiles with name, email, phone, specialization, and role selection. Includes validation and submit handler to send data to backend API.

ComplaintsManager.jsx - Displays a table/list of all patient complaints with filtering options by status (pending/resolved) and staff member. Allows admin to view complaint details, update status, and take action.

EditEmployee.jsx - Pre-populated form to modify existing staff member details including personal info and specialization. Fetches current staff data on load and updates via PUT request.

EmployeeList.jsx - Data table showing all staff members with columns for name, email, specialization, status, and action buttons. Includes toggle switches for activate/deactivate functionality and edit/delete options.

RevenueDashboard.jsx - Visual dashboard with cards and charts displaying total revenue, daily/monthly breakdowns, and revenue trends. Fetches analytics data from backend and renders using chart library.


components/common/

LoadingSpinner.jsx - Reusable animated spinner component displayed during API calls, data fetching, or page transitions. Accepts optional size and color props for customization.

Navbar.jsx - Top horizontal navigation bar with logo, role-based menu links, user profile dropdown, and logout button. Responsive design that collapses to hamburger menu on mobile devices.

Notification.jsx - Toast notification component that appears on screen corners to display success/error/info messages from API responses or WebSocket events. Auto-dismisses after 3-5 seconds with close button option.

Sidebar.jsx - Vertical side navigation menu with icons and links specific to user role (admin/staff/patient). Collapsible on mobile with smooth transition animations.


components/patient/

AssignedStaffCard.jsx - Card component displaying assigned staff member's photo, name, specialization, rating, and contact information. Shows "Waiting for assignment" state if no staff assigned yet.

CreateProfile.jsx - Multi-step form for new patients to enter personal details (name, age, address) and medical information (history, allergies, notes). Validates required fields before submission to backend.

EditProfile.jsx - Form allowing patients to update their existing profile information with pre-filled current values. Includes save and cancel buttons with confirmation dialog.

RaiseComplaint.jsx - Form with textarea for complaint description, dropdown to select staff member, and submit button. Validates minimum character length and sends complaint to admin dashboard.

RateStaff.jsx - Rating interface with star selection (1-5), optional text feedback field, and submit button. Appears after service completion and updates staff's average rating.

ServiceRequest.jsx - Form for patients to create new service requests with service type selection and additional notes field. Submits request that enters admin queue with "queued" status.


components/staff/

MyRatings.jsx - Displays staff member's average rating score, total number of ratings, and list of individual patient feedback comments. Helps staff track their performance over time.

ServiceStatus.jsx - Shows current service progress with visual timeline/stepper (queued → assigned → medication started → completed). Includes "Mark as Done" button when service is active.


pages/admin/

AdminDashboard.jsx - Main landing page after admin login showing overview cards with key metrics (total requests, active staff, pending complaints, today's revenue). Includes quick action buttons and recent activity feed.

Analytics.jsx - Comprehensive analytics page with multiple charts (line, bar, pie) showing revenue trends, staff performance comparisons, service completion rates, and monthly statistics. Includes date range filters and export options.

ComplaintsPage.jsx - Full-page view dedicated to complaint management with tabs for pending/resolved complaints and detailed complaint cards. Allows admin to add notes and change complaint status.

QueueManagement.jsx - Real-time queue display showing all pending service requests in chronological order with patient details. Includes "Assign Staff" dropdown for each request with available staff list.

StaffManagement.jsx - Complete staff management interface with employee list, add/edit forms in modals, and bulk actions. Shows staff status, ratings, and provides quick activate/deactivate controls.


pages/auth/

ForgotPassword.jsx - Password reset page with email input field that sends reset link via Nodemailer. Shows success message after email sent and handles error states.

Login.jsx - Main authentication page with email/password inputs, "Remember me" checkbox, and role-based redirect after successful login (admin/staff/patient dashboards). Includes forgot password link and registration link for patients.

Register.jsx - Patient registration page with form fields for name, email, phone, password, and password confirmation. Validates email format, password strength, and creates new patient account.


pages/patient/

MyRequests.jsx - History page showing all patient's service requests in table format with columns for date, status, assigned staff, and rating given. Allows filtering by status and viewing request details.

PatientDashboard.jsx - Patient home page displaying current request status, assigned staff card, OTP verification section, and quick links to request service or view history. Shows real-time updates via WebSocket.

RequestService.jsx - Dedicated full-page form for creating detailed service requests with service type selection, urgency level, and description textarea. Confirms submission and redirects to dashboard.


pages/staff/

StaffDashboard.jsx - Staff home page showing today's assigned patients count, personal rating display, and list of current assignments with patient details. Includes quick access to OTP verification and service completion actions.

