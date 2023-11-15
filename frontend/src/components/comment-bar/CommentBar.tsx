import { Button, Input, Spin } from "antd";
import styles from "./CommentBar.module.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { App } from "antd";
import protectRoute from "../../utils/protectRoute";

interface CommentBarInterface {
  onSuccess: () => void;
}

/**
 * Posts a comment to the backend.
 * @param beerId - The ID of the beer to post a comment for.
 * @param comment - The comment to post.
 * @returns - The response from the backend.
 */
const postComment = async (beerId: string, comment: string) => {
  protectRoute();
  const userId = localStorage.getItem("userIdBeerBuddy");
  const query = {
    query: `{ comment(userId: "${userId}", beerId: ${beerId}, comment: "${comment}") }`,
  };

  return await fetch("http://it2810-15.idi.ntnu.no:4000/action", {
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
      return "Error";
    });
};

const CommentBar = ({ onSuccess }: CommentBarInterface) => {
  const { id } = useParams<{ id: string }>();
  const [commentText, setCommentText] = useState("");
  const { message } = App.useApp();

  if (id === undefined)
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Spin size="default" />
      </div>
    );

  const handleComment = async () => {
    const response = await postComment(id, commentText);
    /* If the call was not successful, then we must display error message */
    if (response === "Error") {
      message.error("There was a problem posting your comment.");
      return;
    }
    /* Else, display success comment, clear message state and call onSuccess. */
    message.success("Comment posted.");
    setCommentText("");
    onSuccess();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.divider} />
      <section className={styles.container}>
        <Input
          placeholder="Write a comment..."
          className={styles.inputField}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyDown={(e) => {
            /* When you press Enter with focus on input, you post */
            if (e.key === "Enter") {
              handleComment();
            }
          }}
        />
        <Button
          type="primary"
          className={styles.submitButton}
          onClick={() => {
            /* When clicking on post button, you post */
            handleComment();
          }}
        >
          Comment
        </Button>
      </section>
    </div>
  );
};
export default CommentBar;
