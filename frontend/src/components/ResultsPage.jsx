
import React from 'react';

const ResultsPage = ({ results, onReset }) => {
    if (!results) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                        Your Career Analysis
                    </h1>
                    <p className="mt-4 text-lg text-red-600 dark:text-red-400 font-medium bg-red-50 dark:bg-red-900/20 inline-block px-4 py-1 rounded-full">
                        Experimental AI Guidance
                    </p>
                </div>

                {/* Traits Section - Expanded */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl overflow-hidden transition-colors">
                    <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900">
                        <h3 className="text-xl font-semibold text-white">
                            Your Profile Snapshot
                        </h3>
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                        <div>
                            <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Key Interests</h4>
                            <div className="flex flex-wrap gap-2">
                                {Array.isArray(results.extracted_traits.interests)
                                    ? results.extracted_traits.interests.map((t, i) => <span key={i} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-md border border-blue-100 dark:border-blue-800">{t}</span>)
                                    : <p className="text-gray-700 dark:text-gray-300">{results.extracted_traits.interests}</p>
                                }
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Top Strengths</h4>
                            <div className="flex flex-wrap gap-2">
                                {Array.isArray(results.extracted_traits.strengths)
                                    ? results.extracted_traits.strengths.map((t, i) => <span key={i} className="px-2 py-1 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm rounded-md border border-green-100 dark:border-green-800">{t}</span>)
                                    : <p className="text-gray-700 dark:text-gray-300">{results.extracted_traits.strengths}</p>
                                }
                            </div>
                        </div>
                        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t dark:border-gray-700 pt-4 mt-2">
                            <div>
                                <span className="block text-xs text-gray-400 uppercase">Learning Style</span>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">{results.extracted_traits.learning_style || "N/A"}</span>
                            </div>
                            <div>
                                <span className="block text-xs text-gray-400 uppercase">Risk Tolerance</span>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">{results.extracted_traits.risk_tolerance || "N/A"}</span>
                            </div>
                            <div>
                                <span className="block text-xs text-gray-400 uppercase">Work Preference</span>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">{results.extracted_traits.work_preference || "N/A"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Top Matches */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Top Recommended Courses</h3>
                    {results.top_course_matches.map((match, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all hover:shadow-xl">
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{match.course_name}</h3>
                                        <span className={`inline - block mt - 1 px - 3 py - 1 text - xs font - bold rounded - full ${match.fit_score >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200' :
                                            match.fit_score >= 80 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200'
                                            } `}>
                                            {match.fit_label}
                                        </span>
                                    </div>
                                    <div className="mt-4 md:mt-0 flex items-center">
                                        <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Fit Score:</span>
                                        <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{match.fit_score}%</span>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-6">
                                    <div className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full" style={{ width: `${match.fit_score}% ` }}></div>
                                </div>

                                <p className="text-gray-700 dark:text-gray-300 italic mb-4 text-lg">"{match.summary}"</p>

                                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border-l-4 border-indigo-500 dark:border-indigo-400">
                                    <h5 className="font-bold text-indigo-900 dark:text-indigo-300 mb-1">Why this fits you:</h5>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{match.detailed_reasoning}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Alternative Paths */}
                <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6 transition-colors">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Explore These Alternatively</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        {results.alternative_paths.map((pathItem, idx) => (
                            <div key={idx} className="flex p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700/50">
                                <div className="flex-shrink-0 mr-3 text-yellow-500 dark:text-yellow-400">✦</div>
                                <div>
                                    <span className="block font-bold text-gray-800 dark:text-gray-200">{pathItem.path}</span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">{pathItem.why_it_fits}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Next Steps */}
                {results.next_steps && results.next_steps.length > 0 && (
                    <div className="bg-indigo-900 dark:bg-indigo-950 text-white shadow-xl sm:rounded-2xl p-8">
                        <h3 className="text-xl font-bold mb-6">🚀 Practical Next Steps</h3>
                        <ul className="space-y-3">
                            {results.next_steps.map((step, idx) => (
                                <li key={idx} className="flex items-start">
                                    <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-indigo-700 dark:bg-indigo-800 text-indigo-200 font-bold text-xs mr-3">
                                        {idx + 1}
                                    </span>
                                    <span className="text-indigo-100 dark:text-indigo-200">{step}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Not Recommended */}
                {results.courses_not_recommended && Object.keys(results.courses_not_recommended).length > 0 && (
                    <div className="bg-red-50 dark:bg-red-900/10 shadow sm:rounded-lg p-6 border border-red-100 dark:border-red-900/30">
                        <h3 className="text-lg font-medium text-red-900 dark:text-red-300 mb-4">Why some paths might be tricky</h3>
                        <div className="space-y-3">
                            {Object.entries(results.courses_not_recommended).map(([course, reason], idx) => (
                                <div key={idx} className="text-sm">
                                    <span className="font-bold text-red-800 dark:text-red-400 block mb-1">{course}</span>
                                    <span className="text-red-700 dark:text-red-300">{reason}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Disclaimer & Reset */}
                <div className="text-center mt-12 pb-12">
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-6 border-t dark:border-gray-700 pt-4">
                        {results.disclaimer}
                    </p>
                    <button
                        onClick={onReset}
                        className="px-6 py-3 border border-gray-300 dark:border-gray-600 shadow-sm text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-colors"
                    >
                        Start Over
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ResultsPage;

