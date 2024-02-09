import { createRoot } from 'react-dom/client';
import App from './App';
import M3 from './Theme/M3/M3';
import axios from "axios"

const container = document.getElementById('app') as Element;
const root = createRoot(container);

axios.defaults.baseURL = "http://127.0.0.1:8000/api"

root.render(
    <M3>
        <App />
    </M3>
);
