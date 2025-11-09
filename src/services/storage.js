/**
 * Storage Service
 * Handles all localStorage operations for user data
 */

const STORAGE_KEYS = {
  CURRENT_USER: 'blaizn_current_user',
  USER_PREFIX: 'blaizn_user_',
  USERS_LIST: 'blaizn_users_list'
};

/**
 * Get item from localStorage
 * @param {string} key - Storage key
 * @returns {any} Parsed JSON data or null
 */
export const getItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error('Error reading from storage:', error);
    return null;
  }
};

/**
 * Set item in localStorage
 * @param {string} key - Storage key
 * @param {any} value - Data to store (will be stringified)
 * @returns {boolean} Success status
 */
export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Error writing to storage:', error);
    return false;
  }
};

/**
 * Remove item from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} Success status
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from storage:', error);
    return false;
  }
};

/**
 * Get current logged-in user
 * @returns {object|null} Current user object or null
 */
export const getCurrentUser = () => {
  return getItem(STORAGE_KEYS.CURRENT_USER);
};

/**
 * Set current logged-in user
 * @param {object} user - User object
 * @returns {boolean} Success status
 */
export const setCurrentUser = (user) => {
  return setItem(STORAGE_KEYS.CURRENT_USER, user);
};

/**
 * Logout current user
 * @returns {boolean} Success status
 */
export const logout = () => {
  return removeItem(STORAGE_KEYS.CURRENT_USER);
};

/**
 * Get all registered users
 * @returns {array} Array of user emails
 */
export const getAllUsers = () => {
  return getItem(STORAGE_KEYS.USERS_LIST) || [];
};

/**
 * Check if user exists by email
 * @param {string} email - User email
 * @returns {boolean} True if user exists
 */
export const userExists = (email) => {
  const users = getAllUsers();
  return users.includes(email.toLowerCase());
};

/**
 * Get user data by email
 * @param {string} email - User email
 * @returns {object|null} User data or null
 */
export const getUserByEmail = (email) => {
  const key = `${STORAGE_KEYS.USER_PREFIX}${email.toLowerCase()}`;
  return getItem(key);
};

/**
 * Create new user
 * @param {object} userData - User data object
 * @returns {object} Created user object with success status
 */
export const createUser = (userData) => {
  try {
    const email = userData.email.toLowerCase();
    
    // Check if user already exists
    if (userExists(email)) {
      return { success: false, error: 'User already exists' };
    }
    
    // Create user object
    const newUser = {
      id: `user_${Date.now()}`,
      name: userData.name,
      email: email,
      password: userData.password, // In production, this should be hashed!
      joinDate: new Date().toISOString(),
      onboardingComplete: false,
      subscriptionStatus: 'free',
      selectedTracks: [],
      projects: [],
      progress: {
        track1: { hoursLogged: 0, revenueEarned: 0, tasksCompleted: 0 },
        track2: { hoursLogged: 0, applicationsSubmitted: 0, interviewsScheduled: 0 },
        track3: { hoursLogged: 0, mvpProgress: 0, usersAcquired: 0 }
      },
      dailyTasks: {}
    };
    
    // Save user data
    const userKey = `${STORAGE_KEYS.USER_PREFIX}${email}`;
    setItem(userKey, newUser);
    
    // Add email to users list
    const users = getAllUsers();
    users.push(email);
    setItem(STORAGE_KEYS.USERS_LIST, users);
    
    return { success: true, user: newUser };
    
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, error: 'Failed to create user' };
  }
};

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {object} Login result with user data or error
 */
export const loginUser = (email, password) => {
  try {
    const user = getUserByEmail(email);
    
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    
    if (user.password !== password) {
      return { success: false, error: 'Incorrect password' };
    }
    
    // Set as current user
    setCurrentUser(user);
    
    return { success: true, user };
    
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, error: 'Login failed' };
  }
};

/**
 * Update user data
 * @param {string} email - User email
 * @param {object} updates - Data to update
 * @returns {boolean} Success status
 */
export const updateUser = (email, updates) => {
  try {
    const user = getUserByEmail(email);
    
    if (!user) {
      return false;
    }
    
    const updatedUser = { ...user, ...updates };
    const userKey = `${STORAGE_KEYS.USER_PREFIX}${email.toLowerCase()}`;
    setItem(userKey, updatedUser);
    
    // Update current user if it's the same user
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.email === email) {
      setCurrentUser(updatedUser);
    }
    
    return true;
    
  } catch (error) {
    console.error('Error updating user:', error);
    return false;
  }
};