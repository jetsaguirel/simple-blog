import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import Loading from './components/Loading';
import useDocumentTitle from './hooks/useDocumentTitle';

const AppContent = () => {
  const { loading } = useAuth();
  
  // Hook to manage dynamic document title
  useDocumentTitle();

  if (loading) {
    return <Loading message="Initializing app..." />;
  }

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main>
        <AppRoutes />
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
