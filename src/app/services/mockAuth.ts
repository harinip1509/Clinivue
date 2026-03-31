// Mock Authentication Database
// This simulates a backend authentication system

export interface User {
  id: string;
  email: string;
  password: string;
  role: 'doctor' | 'patient';
  name: string;
}

// Load users from localStorage or use defaults
function loadUsers(): User[] {
  const stored = localStorage.getItem('clinivue_users');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return getDefaultUsers();
    }
  }
  return getDefaultUsers();
}

// Get default users
function getDefaultUsers(): User[] {
  return [
    // Doctor accounts
    {
      id: 'doc-1',
      email: 'doctor@clinivue.com',
      password: 'doctor123',
      role: 'doctor',
      name: 'Dr. Sarah Chen',
    },
    {
      id: 'doc-2',
      email: 'dr.smith@clinivue.com',
      password: 'password123',
      role: 'doctor',
      name: 'Dr. John Smith',
    },
    // Patient accounts
    {
      id: 'pat-1',
      email: 'patient@clinivue.com',
      password: 'patient123',
      role: 'patient',
      name: 'Emma Watson',
    },
    {
      id: 'pat-2',
      email: 'john.doe@email.com',
      password: 'password123',
      role: 'patient',
      name: 'John Doe',
    },
  ];
}

// Save users to localStorage
function saveUsers(users: User[]): void {
  localStorage.setItem('clinivue_users', JSON.stringify(users));
}

// Mock user database
let MOCK_USERS: User[] = loadUsers();

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

/**
 * Register a new user
 */
export function registerUser(
  email: string,
  password: string,
  name: string,
  role: 'doctor' | 'patient'
): AuthResult {
  // Validate inputs
  if (!email || !password || !name || !role) {
    return {
      success: false,
      error: 'Please fill in all fields',
    };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      success: false,
      error: 'Please enter a valid email address',
    };
  }

  // Check if user already exists
  const existingUser = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (existingUser) {
    return {
      success: false,
      error: 'An account with this email already exists',
    };
  }

  // Create new user
  const newUser: User = {
    id: `${role}-${Date.now()}`,
    email,
    password,
    name,
    role,
  };

  // Add to database
  MOCK_USERS.push(newUser);
  saveUsers(MOCK_USERS);

  return {
    success: true,
    user: newUser,
  };
}

/**
 * Authenticates a user with email, password, and role
 */
export function authenticateUser(
  email: string,
  password: string,
  role: 'doctor' | 'patient'
): AuthResult {
  // Reload users from localStorage
  MOCK_USERS = loadUsers();

  // Validate inputs
  if (!email || !password || !role) {
    return {
      success: false,
      error: 'Please fill in all fields',
    };
  }

  // Find user by email and role
  const user = MOCK_USERS.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.role === role
  );

  if (!user) {
    return {
      success: false,
      error: 'Invalid email or role. Please check your credentials.',
    };
  }

  // Verify password
  if (user.password !== password) {
    return {
      success: false,
      error: 'Incorrect password. Please try again.',
    };
  }

  // Success
  return {
    success: true,
    user,
  };
}

/**
 * Get current logged-in user from localStorage
 */
export function getCurrentUser(): User | null {
  const userJson = localStorage.getItem('clinivue_user');
  if (userJson) {
    try {
      return JSON.parse(userJson);
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Store user session in localStorage
 */
export function setCurrentUser(user: User): void {
  localStorage.setItem('clinivue_user', JSON.stringify(user));
}

/**
 * Clear user session
 */
export function logout(): void {
  localStorage.removeItem('clinivue_user');
}

/**
 * Get mock users for demo purposes
 */
export function getMockUsers(): User[] {
  return MOCK_USERS;
}