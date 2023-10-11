import CommentItem from "../comment-item/CommentItem";

const CommentList = () => (
  <div>
    <div
      style={{
        display: "flex",
        justifyContent: "end",
      }}
    >
      <button
        style={{
          backgroundColor: "transparent",
          color: "#FFCC48",
          border: "2px solid #FFCC48",
          width: "120px",
          padding: "5px",
          borderRadius: "5px",
          marginBottom: "5px",
          cursor: "pointer",
          marginTop: "50px",
        }}
      >
        Comment
      </button>
    </div>
    {/* button that  */}
    <hr
      style={{
        border: "1px solid #FFCC48",
        borderRadius: "5px",
        marginBottom: "20px",
      }}
    />

    {/* comments */}

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {/* each comment */}
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
