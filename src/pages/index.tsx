import React, { useEffect } from "react";
import Header from "@/components/globals/header";
import HeroSection from "@/components/home/heroSection";
import ProductSection from "@/components/home/productSection";
import CategorySection from "@/components/home/categorySection";
import BestSellerSection from "@/components/home/bestSellerSection";
import Work from "@/components/home/work";
import NewsLetter from "@/components/home/newsLetter";
import Footer from "@/components/globals/footer";

const Index = () => {
  useEffect(() => {
    document.title = "Plantly";
  }, []);
  return (
    <>
      <HeroSection />
      <ProductSection />
      <CategorySection />
      <BestSellerSection />
      <Work />
      <NewsLetter/>
    </>
  );
};

export default Index;
