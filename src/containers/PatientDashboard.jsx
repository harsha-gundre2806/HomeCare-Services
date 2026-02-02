// Main patient overview showing request status and assigned staff
// need to add home to it


import { useState,useEffect } from 'react';
import { supabase } from "../lib/supabase";
import '../styles/Patientprofile.css'; 
import "../styles/Dashboard.css";


import CreateProfile from '../components/patient/CreateProfile';
import EditProfile from '../components/patient/EditProfile';
import RaiseComplaint from '../components/patient/RaiseComplaint';
import RateStaff from '../components/patient/RateStaff';
import ServiceRequest from '../components/patient/ServiceRequest';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function PatientDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [isLoading, setIsLoading] = useState(true);
    const [patient, setPatient] = useState(null);

   useEffect(() => {
    const fetchPatient = async () => {
        const email = localStorage.getItem("patientEmail");

        if(!email) {
            setIsLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from("patients")
            .select("*")
            .eq("email",email)
            .single();

        if (error) {
            console.error(error);
        } else {
            setPatient(data);
            localStorage.setItem("patientId", data.id);
        }

        setIsLoading(false);
    };

    fetchPatient();
   },[]);

    const Content = () => {
        switch (activeTab) {
            case 'create': return <CreateProfile onSuccess={() => setActiveTab('overview')} />;
            case 'edit': return <EditProfile onSuccess={() => setActiveTab("overview")} />;
            case 'complaint': return <RaiseComplaint onSuccess={() => setActiveTab("overview")} />;
            case 'rate': return <RateStaff onSuccess={() => setActiveTab("overview")} />;
            case 'request': return <ServiceRequest onSuccess={() => setActiveTab("overview")} />;  
            default:
  return (
    <div style={{ color: "black" }}>
      <h1>Welcome to Home Care Services</h1>

      {patient ? (
        <div style={{ marginTop: "20px" }}>
          <h3>Patient Profile</h3>
          <p><strong>Name:</strong> {patient.name}</p>
          <p><strong>Phone:</strong> {patient.phone}</p>
          <p><strong>Email:</strong> {patient.email}</p>
          <p><strong>Date of Birth:</strong> {patient.dob}</p>
          <p><strong>Address:</strong> {patient.address}</p>
        </div>
      ) : (
        <p>No patient profile found. Please create your profile.</p>
      )}
    </div>
  );
  
        }
    };
    return (
        <div className='d-viewport'>
            {isLoading && <LoadingSpinner />}
            <div className="d-container">
            <aside className="d-sidebar">
                <h2 className="d-heading">home care services</h2>
                <nav className='d-nav'>
                    <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Home</button>
                    <hr className='d-divider' />
                    <button className={activeTab === 'create' ? 'active' : ''} onClick={() => setActiveTab('create')}>Create Profile</button>
                    <button className={activeTab === 'edit' ? 'active' : ''} onClick={() => setActiveTab('edit')}>Edit Profile</button>
                    <button className={activeTab === 'request' ? 'active' : ''} onClick={() => setActiveTab('request')}>Service Request</button>
                    <button className={activeTab === 'rate' ? 'active' : ''} onClick={() => setActiveTab('rate')}>Rate Staff</button>
                    <button className={activeTab === 'complaint' ? 'active' : ''} onClick={() => setActiveTab('complaint')}>Raise Complaint</button>
                </nav>
            </aside>
            <main className="d-content">
                {activeTab !== 'overview' && (
                    <button className="d-btn" onClick={() => setActiveTab('overview')}>
                        Back to Dashboard
                    </button>
                )}
                <div className="d-wrapper">
                    {Content()}
                </div>
            </main>
        </div>
        </div>
    );
}
