import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";

import Dashboard from "@/pages/Dashboard";
import Sensores from "@/pages/Sensores";
import Historico from "@/pages/Historico";
import Sistema from "@/pages/Sistema";
import Sobre from "@/pages/Sobre";

export function AppRoutes() {
  return (
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
        path="/sensores"
        element={
          <MainLayout>
            <Sensores />
          </MainLayout>
        }
      />

      <Route
        path="/historico"
        element={
          <MainLayout>
            <Historico />
          </MainLayout>
        }
      />

      <Route
        path="/sistema"
        element={
          <MainLayout>
            <Sistema />
          </MainLayout>
        }
      />

      <Route
        path="/sobre"
        element={
          <MainLayout>
            <Sobre />
          </MainLayout>
        }
      />
    </Routes>
  );
}
