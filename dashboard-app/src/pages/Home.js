import React from "react";

const Home = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>A.C.T Australia Pty Ltd</h1>

      {/* Flex container for items */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "30px",
          marginTop: "40px",
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* Cable Handling */}
        <div style={{ width: "250px", textAlign: "left" }}>
          <i
            className="fa fa-link"
            style={{ fontSize: "40px", color: "#007bff", marginBottom: "10px" }}
          ></i>
          <h3>Cable Handling</h3>
          <p>
            All our systems provide maximum all-round protection and separation
            of cable and hose.
          </p>
        </div>

        {/* Design & Manufacture */}
        <div style={{ width: "250px", textAlign: "left" }}>
          <i
            className="fa fa-cogs"
            style={{ fontSize: "40px", color: "#007bff", marginBottom: "10px" }}
          ></i>
          <h3>Design & Manufacture</h3>
          <p>
            Using the latest 3D Design Software, we can produce complex
            production layout drawings, 3D models, and animated renderings.
          </p>
        </div>

        {/* Injection Moulding */}
        <div style={{ width: "250px", textAlign: "left" }}>
          <i
            className="fa fa-cube"
            style={{ fontSize: "40px", color: "#007bff", marginBottom: "10px" }}
          ></i>
          <h3>Injection Moulding</h3>
          <p>
            Injection moulding can be performed with a variety of materials, the
            most common being thermoplastic and thermosetting polymers.
          </p>
        </div>

        {/* Anti Impalement Caps */}
        <div style={{ width: "250px", textAlign: "left" }}>
          <i
            className="fa fa-life-ring" aria-hidden="true"
            style={{ fontSize: "40px", color: "#007bff", marginBottom: "10px" }}
          ></i>
          <h3>Anti Impalement Caps</h3>
          <p>
            The new Anti-Impalement React Cap is the next generation of
            protection for your workforce.
          </p>
        </div>

        {/* Flight Bars */}
        <div style={{ width: "250px", textAlign: "left" }}>
          <i
            className="fa fa-bars"
            style={{ fontSize: "40px", color: "#007bff", marginBottom: "10px" }}
          ></i>
          <h3>Flight Bars</h3>
          <p>
            AFD/DSL Flight Bars providing robust solutions for your longwall
            mining operations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
