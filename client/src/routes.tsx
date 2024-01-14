import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Loader from "./components/Loader/Loader";

const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Favorites = lazy(() => import("./pages/Favorites/Favorites"));

export const createRouting = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Dashboard />
          </MainLayout>
        }
      />
      <Route
        path="/favorites"
        element={
          <MainLayout>
            <Favorites />
          </MainLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

export default createRouting;
