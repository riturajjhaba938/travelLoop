import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import MyTripsPage from './pages/MyTripsPage';
import CreateTripPage from './pages/CreateTripPage';
import BuildItineraryPage from './pages/BuildItineraryPage';
import ItineraryViewPage from './pages/ItineraryViewPage';
import SearchPage from './pages/SearchPage';
import ProfilePage from './pages/ProfilePage';
import ChecklistPage from './pages/ChecklistPage';
import NotesPage from './pages/NotesPage';
import CommunityPage from './pages/CommunityPage';
import BudgetPage from './pages/BudgetPage';
import SharedItineraryPage from './pages/SharedItineraryPage';

const NO_LAYOUT_PATHS = ['/login', '/register', '/'];

function Shell({ children }) {
  const { pathname } = useLocation();
  const hideLayout = NO_LAYOUT_PATHS.includes(pathname);
  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh' }}>
      {!hideLayout && <Navbar />}
      <div style={{ flex: 1 }}>{children}</div>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Shell>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/trips" element={<ProtectedRoute><MyTripsPage /></ProtectedRoute>} />
            <Route path="/trips/new" element={<ProtectedRoute><CreateTripPage /></ProtectedRoute>} />
            <Route path="/trips/:id/build" element={<ProtectedRoute><BuildItineraryPage /></ProtectedRoute>} />
            <Route path="/trips/:id" element={<ProtectedRoute><ItineraryViewPage /></ProtectedRoute>} />
            <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/checklist" element={<ProtectedRoute><ChecklistPage /></ProtectedRoute>} />
            <Route path="/notes" element={<ProtectedRoute><NotesPage /></ProtectedRoute>} />
            <Route path="/community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
            <Route path="/budget" element={<ProtectedRoute><BudgetPage /></ProtectedRoute>} />
            <Route path="/share/:id" element={<SharedItineraryPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Shell>
        <Toaster position="top-right" toastOptions={{
          style: { fontFamily:'Be Vietnam Pro', borderRadius:'8px', fontSize:'14px' },
          success: { iconTheme: { primary:'#006a62', secondary:'#fff' } },
        }} />
      </BrowserRouter>
    </AuthProvider>
  );
}
