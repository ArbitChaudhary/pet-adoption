import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import DashboardLayout from "./layouts/dashboard-layout";
import ProtectedRoute from "./components/auth/protected-route";

const LazyHomePage = React.lazy(() => import("@/pages/home/page"));
const LazyUsersListPage = React.lazy(() => import("@/pages/users/list/page"));

// Pets List Page
const LazyPetsListPage = React.lazy(() => import("@/pages/pets/list/page"));
const LazyAddPetPage = React.lazy(() => import("@/pages/pets/add/page"));
const LazyEditPetPage = React.lazy(() => import("@/pages/pets/edit/page"));

// Teams List Page
const LazyTeamsListPage = React.lazy(() => import("@/pages/teams/list/page"));
const LazyAddTeamPage = React.lazy(() => import("@/pages/teams/add/page"));
const LazyEditTeamPage = React.lazy(() => import("@/pages/teams/edit/page"));

//auth
const LazyLoginPage = React.lazy(() => import("@/pages/auth/login/page"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LazyLoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<LazyHomePage />} />
        <Route path="users" element={<LazyUsersListPage />} />
        <Route path="pets">
          <Route index element={<LazyPetsListPage />} />
          <Route path="add" element={<LazyAddPetPage />} />
          <Route path="edit/:petId" element={<LazyEditPetPage />} />
        </Route>
        <Route path="teams">
          <Route index element={<LazyTeamsListPage />} />
          <Route path="add" element={<LazyAddTeamPage />} />
          <Route path="edit/:teamId" element={<LazyEditTeamPage />} />
        </Route>
      </Route>
    </>
  )
);

const App = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </React.Suspense>
  );
};

export default App;
