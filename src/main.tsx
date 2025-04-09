
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initSampleData } from './utils/initSampleData';

// Initialize sample data for the demo
initSampleData();

createRoot(document.getElementById("root")!).render(<App />);
