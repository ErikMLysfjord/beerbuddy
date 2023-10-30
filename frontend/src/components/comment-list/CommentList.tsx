import CommentItem from "../comment-item/CommentItem";
import styles from "./CommentList.module.css";

const CommentList = () => (
  <div>
    <div className={styles.container}>
      <button className={styles.commentButton}>Comment</button>
    </div>
    <hr className={styles.divider} />
    <div className={styles.commentListContainer}>
      <ul className={styles.commentList}>
        <li>
          <CommentItem />
        </li>
        <li>
          <CommentItem />
        </li>
        <li>
          <CommentItem />
        </li>
        <li>
          <CommentItem />
        </li>
        <li>
          <CommentItem />
        </li>
        <li>
          <CommentItem />
        </li>
      </ul>
    </div>
  </div>
);

export default CommentList;
