import classes from './VerticalList.module.scss';
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import USER_PLACEHOLDER_IMAGE from "../../assets/images/dummy_user.png";
const VerticalList=({listData})=>{
    return <div className={classes.list_container}>
    {listData.map((data) => {
        console.log(data.profile_picture)
      return (
        <div className={classes.list_item} key={data.id}>
          <div className={classes.image_container}>
            <img
              src={
                data.profile_picture.length === 0
                  ? USER_PLACEHOLDER_IMAGE
                  : data.profile_picture.length
              }
              alt={data.id}
            />
          </div>
          <div className={classes.list_item_body}>
            <span>
              <b>{data.name}</b> {data.message}
            </span>
            <span>
              {" "}
              {formatDistanceToNow(data?.timestamp || data.lastSeen, {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      );
    })}
  </div>
}
export default VerticalList;