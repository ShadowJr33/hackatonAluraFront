import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

import './index.css';

function App() {
    const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'

    const handleLaunch = () => {
        setCurrentView('dashboard');
    };

    return (
        <div className="antialiased min-h-screen bg-navy-deep text-white selection:bg-neon-cyan selection:text-navy-deep font-sans">
            {currentView === 'landing' ? (
                <LandingPage onLaunch={handleLaunch} />
            ) : (
                <Dashboard />
            )}
        </div>
    );
}

export default App;
