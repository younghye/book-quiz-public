import "./App.css";
import Routes from "./components/Routes";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <div className="root">
      <BrowserRouter>
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  );
}

export default App;
