
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initSampleData } from './utils/initSampleData';

// Initialize sample data for the demo
initSampleData();

// Console log the color palette
console.log('Color Palette:');
console.log('Charcoal: #264653');
console.log('Persian Green: #2A9D8F');
console.log('Saffron: #E9C46A');
console.log('Sandy Brown: #F4A261');
console.log('Burnt Sienna: #E76F51');

createRoot(document.getElementById("root")!).render(<App />);
