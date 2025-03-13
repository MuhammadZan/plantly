import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Model from "@/components/globals/model";
import Button from "@/components/globals/button";
import { IProduct } from "@/model/Product";
import { request } from "@/services/apiService";
import { AxiosResponse } from "axios";
import { useUtility } from "@/context/loaderContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import p1 from "@/app/images/plant1.png";
import { BRILLANT_REGULAR } from "@/app/fonts";
import { uploadImage } from "@/utils/uploadImage";
const Index = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [products, setProduct] = useState<IProduct[]>([]);
  const { setLoading, toast } = useUtility();
  const [image, setImage] = useState<File | null>(null);
  const [productData, setProductData] = useState<Partial<IProduct> | null>({
    name: "",
    price: 0,
    description: "",
    image: "",
    type: "plant",
  });
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const setProductToUpdate = (product: IProduct) => {
    setProductData(product);
    setIsUpdate(true);
    setVisible(true);
  };

  const submitForm = async () => {
    try {
      setLoading(true);
      let link = "";
      if (image) {
        link = await uploadImage(image);
      }
      if (isUpdate) {
        await request("product/manage", "put", productData);
        setProduct((pre) => {
          let elem = pre.find((item) => item._id === productData?._id);
          if (elem && productData) {
            elem.name = productData.name as string;
            elem.type = productData.type as string;
            elem.description = productData.description as string;
            elem.price = productData.price as number;
            elem.image = productData.image as string;
          }
          return pre;
        });
        setVisible(false);
      } else {
        if (!link) {
          toast("Image is required", "error");
          return;
        }
        const res: AxiosResponse = await request("product/manage", "post", {
          ...productData,
          image: link,
        });
        setProduct((pre) => {
          pre.push(res.data as IProduct);
          return pre;
        });
        setImagePreview(null);
        setImage(null);
        setProductData({
          image: "",
          description: "",
          price: 0,
          type: "plant",
          name: "",
        });
        setVisible(false);
      }
    } catch (error) {
      toast("Something went wrong", "error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const res = await request(`product/${id}`, "delete");
      if (res.status === 200) {
        setProduct((pre) => pre.filter((p) => String(p._id) != id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res: AxiosResponse = await request("product/get");
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  useEffect(() => {
    if (!visible) {
      setIsUpdate(false);
      setProductData(null);
    }
  }, [visible]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setImagePreview(null);
    }
  }, [image]);
  return (
    <>
      <Model
        className="w-[1000px] h-fit"
        componenet={
          <div className="p-5">
            <h1
              className={
                "text-xl font-bold text-primary mb-5 " +
                BRILLANT_REGULAR.className
              }
            >
              {isUpdate ? "Update Product" : "Add Product"}
            </h1>
            <div className="flex items-center gap-20 justify-center ">
              <div className="p-5 rounded-full bg-product w-[300px] h-[400px] relative overflow-hidden shadow-lg shadow-black/20">
                <input
                  type="file"
                  id="image"
                  onChange={(e) =>
                    setImage(e.target.files && e.target.files[0])
                  }
                  className="absolute w-full h-full hidden"
                  accept="image/png"
                />
                <div className="opacity-0 hover:opacity-100 bg-black/40 transition-all duration-300 absolute w-full h-full top-0 left-0 flex items-center justify-center">
                  <Icon
                    icon={"hugeicons:image-upload-01"}
                    className="h-8 w-8 text-white cursor-pointer"
                    onClick={() => document.getElementById("image")?.click()}
                  />
                </div>
                {productData?.image || imagePreview ? (
                  <img
                    src={productData?.image || imagePreview || ""}
                    className="w-full h-full object-contain"
                    alt=""
                  />
                ) : (
                  <div className="w-full h-full items-center justify-center flex flex-col">
                    <Icon
                      icon={"hugeicons:plant-02"}
                      className="w-40 h-40 text-gray-600"
                    />
                    <h1>Please Upload Image</h1>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4 w-[300px]">
                <div className="flex flex-col">
                  <label htmlFor="name" className="font-semibold">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={productData?.name}
                    name="name"
                    onChange={(e) => {
                      setProductData((pre) => ({
                        ...pre,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                    className="border p-2 rounded-md focus:outline-primary"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="price" className="font-semibold">
                    Price *
                  </label>
                  <input
                    type="number"
                    value={productData?.price}
                    name="price"
                    onChange={(e) => {
                      setProductData((pre) => ({
                        ...pre,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                    className="border p-2 rounded-md focus:outline-primary"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="type" className="font-semibold">
                    Item Type *
                  </label>
                  <select
                    value={productData?.type}
                    name="type"
                    className="border p-2 rounded-md focus:outline-primary"
                    onChange={(e) => {
                      setProductData((pre) => ({
                        ...pre,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                  >
                    <option value="plant">Plant</option>
                    <option value="pot">Pot</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="description" className="font-semibold">
                    Description *
                  </label>
                  <textarea
                    value={productData?.description}
                    name="description"
                    onChange={(e) => {
                      setProductData((pre) => ({
                        ...pre,
                        [e.target.name]: e.target.value,
                      }));
                    }}
                    placeholder="Description..."
                    className="border p-2 rounded-md focus:outline-primary h-[80px]"
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    text={isUpdate ? "Update Product" : "Add Product"}
                    onClick={submitForm}
                    className="bg-primary text-white w-full rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        }
        visible={visible}
        setVisible={setVisible}
      />
      <div className="px-5 w-full mb-10`">
        <div className="flex justify-between items-between">
          <h1 className="text-2xl font-bold">Products</h1>
          <div>
            <Button
              text="Add Product"
              onClick={() => {
                setIsUpdate(false);
                setProductData({
                  name: "",
                  price: 0,
                  description: "",
                  type: "main",
                  image: "",
                });
                setVisible(true);
              }}
              className="border text-white bg-primary"
            />
          </div>
        </div>
        <div className="flex gap-5 mt-10 border-b-2 pb-3">
          <div className="text-primary font-bold relative cursor-pointer">
            All Products
          </div>
          <div className="cursor-pointer">Main</div>
          <div className="cursor-pointer">Sides</div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex rounded-lg bg-red-100 w-full justify-between px-5 py-3">
            <span className="w-[5%] text-center">Sr</span>
            <span className="w-[7%] text-center">Avatar</span>
            <span className="w-[18.56%] text-center">Product Name</span>
            <span className="w-[14.28%] text-center">Product Type</span>
            <span className="w-[10%] text-center">Product Price</span>
            <span className="w-[30.28%] text-center">Product Description</span>
            <span className="w-[14.28%] text-center">Actions</span>
          </div>
          <AnimatePresence>
            {products.map((product, index) => (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  type: "keyframes",
                  duration: 0.3,
                  delay: index / 10,
                }}
                exit={{ opacity: 0, x: -10 }}
                key={index}
                className="flex rounded-lg shadow-lg w-full justify-between px-5 py-3 items-center"
              >
                <span className="w-[5%] text-center border-r capitalize">
                  # {index + 1}
                </span>
                <span className="w-[7%] flex justify-center border-r text-orange-500">
                  <img src={product.image} className="h-7 w-7 rounded-full" />
                </span>
                <span className="w-[18.56%] text-center border-r text-orange-500 capitalize">
                  {product.name}
                </span>
                <span className="w-[14.28%] text-center border-r capitalize">
                  {product.type}
                </span>
                <span className="w-[10%] text-center border-r capitalize">
                  $ {product.price}
                </span>
                <span
                  className="w-[30.28%] px-2 border-r capitalize"
                  title={product.description}
                >
                  {product.description.slice(0, 60)}...
                </span>
                <span className="w-[14.28%] flex justify-center gap-2">
                  <span
                    className="p-2 rounded-lg border bg-gray-50 shadow-lg cursor-pointer"
                    onClick={() => {
                      deleteProduct(String(product._id));
                    }}
                  >
                    <Icon
                      icon="weui:delete-on-filled"
                      className="w-5 h-5 text-primary"
                    />
                  </span>
                  <span
                    className="p-2 rounded-lg border bg-gray-50 shadow-lg cursor-pointer"
                    onClick={() => {
                      setProductToUpdate(product);
                    }}
                  >
                    <Icon
                      icon="flowbite:edit-outline"
                      className="w-5 h-5 text-primary"
                    />
                  </span>
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Index;
