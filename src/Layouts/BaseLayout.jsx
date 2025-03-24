import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Drawers from "./Drawers";
import Popups from "./Popups";
import Constants from "./Constants";

const BaseLayout = (props) => {
  return (
    <div className="flex min-h-screen flex-col max-w-[1440px] mx-auto">
      <Constants />
      <div>
        <Header />
        <main className="flex-1 my-auto">{props.children}</main>
        <Footer />
      </div>
      {/*============================== Drawers and Popups=================================*/}
      <Drawers />
      <Popups />
    </div>
  );
};

export default BaseLayout;
