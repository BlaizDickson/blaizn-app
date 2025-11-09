import React, { useState, useEffect } from 'react';
import {
  Zap, DollarSign, Briefcase, Rocket, CheckCircle2,
  Target, TrendingUp, Calendar, Award, LogOut
} from 'lucide-react';
import { Button, Card } from '../components';
import { updateUser, logout } from '../services/storage';
import { getAISuggestion, getDefaultDailyTasks, calculateStreak } from '../services/aiService';

/**
 * Main Dashboard Page
 */
function DashboardPage({ user, onLogout, onUserUpdate }) {
  const [dailyTasks, setDailyTasks] = useState([]);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [streak, setStreak] = useState(0);

  // Load daily tasks and AI suggestion on mount
  useEffect(() => {
    loadDailyTasks();
    generateAISuggestion();
    calculateCurrentStreak();
  }, []);

  // Load or create today's tasks
  const loadDailyTasks = () => {
    const today = new Date().toDateString();
    
    if (user.dailyTasks && user.dailyTasks[today]) {
      setDailyTasks(user.dailyTasks[today]);
    } else {
      const defaultTasks = getDefaultDailyTasks(user.selectedTracks);
      setDailyTasks(defaultTasks);
    }
  };

  // Generate AI suggestion
  const generateAISuggestion = () => {
    const suggestion = getAISuggestion(user);
    setAiSuggestion(suggestion);
  };

  // Calculate current streak
  const calculateCurrentStreak = () => {
    const currentStreak = calculateStreak(user.dailyTasks || {});
    setStreak(currentStreak);
  };

  // Toggle task completion
  const toggleTask = async (taskId) => {
    const updatedTasks = dailyTasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setDailyTasks(updatedTasks);

    // Save to storage
    const today = new Date().toDateString();
    const updatedDailyTasks = {
      ...user.dailyTasks,
      [today]: updatedTasks
    };

    const success = updateUser(user.email, { dailyTasks: updatedDailyTasks });
    
    if (success) {
      onUserUpdate({ ...user, dailyTasks: updatedDailyTasks });
      calculateCurrentStreak();
    }
  };

  // Calculate progress percentage
  const completedTasks = dailyTasks.filter(t => t.completed).length;
  const progressPercentage = dailyTasks.length > 0 
    ? (completedTasks / dailyTasks.length) * 100 
    : 0;

  // Get track info
  const trackInfo = {
    1: { name: 'Immediate Income', icon: DollarSign, color: 'green' },
    2: { name: 'Remote Job', icon: Briefcase, color: 'blue' },
    3: { name: 'Wealth Asset', icon: Rocket, color: 'purple' }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blaizn-orange to-blaizn-red rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">BLAIZN</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 hidden sm:inline">
                {user.name}
              </span>
              <Button variant="outline" size="sm" onClick={onLogout}>
                <LogOut className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Suggestion Banner */}
        {aiSuggestion && (
          <div className="bg-gradient-to-r from-blaizn-orange to-blaizn-red rounded-2xl p-6 mb-8 text-white">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white/20 rounded-xl flex-shrink-0">
                <Zap className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">🤖 AI Suggestion for Today</h3>
                <p className="text-white/95 mb-3">{aiSuggestion.task}</p>
                <p className="text-sm text-white/80 italic">💡 {aiSuggestion.motivation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Progress Overview Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {user.selectedTracks.map(trackId => {
            const track = trackInfo[trackId];
            const Icon = track.icon;
            const progress = user.progress[`track${trackId}`];

            return (
              <Card key={trackId} hover>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 bg-${track.color}-100 rounded-lg`}>
                    <Icon className={`w-6 h-6 text-${track.color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Track {trackId}</h3>
                    <p className="text-sm text-gray-500">{track.name}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {trackId === 1 && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Revenue</span>
                        <span className="font-semibold">₦{progress.revenueEarned.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Hours Logged</span>
                        <span className="font-semibold">{progress.hoursLogged}h</span>
                      </div>
                    </>
                  )}
                  {trackId === 2 && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Applications</span>
                        <span className="font-semibold">{progress.applicationsSubmitted}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Interviews</span>
                        <span className="font-semibold">{progress.interviewsScheduled}</span>
                      </div>
                    </>
                  )}
                  {trackId === 3 && (
                    <>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">MVP Progress</span>
                        <span className="font-semibold">{progress.mvpProgress}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Users</span>
                        <span className="font-semibold">{progress.usersAcquired}</span>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Daily Tasks */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Today's Tasks</h2>
                <div className="text-sm font-medium text-gray-600">
                  {completedTasks}/{dailyTasks.length} Complete
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blaizn-orange to-blaizn-red h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Task List */}
              <div className="space-y-3">
                {dailyTasks.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition ${
                      task.completed
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        task.completed
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300'
                      }`}>
                        {task.completed && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>
                      <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {task.text}
                      </span>
                      {task.track !== 'all' && (
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                          Track {task.track}
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-6">
            {/* Week Overview */}
            <Card className="p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blaizn-orange" />
                Week {user.currentWeek}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tasks Completed</span>
                  <span className="font-semibold text-gray-900">{completedTasks}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Streak</span>
                  <span className="font-semibold text-blaizn-orange flex items-center gap-1">
                    🔥 {streak} days
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="font-semibold text-gray-900">{Math.round(progressPercentage)}%</span>
                </div>
              </div>
            </Card>

            {/* Motivation Card */}
            <Card className="p-6 bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-6 h-6" />
                <h3 className="font-bold">Keep Going!</h3>
              </div>
              <p className="text-sm text-white/90 mb-4">
                You're making excellent progress. Consistency is key to success!
              </p>
              <div className="bg-white/20 rounded-lg p-3">
                <p className="text-xs text-white/80">
                  <strong>Your Goal:</strong><br />
                  {user.userGoal}
                </p>
              </div>
            </Card>

            {/* Quick Action */}
            <Button variant="primary" className="w-full">
              <Target className="w-4 h-4 mr-2" />
              Update Progress
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;