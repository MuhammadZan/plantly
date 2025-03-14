import ProductCard from "../productCard";
import p1 from "@/app/images/plant1.png";
import p2 from "@/app/images/plant2.png";
import p3 from "@/app/images/plant3.png";
import p4 from "@/app/images/plant4.png";
import p5 from "@/app/images/plant5.png";
import p6 from "@/app/images/plant6.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { ProductProps } from "../productCard";
interface ProductSectionProps {
  products?: ProductProps[];
}
const product: ProductProps[] = [
  {
    image: p1,
    title: "lorem ipsum",
    description: "lorem ipsum set emmit",
    price: 500,
  },
  {
    image: p2,
    title: "lorem ipsum",
    description: "lorem ipsum set emmit",
    price: 499,
  },
  {
    image: p3,
    title: "lorem ipsum",
    description: "lorem ipsum set emmit",
    price: 449,
  },
  {
    image: p4,
    title: "lorem ipsum",
    description: "lorem ipsum set emmit",
    price: 599,
  },
  {
    image: p5,
    title: "lorem ipsum",
    description: "lorem ipsum set emmit",
    price: 530,
  },
  {
    image: p6,
    title: "lorem ipsum",
    description: "lorem ipsum set emmit",
    price: 699,
  },
];
const ProductSection: React.FC<ProductSectionProps> = ({ products }) => {
  return (
    <>
      <div className="container mx-auto overflow-x-hidden p-10">
        <div className="mt-24">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={50}
            slidesPerView={4}
            autoplay={{ delay: 3000 }}
            loop={true}
          >
            {product.map((p, index: number) => (
              <SwiperSlide key={index}>
                <ProductCard
                  image={p.image}
                  title={p.title}
                  description={p.description}
                  price={p.price}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ProductSection;
