import { FaTent } from "react-icons/fa6";

function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <FaTent className="h-9 w-9 text-primary" />
      <span className="text-2xl font-poppins text-primary">Holidaze</span>
    </div>
  );
}

export default Logo;
