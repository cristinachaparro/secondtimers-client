import "./App.css";

import { Routes, Route } from "react-router";

import Navbar from "./components/Navbar";
import CreateForm from "./components/CreateForm";

import Error from "./pages/Error";
import NotFound from "./pages/NotFound";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import PostDetails from "./pages/PostDetails";
import EditForm from "./pages/EditForm";

function App() {
  return (
    <div className="App">
      <h1>Hola</h1>
      <Navbar />
      <Routes>
        {/* Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/destinations/create-form" element={<CreateForm />} />
        <Route path="/destinations/:postId" element={<PostDetails />} />
        <Route path="/destinations/edit/:postId" element={<EditForm />} />

        {/* Auth Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Error */}
        <Route path="/error" element={<Error />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
