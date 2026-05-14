import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ResultPage from './pages/ResultPage';
import ScanPage from './pages/ScanPage';
import BarcodePage from './pages/BarcodePage';
import RecallPage from './pages/RecallPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"        element={<LandingPage />} />
        <Route path="/home"    element={<HomePage />} />
        <Route path="/result"  element={<ResultPage />} />
        <Route path="/scan"    element={<ScanPage />} />
        <Route path="/barcode" element={<BarcodePage />} />
        <Route path="/recall"  element={<RecallPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*"        element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
