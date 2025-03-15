import React, { Suspense, lazy } from "react";

const HeroSection = lazy(() => import("@/components/home/heroSection"));
const ProductSection = lazy(() => import("@/components/home/productSection"));
const CategorySection = lazy(() => import("@/components/home/categorySection"));
const BestSellerSection = lazy(
  () => import("@/components/home/bestSellerSection")
);
const Work = lazy(() => import("@/components/home/work"));
const NewsLetter = lazy(() => import("@/components/home/newsLetter"));

const Index = () => {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<div>Loading...</div>}>
        <ProductSection />
        <CategorySection />
        <BestSellerSection />
        <Work />
        <NewsLetter />
      </Suspense>
    </>
  );
};

export default Index;
