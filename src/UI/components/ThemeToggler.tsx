import { useThemeStore } from "../../stores/useTheme";

export default function ThemeToggler() {
  const { theme, toggleTheme } = useThemeStore();
  return (
    <button
      onClick={() => toggleTheme()}
      className={`
          py-2 px-5 rounded-2xl text-3xl
          ${theme === "dark" ? "bg-transparent border-2 border-gray-100 text-gray-100" : "bg-black text-white"}
        `}
    >
      {theme === "dark" ? "light" : "dark"}
    </button>
  );
}
