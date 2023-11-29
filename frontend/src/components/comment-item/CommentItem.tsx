import styles from "./CommentItem.module.css";

interface CommentItemInterface {
  id: number;
  userId: string;
  username: string;
  commentText: string;
  timestamp: string;
  onDelete: () => void;
}

const deleteComment = async (userId: string, commentId: string) => {
  const query = {
    query: `{ deleteComment(userId: "${userId}", commentId: ${commentId} ) }`,
  };
  return await fetch(import.meta.env.VITE_APP_BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(query),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

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
    const flooredInterval = Math.floor(interval);
    return flooredInterval + ` year${flooredInterval === 1 ? "" : "s"} ago`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    const flooredInterval = Math.floor(interval);
    return flooredInterval + ` month${flooredInterval === 1 ? "" : "s"} ago`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    const flooredInterval = Math.floor(interval);
    return flooredInterval + ` day${flooredInterval === 1 ? "" : "s"} ago`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    const flooredInterval = Math.floor(interval);
    return flooredInterval + ` hour${flooredInterval === 1 ? "" : "s"} ago`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    const flooredInterval = Math.floor(interval);
    return flooredInterval + ` minute${flooredInterval === 1 ? "" : "s"} ago`;
  }
  return "< 1 minute ago";
};

/**
 * The comment item component. Displays a comment.
 * @param username - The username of the user who posted the comment.
 * @param commentText - The text of the comment.
 * @param timestamp - The timestamp of the comment.
 * @returns - The comment item component.
 */
const CommentItem = ({
  username,
  commentText,
  timestamp,
  id,
  userId,
  onDelete,
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
      {userId === localStorage.getItem("userIdBeerBuddy") && (
        <button
          className={styles.buttonContainer}
          onClick={() => {
            deleteComment(
              localStorage.getItem("userIdBeerBuddy") ?? "",
              id.toString()
            );
            onDelete();
          }}
          aria-label="Delete comment"
        >
          <img
            src="/project2/delete-kopi.svg"
            alt="Trash icon"
            width={"32px"}
            height={"32px"}
          />
        </button>
      )}
    </div>
  );
};

export default CommentItem;
