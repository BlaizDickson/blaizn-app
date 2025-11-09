import React, { useState, useEffect } from 'react';
import { Zap, Rocket, Target } from 'lucide-react';
import { Card, Button } from './components';
import AuthPage from './pages/AuthPage';
import { getCurrentUser, logout } from './services/storage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  // Handle successful login
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setCurrentUser(null);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blaizn-orange to-blaizn-red rounded-2xl mb-4 animate-pulse">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not logged in, show auth page
  if (!currentUser) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  // If logged in, show dashboard (temporary - we'll build this next)
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex justify-between items-center bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blaizn-orange to-blaizn-red rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">BLAIZN</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Welcome, {currentUser.name}!</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Placeholder */}
      <div className="max-w-7xl mx-auto">
        <Card>
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blaizn-orange to-blaizn-red rounded-2xl mb-6">
              <Rocket className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Welcome to BLAIZN, {currentUser.name}! 🎉
            </h2>
            <p className="text-gray-600 mb-8">
              Your dashboard is being built. Coming soon!
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="primary">Start Onboarding</Button>
              <Button variant="outline">View Profile</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;

