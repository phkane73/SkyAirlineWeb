import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className="container mx-auto flex gap-7">
        <div className="logo h-[110px] w-1/4 flex">
          <Link to="/">
            <img
              src="/../../Assets/images/logo.jpg"
              alt="logo"
              className="h-[100%] w-[100%]"
            />
          </Link>
        </div>
        <div className="main-header w-3/4">
          <div className="h-[50px] flex items-center justify-between text-[#C6AB00] uppercase">
            <div>Hotline: 1900 9373</div>
            <div>
              <Link className="hover:text-black transition-all" to="/login">
                Đăng nhập
              </Link>
              <span className="hover:text-black transition-all">/</span>
              <Link className="hover:text-black transition-all" to="/register">
                Đăng ký
              </Link>
            </div>
          </div>
          <div className="h-[60px]leading-[60px] uppercase font-bold text-xl text-[#2D7690]">
            <ul className="flex gap-5 justify-end">
              <Link to="/">
                <li className="hover:text-black transition-all">Trang chủ</li>
              </Link>
              <li className="hover:text-black transition-all">
                Tra cứu chuyến bay
              </li>
              <li className="hover:text-black transition-all">
                Các điểm đến thú vị
              </li>
              <li className="hover:text-black transition-all">Trợ giúp</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
