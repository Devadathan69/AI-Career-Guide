import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import QuestionForm from './components/QuestionForm';
import ResultsPage from './components/ResultsPage';

function App() {
  const [step, setStep] = useState('landing'); // landing, form, loading, results, error
  const [results, setResults] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleStart = () => {
    setStep('form');
  };

  const handleComplete = async (answers) => {
    setStep('loading');
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResults(data);
      setStep('results');
    } catch (error) {
      console.error("Error fetching analysis:", error);
      setStep('error');
    }
  };

  const handleReset = () => {
    setStep('landing');
    setResults(null);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-opacity-20 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-lg hover:scale-110 transition-transform"
        title="Toggle Dark Mode"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      {step === 'landing' && <LandingPage onStart={handleStart} />}

      {step === 'form' && <QuestionForm onComplete={handleComplete} />}

      {step === 'loading' && (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <h2 className="text-xl font-semibold dark:text-gray-200">Analyzing your traits...</h2>
          <p className="text-gray-500 dark:text-gray-400">This usually takes about 10-20 seconds.</p>
        </div>
      )}

      {step === 'results' && <ResultsPage results={results} onReset={handleReset} />}

      {step === 'error' && (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2 dark:text-white">Oops! Something went wrong.</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">We couldn't process your answers. Please try again.</p>
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Go Back Home
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
