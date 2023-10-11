const CommentItem = () => (
  <div
    style={{
      backgroundColor: "#333333",
      borderRadius: "10px",
      padding: "10px",
      display: "flex",
    }}
  >
    <div
      style={{
        width: "50px",
        height: "50px",
        backgroundColor: "black",
        borderRadius: "50%",
        marginRight: "10px",
        marginTop: "5px",
      }}
    />
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <div>
        <div
          style={{ display: "inline-block", borderBottom: "1px solid #FFCC48" }}
        >
          <p
            style={{
              padding: "0px",
              margin: "0px",
              display: "inline-block",
              fontWeight: "bold",
            }}
          >
            Martin Hansa-Borg
          </p>
          <p
            style={{
              color: "#FFCC48",
              padding: "0px",
              fontWeight: "bold",
              margin: "0px 10px",
              display: "inline-block",
            }}
          >
            •
          </p>
          <p
            style={{
              padding: "0px",
              margin: "0px",
              fontWeight: "lighter",
              display: "inline-block",
            }}
          >
            5 days ago
          </p>
        </div>
      </div>
      <p
        style={{
          paddingTop: "5px",
          margin: "0px",
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus
        sem diam, eget consectetur quam interdum eu. Aliquam ornare lectus vel
        sapien blandit eleifend. Aenean ac vestibulum metus. Nam auctor sed dui
        dapibus pharetra.
      </p>
    </div>
  </div>
);

export default CommentItem;
