import { Link } from "react-router-dom";
import { useThemeStore } from "../../stores/useTheme";
import ThemeToggler from "../components/ThemeToggler";

export default function HomePage() {
  const theme = useThemeStore((state) => state.theme);
  return (
    <div
      className={`w-full h-screen ${theme === "dark" ? "bg-black text-white" : "bg-gray-50 text-black"} flex flex-col justify-center items-center gap-20`}
    >
      <h1>MediFlow - Prescription Management System</h1>
      <Link
        to={"/prescriptions"}
        className={`
          py-2 px-5 rounded-2xl text-3xl
          ${theme === "dark" ? "bg-transparent border-2 border-gray-100 text-gray-100" : "bg-blue-500 text-white"}
        `}
      >
        Prescriptions
      </Link>
      <Link
        to={"/prescriptionAddForm"}
        className={`
          py-2 px-5 rounded-2xl text-3xl
          ${theme === "dark" ? "bg-transparent border-2 border-gray-100 text-gray-100" : "bg-blue-500 text-white"}
        `}
      >
        Add New Prescription
      </Link>
      <ThemeToggler />
    </div>
  );
}
