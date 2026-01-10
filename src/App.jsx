import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddEmployee from "./components/admin/AddEmployee";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/add-employee" element={<AddEmployee />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
