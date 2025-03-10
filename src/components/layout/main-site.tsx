import React from "react";
import Header from "../globals/header";
import Footer from "../globals/footer";

const MainSite = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainSite;
