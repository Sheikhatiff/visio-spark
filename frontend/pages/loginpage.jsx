import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EnhancedLoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    // Password strength calculator
    useEffect(() => {
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (/[A-Z]/.test(password)) strength += 25;
        if (/[0-9]/.test(password)) strength += 25;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25;
        setPasswordStrength(strength);
    }, [password]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);

        // Success animation would trigger here
        console.log('Login successful!');
    };

    const getStrengthColor = () => {
        if (passwordStrength < 50) return 'bg-red-500';
        if (passwordStrength < 75) return 'bg-amber-500';
        return 'bg-green-500';
    };

    return (
        <div className="h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
            <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap');
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-5px) rotate(3deg); }
        }
        
        .floating-shape {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-20 h-20 bg-amber-900 rounded-full opacity-15 floating-shape"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 bg-orange-900 rounded-full opacity-15 floating-shape" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-yellow-900 rounded-full opacity-15 floating-shape" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="w-full max-w-sm space-y-6 relative z-10">
                {/* Header with Logo - Compact */}
                <div className="text-center">
                    <div className="mx-auto w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-3 shadow-lg border border-amber-400/30">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
                    <p className="text-gray-400 text-sm">Sign in to continue</p>
                </div>

                {/* Login Form - Compact */}
                <form onSubmit={handleLogin} className="space-y-4 bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 border border-gray-700 shadow-xl">

                    {/* Email Field */}
                    <div className="relative">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-3 text-sm bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:bg-gray-600/50 transition-all duration-300"
                            placeholder="Email Address"
                            autoComplete="email"
                        />
                    </div>

                    {/* Password Field with Strength Meter */}
                    <div className="space-y-2">
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-3 pr-10 text-sm bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:bg-gray-600/50 transition-all duration-300"
                                placeholder="Password"
                                autoComplete="current-password"
                            />

                            {/* Password Toggle SVG */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400 transition-colors p-1"
                            >
                                {showPassword ? (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                ) : (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        {/* Password Strength Meter */}
                        {password && (
                            <div className="space-y-1">
                                <div className="w-full bg-gray-700 rounded-full h-1.5">
                                    <div
                                        className={`h-1.5 rounded-full transition-all duration-500 ${getStrengthColor()}`}
                                        style={{ width: `${passwordStrength}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>Weak</span>
                                    <span>Medium</span>
                                    <span>Strong</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="sr-only"
                                />
                                <div className={`w-4 h-4 border-2 rounded transition-all duration-200 ${rememberMe
                                    ? 'bg-amber-500 border-amber-500'
                                    : 'bg-gray-700 border-gray-500'
                                    }`}>
                                    {rememberMe && (
                                        <svg className="absolute top-0 left-0 w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <span className="text-gray-300 text-sm">Remember me</span>
                        </label>

                        <button
                            type="button"
                            className="text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors duration-200 hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>

                    {/* Sign In Button with Loading State */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-amber-500/30 ${isLoading
                            ? 'bg-gradient-to-r from-amber-600 to-orange-600 opacity-80 cursor-not-allowed'
                            : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-amber-500/20'
                            }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center space-x-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-sm">Signing in...</span>
                            </div>
                        ) : (
                            <span className="text-sm">Sign In</span>
                        )}
                    </button>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-800/90 text-gray-400 text-xs">OR CONTINUE WITH</span>
                        </div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            type="button"
                            className="group w-full bg-gray-700 text-gray-300 py-2 px-3 rounded-lg font-medium border border-gray-600 hover:border-amber-500 hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-500/30 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-[0.98] text-sm"
                        >
                            <div className="w-4 h-4 group-hover:scale-110 transition-transform">
                                <svg viewBox="0 0 24 24" fill="currentColor" className="text-gray-400 group-hover:text-amber-400">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                            </div>
                            <span>Google</span>
                        </button>

                        <button
                            type="button"
                            className="group w-full bg-gray-700 text-gray-300 py-2 px-3 rounded-lg font-medium border border-gray-600 hover:border-amber-500 hover:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-amber-500/30 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-[0.98] text-sm"
                        >
                            <div className="w-4 h-4 group-hover:scale-110 transition-transform">
                                <svg fill="currentColor" viewBox="0 0 24 24" className="text-gray-400 group-hover:text-amber-400">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                            </div>
                            <span>GitHub</span>
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center pt-2">
                        <p className="text-gray-400 text-sm">
                            Don't have an account?{" "}
                            <button
                                type="button"
                                onClick={() => navigate('/signup')} // 3. Add this onClick handler
                                className="text-amber-400 hover:text-amber-300 font-medium transition-colors duration-200 hover:underline"
                            >
                                Sign up now
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EnhancedLoginPage;