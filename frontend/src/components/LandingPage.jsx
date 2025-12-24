import React from 'react';

const LandingPage = ({ onStart }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-6 text-center transition-colors duration-500">
            <div className="max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl p-10 transform transition-all hover:scale-[1.01]">
                <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-6">
                    AI Career Guidance
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    Unsure about your next step after Class 12? <br />
                    Experience a personalized, human-like career counseling session powered by AI.
                </p>

                <div className="space-y-4">
                    <button
                        onClick={onStart}
                        className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xl font-bold rounded-full shadow-lg hover:shadow-2xl hover:brightness-110 transition-all transform hover:-translate-y-1 active:translate-y-0"
                    >
                        Discover the Right Course for You
                    </button>

                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-6 italic">
                        “This tool provides guidance based on your inputs, not a final career decision.”
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
