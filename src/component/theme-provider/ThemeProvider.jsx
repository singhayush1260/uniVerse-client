import { useSelector } from "react-redux";
const ThemeProvider = ({ children }) => {

   const {isDarkTheme}=useSelector((state)=>state.themeReducer);

  return <div className={`${isDarkTheme ? 'dark_theme' : 'light_theme'}`}>{children}</div>;
};
export default ThemeProvider;
