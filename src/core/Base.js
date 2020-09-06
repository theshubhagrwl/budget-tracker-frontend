import React from "react";
import Menu from "./Menu";
import Footer from "./Footer";
const Base = ({ children }) => {
  return (
    <div>
      <Menu />
      {children}
      {/* <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center py-3">
          <h4>Reach me out for questions</h4>
          <button className="btn btn-warning btn-lg">Contact us</button>
          <div className="container">
            <span className="text-warning">An Amazing Django+React Store</span>
          </div>
        </div>
      </footer>{" "} */}
      <Footer />
    </div>
  );
};
export default Base;
