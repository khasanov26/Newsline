import { useState } from "react";
import "./newsItem.css";
import userAvatar from "../../resources/img/user-avatar.svg";
import Star from "../../resources/img/star";
const Video = ({ url }) => {
  return (
    <video className="attachments-video" max-width="260" controls>
      <source src={url} />
    </video>
  );
};

const NewsItem = ({ author, content, channel, id, date, attachments }) => {
  const [like, setLike] = useState(false);

  const changeLike = () => {
    setLike(!like);
  };

  const Futher = () => {
    return (
      <div>
        <div>{content.slice(0, 250)}...</div>
        <div className="item-further">Далее</div>
      </div>
    );
  };

  return (
    <div className="news-item">
      <div className="news-avatar">
        <img src={userAvatar} alt="user avatar" width="36" height="36" />
        <div className="news-time">{date.slice(11, 16)}</div>
      </div>
      <div className="news-content">
        <div className="news-author">{author}</div>
        <div className="news-channel">{channel}</div>
        <div className="news-text">
          {content.length > 200 ? <Futher /> : content}
        </div>

        {attachments.length > 0 ? (
          attachments[0]?.type === "video" ? (
            <Video url={attachments[0]?.url} />
          ) : (
            <img
              className="attachments-img"
              src={attachments[0]?.url}
              alt={content}
            />
          )
        ) : null}
      </div>
      <Star active={like} changeLike={changeLike} />
    </div>
  );
};

export default NewsItem;
