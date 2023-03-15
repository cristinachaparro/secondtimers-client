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
import MyProfile from "./pages/profile/MyProfile";
import EditProfile from "./pages/profile/EditProfile";
import MyFavourites from "./pages/profile/MyFavourites";

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

        {/* Prvate Profile*/}
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/profile/edit-form" element={<EditProfile />} />
        <Route path="/profile/favourites" element={<MyFavourites />} />

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
