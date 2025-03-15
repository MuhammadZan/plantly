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
import { IProduct } from "@/model/Product";
import { request } from "@/services/apiService";
import { useQuery } from "@tanstack/react-query";
interface ProductSectionProps {
  products?: Partial<IProduct>[];
}
const ProductSection: React.FC<ProductSectionProps> = ({ products }) => {
  const getAllProducts = async () => {
    try {
      const res = await request("product/get");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const { data: product, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    refetchOnReconnect: true,
  });
  if (isLoading) return <></>;
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
            {(product as IProduct[]).map((p, index: number) => (
              <SwiperSlide key={index}>
                <ProductCard
                  image={p.image}
                  name={p.name}
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
