import { IProduct } from "@/model/Product";
import Link from "next/link";
import Image from "next/image";
import { Favourit, Cart } from "./Icons";
import { useCart } from "@/context/cartContext";
const ProductCardComponent = ({
  image,
  name,
  price,
  _id,
}: Partial<IProduct>) => {
  const { addToCart } = useCart();
  return (
    <div className="backdrop-blur-sm">
      <Link href={`/product/${_id}`}>
        <div className="bg-product flex justify-center items-center h-[300px] w-[300px] relative">
          <span className="absolute top-5 right-5">
            <Favourit />
          </span>
          <Image
            src={image!}
            alt={""}
            height="300"
            width="300"
            className="w-[80%] h-[80%] object-contain"
          />
        </div>
      </Link>
      <div className="flex justify-between">
        <h1 className="text-md">{name}</h1>
        <Cart
          onClick={() => {
            addToCart({ image, name, _id, price });
          }}
        />
      </div>
      <p className="text-primary">Rs. {price}/-</p>
    </div>
  );
};
export default ProductCardComponent;
