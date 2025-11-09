/**
 * AI Service - Generates personalized suggestions
 */

/**
 * Get AI suggestion based on user progress and selected tracks
 * @param {object} user - User object with progress data
 * @param {number} trackId - Specific track to get suggestion for (optional)
 * @returns {object} Suggestion with task and motivation
 */
export const getAISuggestion = (user, trackId = null) => {
  const suggestions = {
    1: [
      "Reach out to 3 local solar companies with your portfolio today",
      "Complete the electrical calculator project by end of week",
      "Post your latest project on LinkedIn with #NigerianTech",
      "Schedule 2 client calls for tomorrow morning",
      "Update your service pricing based on market research",
      "Create a professional invoice template for clients",
      "Join 2 Nigerian business WhatsApp groups to find clients",
      "Build a simple website showcase for potential clients"
    ],
    2: [
      "Apply to 5 remote positions on Wellfound/RemoteOK today",
      "Enhance your GitHub profile with detailed README files",
      "Spend 2 hours learning TypeScript fundamentals",
      "Connect with 10 Nigerian remote developers on LinkedIn",
      "Complete one coding challenge and add to portfolio",
      "Update your LinkedIn headline to 'Open to Remote Opportunities'",
      "Contribute to an open-source project on GitHub",
      "Practice system design for interview preparation"
    ],
    3: [
      "Interview 3 potential customers about their pain points",
      "Build your MVP's core feature: user authentication",
      "Research pricing for similar SaaS in Nigerian market",
      "Write a Twitter thread about your building journey",
      "Design the landing page for your SaaS product",
      "Set up analytics to track user behavior",
      "Create a waitlist signup form and share it",
      "Document your API for future developers"
    ]
  };

  const motivational = [
    `You're ${Math.floor(Math.random() * 30 + 20)}% ahead of where most people are at this stage. Keep pushing!`,
    "Your unique background is your competitive advantage. Use it!",
    "Small daily wins compound into massive success. You're on track.",
    "Every successful founder started exactly where you are now.",
    "Your future self will thank you for the work you're putting in today.",
    "Consistency beats intensity. Show up every day, even for 30 minutes.",
    "The Nigerian tech ecosystem needs builders like you. Keep going!",
    "Your breakthrough is closer than you think. Don't stop now."
  ];

  // Get random track or use specified track
  const selectedTrack = trackId || user.selectedTracks[Math.floor(Math.random() * user.selectedTracks.length)];
  
  // Get random suggestion for that track
  const trackSuggestions = suggestions[selectedTrack];
  const randomSuggestion = trackSuggestions[Math.floor(Math.random() * trackSuggestions.length)];
  
  // Get random motivation
  const randomMotivation = motivational[Math.floor(Math.random() * motivational.length)];

  return {
    task: randomSuggestion,
    motivation: randomMotivation,
    trackId: selectedTrack
  };
};

/**
 * Get default daily tasks based on selected tracks
 * @param {array} selectedTracks - Array of track IDs user selected
 * @returns {array} Array of task objects
 */
export const getDefaultDailyTasks = (selectedTracks) => {
  const allTasks = [
    { id: 1, text: 'Review your goals and plan your day', completed: false, track: 'all' },
    { id: 2, text: 'Work on portfolio project (1-2 hours)', completed: false, track: 1 },
    { id: 3, text: 'Contact 2 potential local clients', completed: false, track: 1 },
    { id: 4, text: 'Apply to 3 remote job positions', completed: false, track: 2 },
    { id: 5, text: 'Update LinkedIn profile and engage with posts', completed: false, track: 2 },
    { id: 6, text: 'Build one feature for your SaaS MVP', completed: false, track: 3 },
    { id: 7, text: 'Research and validate your product idea', completed: false, track: 3 },
    { id: 8, text: 'Learn something new (30 min tutorial/course)', completed: false, track: 'all' },
    { id: 9, text: 'Network: Connect with 2 people in your field', completed: false, track: 'all' }
  ];

  // Filter tasks based on selected tracks
  return allTasks.filter(task => 
    task.track === 'all' || selectedTracks.includes(task.track)
  );
};

/**
 * Calculate streak based on task completion history
 * @param {object} dailyTasks - Object with dates as keys and task arrays as values
 * @returns {number} Current streak in days
 */
export const calculateStreak = (dailyTasks) => {
  if (!dailyTasks || Object.keys(dailyTasks).length === 0) {
    return 0;
  }

  const dates = Object.keys(dailyTasks).sort((a, b) => new Date(b) - new Date(a));
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  for (const dateStr of dates) {
    const taskDate = new Date(dateStr);
    taskDate.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor((currentDate - taskDate) / (1000 * 60 * 60 * 24));

    if (daysDiff === streak) {
      const tasks = dailyTasks[dateStr];
      const completedTasks = tasks.filter(t => t.completed).length;
      
      // Count as active day if at least 50% tasks completed
      if (completedTasks >= tasks.length / 2) {
        streak++;
      } else {
        break;
      }
    } else {
      break;
    }
  }

  return streak;
};