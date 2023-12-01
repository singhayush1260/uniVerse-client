import classes from "./Likes.module.scss";
import Appbar from "../../component/appbar/Appbar";
import { useSelector } from "react-redux";
import VerticalList from "../../component/vertical-list/VerticalList";
const Likes = () => {
    
  const { likes } = useSelector((state) => state.likesReducer);

  return (
    <>
      <Appbar />
      <main className={classes.page_wrapper}>
        <VerticalList listData={likes} />
      </main>
    </>
  );
};
export default Likes;
