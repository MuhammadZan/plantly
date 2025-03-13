import Link from "next/link";
import { Cart, Favourit, Search, User } from "../Icons";
import Logo from "./logo";
import SwipableTextButton from "./SwipableTextButton";
import { useCart } from "@/context/cartContext";
import { useUser } from "@/context/userContext";

const Header = () => {
  const { setShowCart } = useCart();
  const { setShowLoginForm } = useUser();
  return (
    <div className="container mx-auto px-10 pt-4 relative z-30">
      <div className="flex justify-between items-center">
        <div>
          <Logo />
        </div>
        <div>
          <div className="flex gap-10 item-center">
            {[
              { link: "/", text: "home" },
              { link: "/explore", text: "product" },
              { link: "/contact", text: "contact" },
              { link: "/news", text: "news" },
            ].map(({ link, text }, index) => (
              <Link key={index} href={link}>
                <SwipableTextButton
                  text={text}
                  className="hover:text-primary"
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex gap-5 items-center w-[250px] justify-end">
          <Search />
          <Cart onClick={() => setShowCart(true)} />
          <Favourit />
          <User onClick={() => setShowLoginForm(true)} />
        </div>
      </div>
    </div>
  );
};

export default Header;
