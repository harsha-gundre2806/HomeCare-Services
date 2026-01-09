import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddEmp from './ItAdmin/AddEmp';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddEmp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
