import { IProduct } from "@/model/Product";
import Image from "next/image";

const ProductCard = ({
  image,
  name,
  description,
  price,
}: Partial<IProduct>) => {
  return (
    <div className="bg-white w-[300px] h-[150px] px-5 rounded-xl shadow-black/10 shadow-lg flex items-center group transition-all origin-bottom hover:bg-primary hover:text-white hover:scale-125 duration-300">
      <Image
        src={image as string}
        height={300}
        width={300}
        alt="product image"
        className="h-full w-[100px] object-contain group-hover:scale-150 transition-all group-hover:-translate-y-10"
      />
      <div className="px-5">
        <h1 className="font-semibold text-lg">
          {name && name.length > 10 ? name?.slice(0, 10) + "..." : name}
        </h1>
        <p className="text-sm">{description?.slice(0, 20) + "..."}</p>
        <p className="text-primary font-semibold text-sm mt-3 group-hover:text-white transition-all">
          Rs. {price}/-
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
