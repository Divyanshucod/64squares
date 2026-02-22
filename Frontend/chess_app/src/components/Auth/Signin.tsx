import { useState } from 'react';
import Button from '../UI/Button';

function SigninPage(){
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        rating: '1200'
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        console.log('Sign up:', formData);
    };

    return (
        <div className="w-full logSig-section min-h-screen flex items-center justify-center md:justify-end px-4 md:px-12 py-8">
            <div className="logSig-container w-full md:w-[45%] lg:max-w-xl h-170 overflow-y-auto">
                <div className="glassmorphic p-8 md:p-10 rounded-2xl glow-effect">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-chess-light mb-2">
                            Join 64Squares
                        </h1>
                        <p className="text-chess-text/70 text-sm md:text-base">
                            Create your account and start playing
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Full Name Field */}
                        <div>
                            <label htmlFor="fullName" className="block text-chess-light font-medium mb-2 text-sm">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="input-field w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-300"
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-chess-light font-medium mb-2 text-sm">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="input-field w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-300"
                                required
                            />
                        </div>

                        {/* Initial Rating */}
                        <div>
                            <label htmlFor="rating" className="block text-chess-light font-medium mb-2 text-sm">
                                Skill Level
                            </label>
                            <select
                                id="rating"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                className="input-field w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-300 cursor-pointer"
                            >
                                <option value="1000">Beginner (1000)</option>
                                <option value="1200">Intermediate (1200)</option>
                                <option value="1400">Advanced (1400)</option>
                                <option value="1600">Expert (1600)</option>
                            </select>
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
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
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

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-chess-light font-medium mb-2 text-sm">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="input-field w-full px-4 py-3 rounded-lg focus:outline-none transition-all duration-300 pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-chess-text/70 hover:text-chess-light transition-colors"
                                >
                                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                        </div>
                        {/* Sign Up Button */}
                        <div className='w-full justify-center items-center'>
                          <Button>Create Account</Button>
                        </div>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-chess-border/20 mb-8"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-linear-to-b from-chess-dark to-chess-gray text-chess-text/60">
                                Or sign up with
                            </span>
                        </div>
                    </div>

                    {/* Social Sign Up */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="glassmorphic-light py-3 rounded-lg text-chess-light font-medium hover:bg-opacity-100 transition-all duration-300 border border-chess-border/30 hover:border-chess-border/80">
                            Google
                        </button>
                        <button className="glassmorphic-light py-3 rounded-lg text-chess-light font-medium hover:bg-opacity-100 transition-all duration-300 border border-chess-border/30 hover:border-chess-border/80">
                            GitHub
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="text-center mt-8">
                        <p className="text-chess-text/70 text-sm">
                            Already have an account?{' '}
                            <a href="/login" className="text-chess-light font-semibold hover:underline transition-colors">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SigninPage;