import React, { useState } from 'react';
import { Zap, DollarSign, Briefcase, Rocket, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button, Card } from '../components';

/**
 * Onboarding Page - Track Selection & Goal Setting
 */
function OnboardingPage({ user, onComplete }) {
  const [step, setStep] = useState(1);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [userGoal, setUserGoal] = useState('');

  const TOTAL_STEPS = 2;

  // Track options
  const tracks = [
    {
      id: 1,
      icon: DollarSign,
      title: 'Track 1: Immediate Income',
      description: 'Local projects, freelancing, quick revenue generation',
      color: 'green',
      benefits: ['Quick money', 'Local clients', 'Build portfolio']
    },
    {
      id: 2,
      icon: Briefcase,
      title: 'Track 2: Remote/International Job',
      description: 'Build portfolio, apply globally, land high-paying roles',
      color: 'blue',
      benefits: ['$2k-5k/month', 'Work remotely', 'Global opportunities']
    },
    {
      id: 3,
      icon: Rocket,
      title: 'Track 3: Wealth-Building Asset',
      description: 'Build SaaS, create products, generate scalable income',
      color: 'purple',
      benefits: ['Passive income', 'Build equity', 'Scale infinitely']
    }
  ];

  // Toggle track selection
  const toggleTrack = (trackId) => {
    setSelectedTracks(prev =>
      prev.includes(trackId)
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    );
  };

  // Go to next step
  const handleNext = () => {
    if (step === 1 && selectedTracks.length === 0) {
      alert('Please select at least one track');
      return;
    }
    setStep(step + 1);
  };

  // Go to previous step
  const handleBack = () => {
    setStep(step - 1);
  };

  // Complete onboarding
  const handleComplete = () => {
    if (!userGoal.trim()) {
      alert('Please enter your primary goal');
      return;
    }

    onComplete({
      selectedTracks,
      userGoal,
      onboardingComplete: true,
      currentWeek: 1
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 p-4">
      <div className="max-w-3xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blaizn-orange to-blaizn-red rounded-2xl mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to BLAIZN, {user.name}! 🚀
          </h1>
          <p className="text-gray-600">Let's set up your success journey</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {step} of {TOTAL_STEPS}
            </span>
            <span className="text-sm font-medium text-blaizn-orange">
              {Math.round((step / TOTAL_STEPS) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blaizn-orange to-blaizn-red h-3 rounded-full transition-all duration-500"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Track Selection */}
        {step === 1 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Select Your Growth Tracks
            </h2>
            <p className="text-gray-600 mb-6">
              Choose the paths you want to focus on. You can select multiple tracks and adjust later.
            </p>

            <div className="space-y-4 mb-8">
              {tracks.map((track) => {
                const Icon = track.icon;
                const isSelected = selectedTracks.includes(track.id);

                return (
                  <button
                    key={track.id}
                    onClick={() => toggleTrack(track.id)}
                    className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-blaizn-orange bg-orange-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${
                        isSelected ? 'bg-gradient-to-br from-blaizn-orange to-blaizn-red' : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{track.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{track.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {track.benefits.map((benefit, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 rounded-full bg-white border border-gray-200 text-gray-700"
                            >
                              ✓ {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between">
              <div></div>
              <Button
                variant="primary"
                size="lg"
                onClick={handleNext}
                disabled={selectedTracks.length === 0}
              >
                Continue <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Card>
        )}

        {/* Step 2: Goal Setting */}
        {step === 2 && (
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              What's Your Primary Goal?
            </h2>
            <p className="text-gray-600 mb-6">
              Help us personalize your journey and AI suggestions. Be specific!
            </p>

            <textarea
              value={userGoal}
              onChange={(e) => setUserGoal(e.target.value)}
              placeholder="Example: 'Land a $3,000/month remote role within 6 months' or 'Build a SaaS generating ₦500k/month by year end'"
              className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blaizn-orange focus:border-transparent resize-none mb-6"
            />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Tips for a good goal:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Be specific with numbers and timeframes</li>
                <li>• Make it challenging but achievable</li>
                <li>• Focus on what matters most to you</li>
                <li>• You can update this anytime</li>
              </ul>
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                size="lg"
                onClick={handleBack}
              >
                <ArrowLeft className="w-5 h-5 mr-2" /> Back
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={handleComplete}
                disabled={!userGoal.trim()}
              >
                Start My Journey 🚀
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default OnboardingPage;