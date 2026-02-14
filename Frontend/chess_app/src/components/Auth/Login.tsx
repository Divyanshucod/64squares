import { useState } from 'react';
import Button from '../UI/Button';

function LoginPage(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login:', { email, password });
    };

    return (
        <div className="w-full logSig-section min-h-screen flex items-center justify-center md:justify-end px-4 md:px-12 py-8">
            <div className="logSig-container w-full md:w-[45%] lg:max-w-xl">
                <div className="glassmorphic p-8 md:p-10 rounded-2xl glow-effect">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-chess-light mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-chess-text/70 text-sm md:text-base">
                            Sign in to continue to 64Squares
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-chess-light font-medium mb-2 text-sm">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="input-field w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-300"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-chess-light font-medium mb-2 text-sm">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="input-field w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-300 pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-chess-text/70 hover:text-chess-light transition-colors"
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-chess-border/50 bg-chess-dark/50 accent-chess-light cursor-pointer"
                                />
                                <span className="text-chess-text/70 hover:text-chess-text transition-colors">
                                    Remember me
                                </span>
                            </label>
                            <a href="#" className="text-chess-text/70 hover:text-chess-light transition-colors relative group">
                                Forgot password?
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-chess-text to-chess-light group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </div>

                        {/* Login Button */}
                        <Button> Sign in</Button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-chess-border/20 mb-8"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-linear-to-b from-chess-dark to-chess-gray text-chess-text/60">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="glassmorphic-light py-3 rounded-lg text-chess-light font-medium hover:bg-opacity-100 transition-all duration-300 border border-chess-border/30 hover:border-chess-border/80">
                            Google
                        </button>
                        <button className="glassmorphic-light py-3 rounded-lg text-chess-light font-medium hover:bg-opacity-100 transition-all duration-300 border border-chess-border/30 hover:border-chess-border/80">
                            GitHub
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center mt-8">
                        <p className="text-chess-text/70 text-sm">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-chess-light font-semibold hover:underline transition-colors">
                                Sign up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;