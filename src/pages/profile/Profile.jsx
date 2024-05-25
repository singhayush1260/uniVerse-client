import classes from "./Profile.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import Appbar from "../../component/appbar/Appbar";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import {useQuery} from "react-query";
import { getAllPostsByUser } from "../../api/post";
import { useParams } from "react-router-dom";
import Modal from "../../component/modal/Modal";
import Post from "../../component/posts/post/Post";

const Profile = () => {
  
  //const { userData: { name,  userId, profile_picture, cover_picture, bio, followers, following, } } = useSelector((state) => state.userReducer);
  const[showPostModal,setShowPostModal]=useState(false);
  const[modalPost,setModalPost]=useState(null);
  const params = useParams();
  const userId = params?.userId ? params?.userId : "";
 // console.log("userId",userId)
  const { data, error, isLoading } = useQuery(["getAllPostsByUser", userId], () => getAllPostsByUser(userId), {
    enabled: !!userId 
  });

 // console.log("data from profile",data);


  const name="Ayush"
 // const userId=22;
  const profile_picture="";
  const bio="";
  const followers=12;
  const following=23;

//console.log("showPostModal",showPostModal)

  return (
    <>
      <Appbar />
      <main className={classes.page_wrapper}>
        <div className={classes.top}>
          <div className={classes.cover_picture}>
            <img src={""} alt={`cover_picture_${name}`} />
            <div className={classes.profile_picture}>
              <img src={profile_picture} alt={`profile_picture_${name}`} />
            </div>
          </div>
        </div>
        <div className={classes.bottom}>
          <div className={classes.bottom_left}>
            <h2>{name}</h2>
            <span>@{userId}</span>
            <p>{bio}</p>
            <button>Edit Profile</button>
            <div className={classes.span_group}>
              <span>
                <b>{followers}</b>Followers
              </span>
              <span>
                <b>{following}</b>Following
              </span>
            </div>
            <div className={classes.socials}>
              <a>
                {" "}
                <AiFillInstagram /> @evgen_ledo{" "}
              </a>
              <a href="#">
                <FaFacebookSquare /> Evgen Ledo{" "}
              </a>
              <a href="#">
                <FaXTwitter /> @ledo_123{" "}
              </a>
              <a href="#">
                {" "}
                <FaLinkedin />
                Evgen Ledo
              </a>
            </div>
          </div>
          <div className={classes.bottom_right}>
            <div className={classes.bottom_right_appbar}>
              <div className={classes.carousal_controller}>
                <div className={classes.current_carousal_item}>
                  Post
                  <span>
                    <b>12</b>
                  </span>
                </div>
                <div>
                  Photos
                  <span>
                    <b>31</b>
                  </span>
                </div>
              </div>
              {/* <div className={classes.button_group}>
                <button><SlUserFollow/> Follow</button>
                <button><TiMessage/>Message</button>
              </div> */}
            </div>
            <div className={classes.data_grid}>
              {data?.Posts?.map((post) => {
                //console.log("post",post)
                return (
                  <div className={classes.grid_item} key={post.postId} onClick={()=>{setModalPost(post); setShowPostModal(true)}}>
                    <p>{ post?.Caption?.length>80 ? post?.Caption?.slice(0,80)+"...":post?.Caption}</p>
                    {
                      post?.MediaURLs?.length>0 && post?.MediaURLs?.map((url)=>{
                        return <img src={url}
                        alt={`${post.userId}-${post.postId}`} />
                      })
                    }
                  </div>
                );
              })}
            </div>
          </div>
        </div>
       {/* {showPostModal && <Modal isOpened={showPostModal} onClose={()=>setShowPostModal(false)}>
           <div style={{position:"relative", height:"90%",overflowY:"scroll",paddingTop:"1rem"}}>
           <div style={{position:"absolute",top:0,right:10,backgroundColor:"black",width:20,height:20,padding:2,textAlign:"center",color:"white",borderRadius:"50%"}} onClick={()=>setShowPostModal(false)}>X</div>
            <Post
            key={modalPost?.id}
            postId={modalPost?.id}
            name={"Evgen Ledo"}
            userId={modalPost?.By}
            caption={modalPost?.Caption}
            image={modalPost?.MediaURLs[0]}
            timestamp={new Date(modalPost?.createdAt)}
          />
            
           </div>
        </Modal>} */}
          {showPostModal && <Modal isOpened={showPostModal} onClose={()=>setShowPostModal(false)}>
           
           {/* <div style={{position:"absolute",top:0,right:10,backgroundColor:"black",width:20,height:20,padding:2,textAlign:"center",color:"white",borderRadius:"50%"}} onClick={()=>setShowPostModal(false)}>X</div> */}
            <Post
            key={modalPost?.id}
            postId={modalPost?.id}
            name={"Evgen Ledo"}
            userId={modalPost?.By}
            caption={modalPost?.Caption}
            image={modalPost?.MediaURLs[0]}
            timestamp={new Date(modalPost?.createdAt)}
          />
            
           
        </Modal>}
      </main>
    </>
  );
};
export default Profile;
