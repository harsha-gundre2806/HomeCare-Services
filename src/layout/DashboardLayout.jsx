//for layout

import '../styles/Dashboard.css';

export default function DashboardLayout({
  title,
  sidebar,
  children,
  onBack,
  showBackButton = false,
}) {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  return (
    <div className="d-viewport">
      <div className="d-container">
        <aside className="d-sidebar">
          <h2 className="d-heading">{title}</h2>
          {sidebar}
        </aside>

        <main className="d-content">
  {/* HEADER BAR */}
  <div className="d-header">
    {showBackButton ? (
      <button className="d-btn" onClick={onBack}>
        Back to Dashboard
      </button>
    ) : (
      <div />
    )}

    <button className="d-logout" onClick={handleLogout}>
      Logout
    </button>
  </div>

  <div className="d-wrapper">
    {children}
  </div>
</main>

        
      </div>
    </div>
  );
}






