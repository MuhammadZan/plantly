import { Product } from "@/model/Product";
import { User } from "@/model/User";
import { connectToDb } from "@/utils/db";

const resolvers = {
  Query: {
    users: async () => {
      try {
        await connectToDb();
        const users = await User.find();
        return users;
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
      }
    },
    searchUser: async (_: any, { value }: { value: string }) => {
      try {
        await connectToDb();
        const users = await User.find({ fullName: value });
        return users;
      } catch (error) {
        throw new Error("Something went wrong");
      }
    },
    deleteUser: async (_: any, { _id }: { _id: string }) => {
      try {
        await connectToDb();
        const user = await User.findByIdAndDelete(_id);
        if (user) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        throw new Error("Something went wrong");
      }
    },
  },
};

export default resolvers;
