import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddEmployee from "./components/admin/AddEmployee";
import CreateProfile from './components/patient/CreateProfile'; // for debugging

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/add-employee" element={<AddEmployee />} />
      <Route path="/cp" element={<CreateProfile />} /> {/* for debogging*/ }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
