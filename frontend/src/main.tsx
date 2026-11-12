import { createRoot } from 'react-dom/client';
import { SchedulePage } from './components/SchedulePage';
import { StrictMode } from 'react';
import './App.css';

function App() {
    return (
        <StrictMode>
            <SchedulePage />
        </StrictMode>
    );
}

createRoot(document.getElementById('root')!).render(<App />);