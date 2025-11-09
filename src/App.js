import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import { getCurrentUser, logout, setCurrentUser } from './services/storage';

function App() {
  const [currentUser, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUser(user);
    }
    setLoading(false);
  }, []);

  // Handle successful login
  const handleLoginSuccess = (user) => {
    setUser(user);
  };

  // Handle onboarding completion
  const handleOnboardingComplete = (onboardingData) => {
    const updatedUser = {
      ...currentUser,
      ...onboardingData
    };
    
    // Update in storage
    setCurrentUser(updatedUser);
    
    // Update state
    setUser(updatedUser);
  };

  // Handle user data updates
  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    setCurrentUser(updatedUser);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setUser(null);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blaizn-orange to-blaizn-red rounded-2xl mb-4 animate-pulse">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Loading BLAIZN...</p>
        </div>
      </div>
    );
  }

  // If not logged in, show auth page
  if (!currentUser) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
  }

  // If logged in but onboarding not complete, show onboarding
  if (!currentUser.onboardingComplete) {
    return (
      <OnboardingPage
        user={currentUser}
        onComplete={handleOnboardingComplete}
      />
    );
  }

  // If logged in and onboarded, show dashboard
  return (
    <DashboardPage
      user={currentUser}
      onLogout={handleLogout}
      onUserUpdate={handleUserUpdate}
    />
  );
}

export default App;

