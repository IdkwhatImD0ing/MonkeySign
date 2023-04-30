import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-[80px] font-lexend-deca px-[24px] text-[#181818]">
      <div className="flex items-center gap-4">
        <Link to="/">
          <img
            src="monkeysign-logo2.svg"
            alt="monkeysign-logo"
            className="w-[200px] cursor-pointer"
          />
        </Link>
        <Link to="/play" className="hover:text-[#cd75cf] hover:cursor-pointer">
          play
        </Link>
        <Link to="/about" className="hover:text-[#cd75cf] hover:cursor-pointer">
          info
        </Link>
      </div>

      <div>
        <Link className="hover:text-[#cd75cf] hover:cursor-pointer">
          account
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
