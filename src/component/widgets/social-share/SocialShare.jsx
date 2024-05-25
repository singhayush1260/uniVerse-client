import classes from "./SocialShare.module.scss";
import {
  EmailShareButton,
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  EmailIcon,
  RedditIcon,
  TwitterIcon,
  FacebookIcon,
} from "react-share";
const SocialShare = () => {
  const shareUrl =
    "https://shravanmeena.medium.com/how-to-use-react-share-npm-in-reactjs-e5f356c13a30";
  return (
    <div className={classes.social_share}>
        <p>Share this post</p>
     <div className={classes.social_share_buttons}>
     <EmailShareButton url={shareUrl} quote={"You might enjoy this post."}>
        <EmailIcon size={35} round={true} />
      </EmailShareButton>

      <FacebookShareButton url={shareUrl} quote={"You might enjoy this post."}>
        <FacebookIcon size={35} round={true} />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} quote={"You might enjoy this post."}>
        <TwitterIcon size={35} round={true} />
      </TwitterShareButton>

      <RedditShareButton url={shareUrl} quote={"You might enjoy this post."}>
        <RedditIcon size={35} round={true} />
      </RedditShareButton>

      <WhatsappShareButton url={shareUrl} quote={"You might enjoy this post."}>
        <WhatsappIcon size={35} round={true} />
      </WhatsappShareButton>
     </div>
     <p>Or copy link</p>
     <div className={classes.copy_link}>
        
      <div>
        <input type="text" disabled value={shareUrl} />
        <button>Copy</button>
      </div>
     </div>
    </div>
  );
};
export default SocialShare;
