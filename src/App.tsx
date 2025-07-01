import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MyCardsPage from "./pages/MyCardsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/my-cards" replace />} />
        <Route path="/my-cards" element={<MyCardsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
