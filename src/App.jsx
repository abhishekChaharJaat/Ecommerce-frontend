import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import BaseLayout from "./Layouts/BaseLayout.jsx";
import EditUserInfoPopup from "./component/EditUserInfoPopup.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import ProtectedRoute from "./component/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <BaseLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<PageNotFound />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>
        </Routes>
        <EditUserInfoPopup />
      </BaseLayout>
    </>
  );
}

export default App;
