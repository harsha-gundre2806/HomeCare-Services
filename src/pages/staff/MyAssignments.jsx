// Detailed view of all staff assignments

import "../../styles/MyAssessment.css";

export default function MyAssessment({ assessments = [] }) {
  return (
    <div className="assessment-container">
      <h2>My Assessments</h2>

      {assessments.map((item) => (
        <div key={item.id} className="assessment-card">

          <div className="assessment-row">
            <span className="label">Patient</span>
            <span>{item.name}</span>
          </div>

          <div className="assessment-row">
            <span className="label">Service</span>
            <span>{item.service_type}</span>
          </div>

          <div className="assessment-row">
            <span className="label">Date</span>
            <span>{new Date(item.created_at).toLocaleDateString()}</span>
          </div>

          <div className="assessment-row">
            <span className="label">Status</span>
            <span className={`status ${item.status}`}>
              {item.status}
            </span>
          </div>

        </div>
      ))}
    </div>
  );
}