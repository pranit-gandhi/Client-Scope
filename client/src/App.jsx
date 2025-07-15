import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Landing from "@/components/Landing";
import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";
import CreateClientBase from "@/components/CreateClientBase";
import ClientDashboard from "@/components/ClientDashboard";
import ClientBases from "@/components/ClientBases";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-client-base" element={<CreateClientBase />} />
          <Route path="/client-bases" element={<ClientBases />} />
          <Route path="/client/:id" element={<ClientDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
