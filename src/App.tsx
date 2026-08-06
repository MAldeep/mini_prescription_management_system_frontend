import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./UI/pages/HomePage";
import PrescriptionList from "./UI/pages/PrescriptionList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/prescriptions" element={<PrescriptionList />} />
        <Route
          path="/prescriptionAddForm"
          element={<p>Prescription Add Form</p>}
        />
      </Routes>
    </BrowserRouter>
  );
}
