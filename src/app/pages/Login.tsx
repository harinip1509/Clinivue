import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Stethoscope, User, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import clinivueLogo from '../../assets/logo.png'; 
import { authenticateUser, setCurrentUser } from '../services/mockAuth';

export function Login() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<'doctor' | 'patient' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    
    if (!selectedRole) {
      setError('Please select a role (Doctor or Patient)');
      return;
    }
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    // Authenticate user
    const authResult = authenticateUser(email, password, selectedRole);

    if (authResult.success && authResult.user) {
      // Store user session
      setCurrentUser(authResult.user);
      // Navigate to appropriate dashboard
      navigate(`/${selectedRole}`);
    } else {
      setError(authResult.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-teal-50/30 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl"
      >
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Branding */}
            <div className="bg-[#14b8a6] p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative z-10 text-center"
              >
                <img src={clinivueLogo} alt="Clinivue" className="w-32 h-32 mx-auto mb-6 drop-shadow-2xl" />
                <h1 className="text-4xl font-bold mb-4">Clinivue</h1>
                <p className="text-lg opacity-90 mb-8">
                  Multimodal Healthcare
                </p>
                <div className="space-y-3 text-left max-w-md">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Advanced Medical Image Analysis</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Explainable AI Diagnostics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Seamless Doctor-Patient Collaboration</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Login Form */}
            <div className="p-12">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-2 text-[#14b8a6]">
                  Welcome Back
                </h2>
                <p className="text-gray-600 mb-8">Sign in to continue to Clinivue</p>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-sm text-red-700"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {error}
                  </motion.div>
                )}

                {/* Role Selection */}
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-3 block">Select Your Role</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedRole('doctor')}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        selectedRole === 'doctor'
                          ? 'border-teal-500 bg-teal-50 shadow-lg'
                          : 'border-gray-200 hover:border-teal-300 bg-white'
                      }`}
                    >
                      <Stethoscope className={`w-8 h-8 mx-auto mb-2 ${
                        selectedRole === 'doctor' ? 'text-teal-600' : 'text-gray-400'
                      }`} />
                      <div className="text-sm font-medium">Doctor</div>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedRole('patient')}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        selectedRole === 'patient'
                          ? 'border-blue-500 bg-blue-50 shadow-lg'
                          : 'border-gray-200 hover:border-blue-300 bg-white'
                      }`}
                    >
                      <User className={`w-8 h-8 mx-auto mb-2 ${
                        selectedRole === 'patient' ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <div className="text-sm font-medium">Patient</div>
                    </motion.button>
                  </div>
                </div>

                {/* Email Input */}
                <div className="mb-4">
                  <Label htmlFor="email" className="text-sm font-medium mb-2 block">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    className="h-12 rounded-xl border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>

                {/* Password Input */}
                <div className="mb-6">
                  <Label htmlFor="password" className="text-sm font-medium mb-2 block">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    className="h-12 rounded-xl border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                  />
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between mb-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-teal-500 focus:ring-teal-500" />
                    <span className="text-sm text-gray-600">Remember me</span>
                  </label>
                  <button className="text-sm text-teal-600 hover:text-teal-700">
                    Forgot password?
                  </button>
                </div>

                {/* Login Button */}
                <Button
                  onClick={handleLogin}
                  disabled={!selectedRole || !email || !password}
                  className="w-full h-12 rounded-xl bg-[#14b8a6] hover:bg-[#0f766e] text-white font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sign In
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-gray-600 mt-6">
                  Don't have an account?{' '}
                  <button 
                    onClick={() => navigate('/signup')}
                    className="text-teal-600 hover:text-teal-700 font-medium"
                  >
                    Sign up
                  </button>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}