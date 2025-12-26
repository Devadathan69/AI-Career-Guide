import React, { useState } from 'react';
import questions from '../data/questions';

const QuestionForm = ({ onComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(new Array(questions.length).fill(''));
    const [error, setError] = useState('');

    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    const handleNext = () => {
        if (!answers[currentQuestionIndex].trim()) {
            setError('Please provide an answer before moving forward.');
            return;
        }
        setError('');

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            // Submit
            onComplete(answers.map((ans, idx) => ({
                question: questions[idx].text,
                category: questions[idx].category,
                answer: ans
            })));
        }
    };

    const handlePrev = () => {
        setError('');
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const handleChange = (e) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = e.target.value;
        setAnswers(newAnswers);
        if (error) setError('');
    };

    const handleKeyDown = (e) => {
        // Allow Ctrl+Enter to submit/next
        if (e.ctrlKey && e.key === 'Enter') {
            handleNext();
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center pt-10 px-4 transition-colors duration-500">
            {/* Progress Bar */}
            <div className="w-full max-w-2xl bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-8">
                <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
                <p className="text-right text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Question {currentQuestionIndex + 1} of {questions.length}
                </p>
            </div>

            <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors duration-300">
                <span className="inline-block px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold rounded-full mb-4">
                    {currentQuestion.category}
                </span>

                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 leading-snug">
                    {currentQuestion.text}
                </h2>

                <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-4 italic font-medium">
                    You can answer in English or Manglish — express freely
                </p>

                <textarea
                    width="100%"
                    rows="6"
                    className="w-full p-4 text-lg border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-0 transition-colors resize-none mb-2 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Type your answer here..."
                    value={answers[currentQuestionIndex]}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />

                {error && <p className="text-red-500 text-sm mb-4 animate-pulse">{error}</p>}

                <div className="flex justify-between mt-6">
                    <button
                        onClick={handlePrev}
                        disabled={currentQuestionIndex === 0}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors ${currentQuestionIndex === 0
                            ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                    >
                        Previous
                    </button>

                    <button
                        onClick={handleNext}
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold shadow-md hover:bg-blue-700 transition-all transform active:scale-95"
                    >
                        {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
            </div>

            <p className="mt-8 text-gray-400 dark:text-gray-500 text-sm center">
                Tip: Be honest and detailed for the best results. (Ctrl + Enter to Next)
            </p>
        </div>
    );
};

export default QuestionForm;
