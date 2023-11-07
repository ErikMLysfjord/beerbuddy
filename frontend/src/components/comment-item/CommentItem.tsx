import styles from "./CommentItem.module.css";

const CommentItem = () => (
  <div className={styles.commentContainer}>
    <div className={styles.commentContentContainer}>
      <div>
        <div className={styles.commentHeader}>
          <p className={styles.commentAuthor}>Martin Hansa-Borg</p>
          <p className={styles.dot}>•</p>
          <p className={styles.commentDate}>5 days ago</p>
        </div>
      </div>
      <p className={styles.commentText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus
        sem diam, eget consectetur quam interdum eu. Aliquam ornare lectus vel
        sapien blandit eleifend. Aenean ac vestibulum metus. Nam auctor sed dui
        dapibus pharetra.
      </p>
    </div>
  </div>
);

export default CommentItem;
