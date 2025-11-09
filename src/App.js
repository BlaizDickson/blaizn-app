import React from 'react';
import { Zap, Rocket, Target } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blaizn-orange to-blaizn-red rounded-2xl mb-6 shadow-xl">
        <Zap className="w-10 h-10 text-white" />
      </div>

      {/* Heading */}
      <h1 className="text-5xl font-bold text-gray-900 mb-3">
        BLAIZN
      </h1>

      {/* Tagline */}
      <p className="text-xl text-gray-600 mb-12">
        Chart Your Path to Success
      </p>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl w-full">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Track Progress</h3>
          <p className="text-sm text-gray-600">
            Monitor your journey across multiple growth tracks
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">AI Coaching</h3>
          <p className="text-sm text-gray-600">
            Get personalized suggestions powered by AI
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Rocket className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Build Wealth</h3>
          <p className="text-sm text-gray-600">
            Turn your skills into sustainable income
          </p>
        </div>
      </div>

      {/* Coming Soon Badge */}
      <div className="mt-12 px-6 py-3 bg-gradient-to-r from-blaizn-orange to-blaizn-red rounded-full">
        <p className="text-white font-semibold">
          🚀 Launching Soon
        </p>
      </div>
    </div>
  );
}

export default App;

