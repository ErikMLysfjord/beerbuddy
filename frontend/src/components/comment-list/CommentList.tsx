import CommentItem from "../comment-item/CommentItem";
import styles from "./CommentList.module.css";

const CommentList = () => (
  <div>
    <div className={styles.container}>
      <button className={styles.commentButton}>Comment</button>
    </div>
    <hr className={styles.divider} />
    <div className={styles.commentListContainer}>
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </div>
  </div>
);

export default CommentList;
