import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Loading from './components/Loading';

const AppContent = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loading message="Initializing app..." />;
  }

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes here as needed */}
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App
