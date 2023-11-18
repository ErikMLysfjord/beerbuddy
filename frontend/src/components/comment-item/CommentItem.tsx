import styles from "./CommentItem.module.css";

interface CommentItemInterface {
  username: string;
  commentText: string;
  timestamp: string;
  id: number;
  onDelete: () => void;
}

const deleteComment = async (userId: string, commentId: string) => {
  const query = {
    query: `{ deleteComment(userId: "${userId}", commentId: ${commentId} ) }`,
  };
  return await fetch("http://localhost:4000/action", {
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
      <div className={styles.buttonContainer}>
        <img
          src="/project2/delete-kopi.svg"
          alt="Trash can"
          width={"32px"}
          height={"32px"}
          style={{ cursor: "pointer" }}
          onClick={() => {
            deleteComment(
              localStorage.getItem("userIdBeerBuddy") ?? "",
              id.toString()
            );
            onDelete();
          }}
          tabIndex={0}
        />
      </div>
    </div>
  );
};

export default CommentItem;
