import { Button, Input, Spin, App } from "antd";
import styles from "./CommentBar.module.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useWindowDimensions from "../../utils/useWindowDimensions";

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

const CommentBar = ({ onSuccess }: CommentBarInterface) => {
  const { id } = useParams<{ id: string }>();
  const [commentText, setCommentText] = useState("");
  const { message } = App.useApp();
  const { width } = useWindowDimensions();

  if (id === undefined)
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Spin size="default" />
      </div>
    );

  /**
   * Checks if the comment is valid.
   * A valid comment is a comment that is between 1 and 200 characters long
   * A valid comment does not start with a whitespace.
   * A valid comment cant only contain special characters.
   * @param comment
   * @returns false if the comment is invalid, true if the comment is valid.
   */
  const validComment = (comment: string) => {
    const regex = /^(?=.{1,200}$)(?!\s)[^\w\s]+$/;

    if (regex.test(comment)) {
      message.error("Your comment is invalid.");
      return false;
    }
    return true;
  };

  const handleComment = async () => {
    if (!validComment(commentText)) {
      return;
    }
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
        {width > 768 ? (
          <Button
            type="primary"
            className={styles.submitButton}
            /* When clicking on post button, you post */
            onClick={handleComment}
          >
            Comment
          </Button>
        ) : (
          <Button type="primary" className={styles.submitButton}>
            <img
              width={"30px"}
              height={"30px"}
              alt="Send icon"
              src={"/project2/paper-plane-right.svg"}
            />
          </Button>
        )}
      </section>
    </div>
  );
};
export default CommentBar;
