import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Single_Measure_Single_Patient from "./pages/Single_Measure_Single_Patient";
import PageLayOut from "./components/PageLayOut";
import Home from "./pages/Home";


function App() {
  return (
    <Router>
    <PageLayOut>
      <Routes>
        <Route path="/" element={<Single_Measure_Single_Patient  />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </PageLayOut>
  </Router>
  );
}

export default App;