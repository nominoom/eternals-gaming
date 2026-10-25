import React from 'react';
import { useApp } from './context/AppContext';
import { ClerkAuthProvider } from './services/clerkAuth';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Modals from './components/Modals';
import ToastContainer from './components/ToastContainer';

// Pages
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import TournamentsPage from './pages/TournamentsPage';
import MediaPage from './pages/MediaPage';
import MerchPage from './pages/MerchPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import MatchResultsPage from './pages/MatchResultsPage';
import SignInPage from './pages/SignInPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import TeamDashboardPage from './pages/TeamDashboardPage';
import TournamentAdminPage from './pages/TournamentAdminPage';
import TournamentsDashboardPage from './pages/TournamentsDashboardPage';

export default function App() {
  const { route } = useApp();

  const renderCurrentPage = () => {
    // Operational & Dashboard Portals
    if (route.startsWith('/team-dashboard')) return <TeamDashboardPage />;
    if (route.startsWith('/tournament-admin')) return <TournamentAdminPage />;
    if (route.startsWith('/tournaments-dashboard')) return <TournamentsDashboardPage />;

    // General Organization Routes
    if (route === '/' || route === '') return <HomePage />;
    if (route.startsWith('/team')) return <TeamPage />;
    if (route.startsWith('/tournaments') || route.startsWith('/tournament')) return <TournamentsPage />;
    if (route.startsWith('/media')) return <MediaPage />;
    if (route.startsWith('/merch')) return <MerchPage />;
    if (route.startsWith('/about')) return <AboutPage />;
    if (route.startsWith('/contact')) return <ContactPage />;
    if (route.startsWith('/match-results')) return <MatchResultsPage />;
    if (route.startsWith('/signin')) return <SignInPage />;
    if (route.startsWith('/profile')) return <ProfilePage />;
    if (route.startsWith('/admin')) return <AdminDashboardPage />;

    return <HomePage />;
  };

  return (
    <ClerkAuthProvider>
      <div className="min-h-screen bg-black text-white flex flex-col font-paragraph selection:bg-[#00FFDF] selection:text-black">
        <Navbar />
        <main className="flex-1">
          {renderCurrentPage()}
        </main>
        <Footer />
        
        {/* Global Drawers & Modals */}
        <CartDrawer />
        <Modals />
        <ToastContainer />
      </div>
    </ClerkAuthProvider>
  );
}
