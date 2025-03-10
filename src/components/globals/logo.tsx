import { BRILLANT_REGULAR } from "@/app/fonts";
import logo from "@/app/images/logo.png";
import Image from "next/image";
const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={`${className}`}>
      <div className="relative flex items-center w-[250px]">
        <Image
          src={logo}
          className="w-[75px] object-contain"
          alt="florra haven"
        />
        <h1 className={`${BRILLANT_REGULAR.className} text-2xl -ml-8 mt-5`}>Plantly</h1>
      </div>
    </div>
  );
};

export default Logo;
