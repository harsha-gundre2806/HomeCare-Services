// Main patient overview showing request status and assigned staff
// need to add home to it


import { useState } from 'react';
import '../styles/Dashboard.css'; 


import CreateProfile from '../components/patient/CreateProfile';
import EditProfile from '../components/patient/EditProfile';
import RaiseComplaint from '../components/patient/RaiseComplaint';
import RateStaff from '../components/patient/RateStaff';
import ServiceRequest from '../components/patient/ServiceRequest';

export default function PatientDashboard() {
    const [activeTab, setActiveTab] = useState('overview');

    const Content = () => {
        switch (activeTab) {
            case 'create': return <CreateProfile />;
            case 'edit': return <EditProfile />;
            case 'complaint': return <RaiseComplaint />;
            case 'rate': return <RateStaff />;
            case 'request': return <ServiceRequest />;  
            default: return (
            <div style={{textAlign: 'center', color:'black' , marginTop: '50px'}}>
                <h1>welcome to home care services</h1>
                <p>select option from sidebar</p>
            </div>
        );   
        }
    };
    return (
        <div className='d-viewport'>
            <div className="d-container">
            <aside className="d-sidebar">
                <h2 className="d-heading">home care services</h2>
                <nav className='d-nav'>
                    <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>Home</button>
                    <hr className='divider' />
                    <button className={activeTab === 'create' ? 'active' : ''} onClick={() => setActiveTab('create')}>Create Profile</button>
                    <button className={activeTab === 'edit' ? 'active' : ''} onClick={() => setActiveTab('edit')}>Edit Profile</button>
                    <button className={activeTab === 'request' ? 'active' : ''} onClick={() => setActiveTab('request')}>Service Request</button>
                    <button className={activeTab === 'rate' ? 'active' : ''} onClick={() => setActiveTab('rate')}>Rate Staff</button>
                    <button className={activeTab === 'complaint' ? 'active' : ''} onClick={() => setActiveTab('complaint')}>Raise Complaint</button>
                </nav>
            </aside>
            <main className="d-content">
                {activeTab !== 'overview' && (
                    <button className="btn" onClick={() => setActiveTab('overview')}>
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
