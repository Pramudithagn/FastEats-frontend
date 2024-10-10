import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

const AdminNavbar = ({ handleOpenSideBar }) => {
  return (
    <div className="sticky px-5 z-50 py-[.8rem] bg-[#212529] lg:px-20 flex justify-between">
      <div className="flex items-center space-x-4">
        <div className="lg:mr-10 cursor-pointer flex items-center space-x-4">
          <div className="lg:hidden">
            <IconButton onClick={handleOpenSideBar}>
              <MenuIcon />
            </IconButton>
          </div>
          <li className="logo font-semibold text-gray-300 text-2xl pl-16 lg:pl-0">
            Fast Eats
          </li>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
