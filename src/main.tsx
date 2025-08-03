import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router';
// eslint-disable-next-line import-x/no-unassigned-import, import-x/order
import '@ant-design/v5-patch-for-react-19';
import App from './app.js';
import './index.css';

createRoot(document.querySelector('#root')!).render(
	<StrictMode>
		<BrowserRouter basename={import.meta.env.VITE_BASE_URL}>
			<App />
		</BrowserRouter>
	</StrictMode>,
);
