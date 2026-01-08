import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import DashboardLayout from "./layouts/dashboard-layout";

const LazyHomePage = React.lazy(() => import("@/pages/home/page"));
const LazyUsersListPage = React.lazy(() => import("@/pages/users/list/page"));

// Pets List Page
const LazyPetsListPage = React.lazy(() => import("@/pages/pets/list/page"));

// Teams List Page
const LazyTeamsListPage = React.lazy(() => import("@/pages/teams/list/page"));
const LazyAddTeamPage = React.lazy(() => import("@/pages/teams/add/page"));
const LazyEditTeamPage = React.lazy(() => import("@/pages/teams/edit/page"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<LazyHomePage />} />
        <Route path="users" element={<LazyUsersListPage />} />
        <Route path="pets">
          <Route index element={<LazyPetsListPage />} />
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
