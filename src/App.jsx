import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Single_Measure_Single_Patient from "./pages/Single_Measure_Single_Patient";
import PageLayOut from "./components/PageLayOut";
import WelcomePage from "./pages/WelcomePage";
import IndividualResults from "./pages/IndividualResults";


function App() {
  return (
<Router>
  <Routes>
    <Route path="/" element={<WelcomePage />} />
    <Route path="/singlemeasure" element={<Single_Measure_Single_Patient />} />
    <Route
      path="/singlemeasureResult"
      element={
        <PageLayOut>
          <IndividualResults />
        </PageLayOut>
      }
    />
  </Routes>
</Router>

  );
}

export default App;