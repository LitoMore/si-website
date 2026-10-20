import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router';
import App from './app.js';
import './components/ui/ui.css';
import './index.css';

createRoot(document.querySelector('#root')!).render(
	<StrictMode>
		<BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
			<App />
		</BrowserRouter>
	</StrictMode>,
);
