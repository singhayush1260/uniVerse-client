import classes from "./SomethingWentWrong.module.scss";
import { FcHighPriority } from "react-icons/fc";
const SomethingWentWrong = () => {
  return (
    <main className={classes.page_wrapper}>
      {/* <img src="/public/universe.svg" alt="logo"></img> */}
      <div>
        <FcHighPriority />
        <p>Opps!</p>
        <p>Something went wrong at our side.</p>
        <a  href="/">Home</a>
      </div>
    </main>
  );
};
export default SomethingWentWrong;
