import { BrowserRouter } from "react-router-dom";
import Router from './routes'

export default function App() {
return (
    <BrowserRouter>
        <div className="App">
            <Router/>
        </div>
    </BrowserRouter>
);
}