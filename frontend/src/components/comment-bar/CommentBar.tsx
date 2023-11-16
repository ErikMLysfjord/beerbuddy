import { Button, Input, Spin } from "antd";
import styles from "./CommentBar.module.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { App } from "antd";

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

/**
 * The comment bar component. Contains the input field and submit button for posting a comment.
 * @param onSuccess - The function to call when a comment has been successfully posted.
 * @returns - The comment bar component.
 */
const CommentBar = ({ onSuccess }: CommentBarInterface) => {
  const { id } = useParams<{ id: string }>();
  const [commentText, setCommentText] = useState("");
  const { message } = App.useApp();

  //? Shouldnt we return a not found page here instead? This indicates that something will show up
  if (id === undefined)
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Spin size="default" />
      </div>
    );

  /**
   * Handles the posting of a comment.
   * if a comment is invalid, a message will be posted to user and the function returns.
   * if the response is "Error", a message is posted to the user.
   * If the response is successful, the comment text is cleared and onSuccess is called.
   */
  const handleComment = async () => {
    const response = await postComment(id, commentText);
    if (response === "Error") {
      message.error("There was a problem posting your comment.");
      return;
    }
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
