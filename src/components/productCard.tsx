import Image, { StaticImageData } from "next/image";
export interface ProductProps {
  image: StaticImageData | string;
  title: string;
  description: string;
  price: string | number;
}
const ProductCard = ({ image, title, description, price }: ProductProps) => {
  return (
    <div className="bg-white w-[300px] h-[150px] px-5 rounded-xl shadow-black/10 shadow-lg flex items-center group transition-all origin-bottom hover:bg-primary hover:text-white hover:scale-125 duration-300">
      <Image
        src={image}
        alt="product image"
        className="h-full w-[100px] object-contain group-hover:scale-150 transition-all group-hover:-translate-y-10"
      />
      <div className="px-5">
        <h1 className="font-semibold text-lg">{title}</h1>
        <p className="text-sm">{description.slice(0, 30)}</p>
        <p className="text-primary font-semibold text-sm mt-3 group-hover:text-white transition-all">Rs. {price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
