import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getInfo } from "../Services/UserServices";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../Redux/reducers/AuthReducer";
import { removeSession } from "../Redux/reducers/SessionReducer";
const Header = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.Auth.token);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      if (auth) {
        const data = await getInfo(auth);
        if (data) {
          setUsername(data.username);
        }
      }
    }
    fetchData();
  }, [username, auth]);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(removeToken());
    dispatch(removeSession());
    setUsername("");
    navigate("/");
  };

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
            {username === "" ? (
              <div>
                <Link className="hover:text-black transition-all" to="/login">
                  Đăng nhập
                </Link>
                <span className="hover:text-black transition-all">/</span>
                <Link
                  className="hover:text-black transition-all"
                  to="/register"
                >
                  Đăng ký
                </Link>
              </div>
            ) : (
              <div>
                <i className="fa-solid fa-circle-user text-[#C6AB00] mr-2"></i>
                <span className="text-black">Xin chào {username}</span>
                <button
                  className="hover:text-[#C6AB00] transition-all ml-4 text-black"
                  onClick={logout}
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                </button>
              </div>
            )}
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
