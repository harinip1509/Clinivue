import { createBrowserRouter } from "react-router";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { DoctorDashboard } from "./pages/doctor/DoctorDashboard";
import { DoctorUpload } from "./pages/doctor/DoctorUpload";
import { DoctorProcessing } from "./pages/doctor/DoctorProcessing";
import { DoctorResults } from "./pages/doctor/DoctorResults";
import { DoctorAnalysis } from "./pages/doctor/DoctorAnalysis";
import { DoctorReport } from "./pages/doctor/DoctorReport";
import { DoctorPatients } from "./pages/doctor/DoctorPatients";
import { DoctorAppointments } from "./pages/doctor/DoctorAppointments";
import { DoctorReports } from "./pages/doctor/DoctorReports";
import { DoctorSettings } from "./pages/doctor/DoctorSettings";
import { DoctorProfile } from "./pages/doctor/DoctorProfile";
import { PatientDashboard } from "./pages/patient/PatientDashboard";
import { PatientUpload } from "./pages/patient/PatientUpload";
import { PatientProcessing } from "./pages/patient/PatientProcessing";
import { PatientResults } from "./pages/patient/PatientResults";
import { PatientAnalysis } from "./pages/patient/PatientAnalysis";
import { PatientChat } from "./pages/patient/PatientChat";
import { PatientReports } from "./pages/patient/PatientReports";
import { PatientProfile } from "./pages/patient/PatientProfile";
import { DoctorLayout } from "./layouts/DoctorLayout";
import { PatientLayout } from "./layouts/PatientLayout";

// Router configuration for Clinivue
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/doctor",
    Component: DoctorLayout,
    children: [
      { index: true, Component: DoctorDashboard },
      { path: "patients", Component: DoctorPatients },
      { path: "appointments", Component: DoctorAppointments },
      { path: "reports", Component: DoctorReports },
      { path: "settings", Component: DoctorSettings },
      { path: "profile", Component: DoctorProfile },
      { path: "upload", Component: DoctorUpload },
      { path: "processing", Component: DoctorProcessing },
      { path: "results/:id", Component: DoctorResults },
      { path: "analysis/:id", Component: DoctorAnalysis },
      { path: "report/:id", Component: DoctorReport },
    ],
  },
  {
    path: "/patient",
    Component: PatientLayout,
    children: [
      { index: true, Component: PatientDashboard },
      { path: "upload", Component: PatientUpload },
      { path: "processing", Component: PatientProcessing },
      { path: "results/:id", Component: PatientResults },
      { path: "analysis/:id", Component: PatientAnalysis },
      { path: "chat", Component: PatientChat },
      { path: "reports", Component: PatientReports },
      { path: "profile", Component: PatientProfile },
    ],
  },
]);