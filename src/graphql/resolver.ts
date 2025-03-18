import { Product } from "@/model/Product";
import { User } from "@/model/User";
import { connectToDb } from "@/utils/db";

const resolvers = {
  Query: {
    users: async () => {
      try {
        await connectToDb();
        return await User.find();
      } catch (error) {
        throw new Error("Something went wrong");
      }
    },
    products: async () => {
      try {
        await connectToDb();
        return await Product.find();
      } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
      }
    },
    searchUser: async (_: any, { value }: { value: string }) => {
      try {
        await connectToDb();
        return await User.find({ fullName: new RegExp(value, "i") });
      } catch (error) {
        throw new Error("Something went wrong");
      }
    },
  },
  Mutation: {
    createProduct: async (
      _: any,
      {
        name,
        image,
        description,
        price,
        type,
      }: {
        name: string;
        image: string;
        description: string;
        price: number;
        type: string;
      }
    ) => {
      try {
        await connectToDb();
        const newProduct = new Product({
          name,
          image,
          description,
          price,
          type,
        });
        return await newProduct.save();
      } catch (error) {
        throw new Error("Something went wrong");
      }
    },
    updateProduct: async (
      _: any,
      {
        _id,
        name,
        image,
        description,
        price,
        type,
      }: {
        _id: string;
        name?: string;
        image?: string;
        description?: string;
        price?: number;
        type?: string;
      }
    ) => {
      try {
        await connectToDb();
        return await Product.findByIdAndUpdate(
          _id,
          { name, image, description, price, type },
          { new: true }
        );
      } catch (error) {
        throw new Error("Something went wrong");
      }
    },
    deleteProduct: async (_: any, { _id }: { _id: string }) => {
      try {
        await connectToDb();
        const product = await Product.findByIdAndDelete(_id);
        return product ? true : false;
      } catch (error) {
        throw new Error("Something went wrong");
      }
    },
    deleteUser: async (_: any, { _id }: { _id: string }) => {
      try {
        await connectToDb();
        const user = await User.findByIdAndDelete(_id);
        return user ? true : false;
      } catch (error) {
        throw new Error("Something went wrong");
      }
    },
  },
};

export default resolvers;
