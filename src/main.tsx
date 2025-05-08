import { createRoot } from 'react-dom/client'
import App from './router/App.tsx'
import './index.css'

// Add error handling for root element
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find the root element");
}

// Wrap the app initialization in a try-catch
try {
  const root = createRoot(rootElement);
  root.render(<App />);
} catch (error) {
  console.error("Error rendering app:", error);
  // Display a user-friendly error message
  rootElement.innerHTML = `
    <div style="padding: 20px; color: red;">
      <h1>Something went wrong</h1>
      <p>Please check the console for more details.</p>
    </div>
  `;
}
