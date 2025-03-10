import { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import c1 from "@/app/images/indoor-plant.jpg";
import c2 from "@/app/images/ceramic-pot.jpg";
import { BRILLANT_REGULAR } from "@/app/fonts";
const CategorySection = () => {
  return (
    <div className="flex w-2/3 mx-auto justify-between p-5 my-20">
      {[
        {
          link: "/",
          heading: "Plant Pots",
          subheading: "lorem ipsum set emmit",
          img: c1,
        },
        {
          link: "/",
          heading: "Ceramic Pots",
          subheading: "lorem ipsum set emmit",
          img: c2,
        },
      ].map((item, index) => (
        <CatagoryCard
          key={index}
          link="/"
          heading={item.heading}
          subheading={item.subheading}
          img={item.img}
        />
      ))}
    </div>
  );
};

const CatagoryCard = ({
  link,
  heading,
  subheading,
  img,
}: {
  link: string;
  heading: string;
  subheading: string;
  img: StaticImageData;
}) => (
  <Link href={link}>
    <div
      style={{ background: `url(${img.src})`,backgroundPosition:"center",backgroundSize:"cover" }}
      className="h-[250px] w-[450px] flex flex-col justify-center p-10 rounded-md shadow-lg shadow-black/10"
    >
      <h1 className={"font-semibold text-2xl "+BRILLANT_REGULAR.className}>{heading}</h1>
      <p>{subheading}</p>
    </div>
  </Link>
);
export default CategorySection;
