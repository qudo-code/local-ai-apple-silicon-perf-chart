'use client';

import { useState } from 'react';
import { Lexend } from 'next/font/google';
import { signIn } from 'next-auth/react';

const lexend = Lexend({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export default function AuthCard() {
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        // signIn will automatically redirect to the Google OAuth page
        await signIn("google", { callbackUrl: "/" });
    };

    return (
        <div className="w-full max-w-md mx-auto">
            {/* Clean Swiss Minimalist Card Container */}
            <div className="relative flex flex-col p-8 sm:p-10 bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">

                <div className="z-10 w-full mb-8 text-center space-y-3">
                    <h1 className={`${lexend.className} text-3xl font-semibold tracking-tight text-slate-900`}>
                        Sign In
                    </h1>
                    <p className="text-sm font-normal text-slate-500">
                        Access your research dashboard
                    </p>
                </div>

                <div className="z-10 w-full space-y-4">
                    {/* Google Button */}
                    <button
                        onClick={handleLogin}
                        disabled={isLoading}
                        className="group relative flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                    >
                        {isLoading ? (
                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
                        ) : (
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"
                                />
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"
                                />
                            </svg>
                        )}
                        Continue with Google
                    </button>
                </div>

                <div className="z-10 mt-6 pt-6 w-full text-center">
                    <p className="text-xs text-slate-500">
                        By continuing, you agree to our{' '}
                        <a href="#" className="font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
