import classes from "./SuspenseFallback.module.scss";
import UNIVERSE_LOGO from "../../../../public/universe.svg";
const SuspenseFallback=()=>{
return(
    <main className={classes.page_wrapper}>
     <img src={UNIVERSE_LOGO} alt="logo" />
     <p>Loading...</p>
    </main>
)
}
export default SuspenseFallback;