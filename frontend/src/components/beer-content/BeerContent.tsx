const BeerContent = () => (
  <>
    <p
      style={{
        fontSize: "20px",
        fontWeight: "lighter",
        marginBottom: "-15px",
      }}
    >
      Nico Freccia Breweries (Beer-brand)
    </p>
    {/* name */}
    <p
      style={{
        fontSize: "30px",
        fontWeight: "medium",
        margin: "0px",
      }}
    >
      21st Amendment Bitter American (Beer-name)
    </p>

    <div style={{ display: "flex", gap: "0.2rem", alignItems: "end" }}>
      <p
        style={{
          fontSize: "30px",
          color: "#FFCC48",
          marginBottom: "0px",
        }}
      >
        137
      </p>
      <p
        style={{
          fontSize: "30px",
          marginBottom: "0px",
        }}
      >
        rated
      </p>
    </div>

    {/* small text under, "based on 547 reviews" */}
    <p
      style={{
        fontSize: "15px",
        fontWeight: "lighter",
        marginTop: "-10px",
      }}
    >
      Based on 547 reviews
    </p>

    {/* Info */}
    <div
      style={{
        display: "flex",
        gap: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#333333",
          padding: "10px",
          width: "80px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <p style={{ margin: "0px" }}>Style</p>
        <h1 style={{ margin: "0px" }}>APA</h1>
      </div>

      <div
        style={{
          backgroundColor: "#333333",
          padding: "10px",
          width: "80px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <p style={{ margin: "0px" }}>IBU</p>
        <h1 style={{ margin: "0px" }}>23</h1>
      </div>

      <div
        style={{
          backgroundColor: "#333333",
          padding: "10px",
          width: "80px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <p style={{ margin: "0px" }}>Abv</p>
        <h1 style={{ margin: "0px" }}>5,4%</h1>
      </div>

      <div
        style={{
          backgroundColor: "#333333",
          padding: "10px",
          width: "80px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <p style={{ margin: "0px" }}>Volume</p>
        <h1 style={{ margin: "0px" }}>4oz</h1>
      </div>
    </div>
  </>
);

export default BeerContent;
