import { Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import AdminLayout from "../components/layout/AdminLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";




import RateCampPage
from "../pages/Rating/RateCampPage";


/* Public Pages */
import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";

/* Camp */
import CampsPage from "../components/camps/CampsPage";
import CampDetailsPage from "../components/camps/CampDetailsPage";

/* Booking */
import BookingPage from "../pages/Booking/BookingPage";
import MyBookingsPage from "../pages/Booking/MyBookingsPage";
import ManageBookingPage from "../pages/ManageBooking/ManageBookingPage";
import ConfirmationPage from "../pages/Confirmation/ConfirmationPage";

/* Dashboard */
import DashboardPage from "../pages/Dashboard/DashboardPage";


/* Admin */
import AddCampPage from "../pages/Admin/AddCampPage";
import EditCampPage from "../pages/Admin/EditCampPage";
import ManageCampPage from "../pages/Admin/ManageCampPage";
import ManageBookingsPage from "../pages/Admin/ManageBookingsPage";
function AppRoutes() {
  return (
    <Routes>

      {/* Public */}

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/register"
        element={<RegisterPage />}
      />

      {/* User Layout */}

      <Route element={<MainLayout />}>

        <Route
          index
          element={<HomePage />}
        />

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/camps"
          element={<CampsPage />}
        />

        <Route
          path="/camps/:id"
          element={<CampDetailsPage />}
        />

        <Route
  path="/rate/:bookingId/:campId"
  element={
    <ProtectedRoute>
      <RateCampPage />
    </ProtectedRoute>
  }
/>

        <Route
          path="/booking/:campId"
          element={
            <ProtectedRoute>
              <BookingPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/confirmation"
          element={
            <ProtectedRoute>
              <ConfirmationPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookingsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-booking/:bookingReference"
          element={
            <ProtectedRoute>
              <ManageBookingPage />
            </ProtectedRoute>
          }
        />

       

      </Route>

      {/* Admin Layout */}

<Route
  element={
    <ProtectedRoute adminOnly>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route
    path="/admin/dashboard"
    element={<DashboardPage />}
  />

  <Route
    path="/admin/manage-camps"
    element={<ManageCampPage />}
  />

  <Route
    path="/admin/manage-bookings"
    element={<ManageBookingsPage />}
  />

  <Route
    path="/admin/add-camp"
    element={<AddCampPage />}
  />

  <Route
    path="/admin/edit-camp/:id"
    element={<EditCampPage />}
  />
</Route>

      {/* 404 */}

      <Route
        path="*"
        element={<NotFoundPage />}
      />

    </Routes>
  );
}

export default AppRoutes;