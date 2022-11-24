import "./styles/App.scss";
import "./styles/app.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/globalComponents/Navbar";
import Home from "./pages/Home";

import RecipeDetailes from "./pages/RecipeDetailes";
import Footer from "./components/globalComponents/footer/Footer";
import ProtectedRoute from "./route/ProtectedRoute";

import Auth from "./pages/Auth";
import Search from "./pages/Search";
import UserProfile from "./pages/UserProfile";
import OutletContainer from "./pages/OutletContainer";
function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<OutletContainer />}>
          <Route path="cuisine" element={<Search searchParam="cuisine" />} />
          <Route path="type" element={<Search searchParam="type" />} />
          <Route path="diet" element={<Search searchParam="diet" />} />
        </Route>
        <Route path="/signUp" element={<Auth type="Register" />} />
        <Route path="/login" element={<Auth type="login" />} />
        <Route path="/recipe/:id" element={<RecipeDetailes />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/user-profile" element={<UserProfile />} />
        </Route>
        <Route
          path="*"
          element={<h1 className="text center">Page not found...</h1>}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
