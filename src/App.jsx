import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './App.css'
import Login from "./pages/Login";
import AuthProvider from "./services/AuthProvider";
import { useState } from "react";


function App() {
  const [count, setCount] = useState(0)

  return (
  
 <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="" element={<Login />} />
            {/* <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route> */}
            {/* Other routes */}
          </Routes>
        </AuthProvider>
      </Router>
    </div>
    
  )
}

export default App
