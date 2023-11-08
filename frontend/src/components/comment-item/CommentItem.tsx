import styles from "./CommentItem.module.css";

interface CommentItemInterface {
  username: string;
  commentText: string;
  timestamp: string;
}

/**
 * Function for converting a timestamp to a human readable format.
 * @param timestamp - The timestamp to convert.
 * @returns - A human readable timestamp.
 */
const convertTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();

  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes ago";
  }
  return "< 1 minute ago";
};

const CommentItem = ({
  username,
  commentText,
  timestamp,
}: CommentItemInterface) => {
  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentContentContainer}>
        <div>
          <div className={styles.commentHeader}>
            <p className={styles.commentAuthor}>{username}</p>
            <p className={styles.dot}>•</p>
            <p className={styles.commentDate}>{convertTimestamp(timestamp)}</p>
          </div>
        </div>
        <p className={styles.commentText}>{commentText}</p>
      </div>
    </div>
  );
};

export default CommentItem;
