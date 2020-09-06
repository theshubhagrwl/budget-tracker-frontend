import React from "react";

export default function Footer() {
  return (
    <div className="stickyFooter">
      Made with{" "}
      <span role="img" aria-label="heart">
        {" "}
        ❤️{" "}
      </span>{" "}
      in India by{" "}
      <a
        target="_blank"
        href="http://theshubhagrwl.netlify.app/"
        style={{ color: "#019031", textDecoration: "none" }}
      >
        Shubh
      </a>
    </div>
  );
}
