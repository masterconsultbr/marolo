import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Players from './pages/Players';
import Payments from './pages/Payments';
import Games from './pages/Games';
import Attendance from './pages/Attendance';
import Cash from './pages/Cash';
import Stats from './pages/Stats';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Navbar />
        <main className="flex-1 p-4 md:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/players" element={<Players />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/games" element={<Games />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/cash" element={<Cash />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;