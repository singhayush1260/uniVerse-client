import { useGeneralContext } from "../../context/GeneralContext";
const ThemeProvider = ({ children }) => {
  const { theme } = useGeneralContext();

  return (
    <div className={`${theme === "dark" ? "dark_theme" : "light_theme"}`}>
      {children}
    </div>
  );
};
export default ThemeProvider;
