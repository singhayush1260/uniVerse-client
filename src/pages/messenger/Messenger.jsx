import Appbar from '../../component/appbar/Appbar';
import classes from './Messenger.module.scss';

const Messenger=()=>{
    const users = [
        {
          name: "John Snow",
          userId: "erd4",
          profile_picture:
            "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
        },
        {
          name: "John Snow",
          userId: "era4",
          profile_picture:
            "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
        },
        {
          name: "John Snow",
          userId: "er1a4",
          profile_picture:
            "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
        },
        {
          name: "John Snow",
          userId: "ecv4",
          profile_picture:
            "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
        },
        {
            name: "John Snow",
            userId: "ecv4",
            profile_picture:
              "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
          },
          {
            name: "John Snow",
            userId: "ecv4",
            profile_picture:
              "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
          },
          {
            name: "John Snow",
            userId: "ecv4",
            profile_picture:
              "https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532",
          },
      
      ];
    return <>
    <Appbar/>
    <main className={classes.page_wrapper}>
        <div className={classes.user_list_container}>
         {
            users.map((user)=>{
                return  <div className={classes.user} key={user.userId}>
                <div className={classes.image_container}>
                  <img src={user.profile_picture} alt={user.name} />
                </div>
                <div className={classes.user_detail}>
                   <span><b>{user.name}</b><em>4th Apr, 2021</em></span>
                   <span>@ethan_23</span>
                   <span>good night</span>
                </div>
              </div>
            })
         }
        </div>
        <div className={classes.chat_container}>
            <span>Select user to display chats</span>
        </div>
    </main>
    </>
}
export default Messenger;