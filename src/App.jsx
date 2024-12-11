import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlansPage from "./pages/PlansPage";
import SharedPage from "./pages/SharedPage";
import BookmarksPage from "./pages/BookmarksPage";
import AccountPage from "./pages/AccountPage";
import CreatePlanPage from "./pages/CreatePlanPage";
import PlanDetailsPage from "./pages/PlanDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EditPlanPage from "./pages/EditPlanPage";
import EditItineraryPage from "./pages/EditItineraryPage";
import AboutPage from "./pages/AboutPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import MetaData from "./utils/MetaData";
import ActivationPage from "./pages/ActivationPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <MetaData />

        <Routes>
          <Route path="/" element={<Navigate replace to="plans" />} />

          <Route path="/plans" element={<PlansPage />} />
          <Route path="/shared" element={<SharedPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/activation/:activationToken"
            element={<ActivationPage />}
          />
          <Route path="/plans/:planId" element={<PlanDetailsPage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Protected Routes - with Redirection */}
          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<AccountPage />} />
            <Route path="/create" element={<CreatePlanPage />} />
            <Route path="/plans/:planId/edit-plan" element={<EditPlanPage />} />
            <Route
              path="/plans/:planId/edit-itinerary"
              element={<EditItineraryPage />}
            />
          </Route>
        </Routes>

        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </>
  );
}

export default App;
