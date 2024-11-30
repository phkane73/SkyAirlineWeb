import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeToken } from "../Redux/reducers/AuthReducer";
import { removeSession } from "../Redux/reducers/SessionReducer";
import { getInfo } from "../Services/UserServices";
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

  useEffect(() => {
    if (auth) {
      const decodedToken = jwtDecode(auth);
      // Kiểm tra thời gian hết hạn của token
      const currentTime = Date.now() / 1000; // Chuyển đổi thời gian hiện tại thành giây
      if (decodedToken.exp < currentTime) {
        dispatch(removeToken());
        navigate("/");
      }
    }
  });

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(removeToken());
    dispatch(removeSession(auth));
    setUsername("");
    navigate("/");
  };

  return (
    <div>
      <div className="container mx-auto flex gap-7">
        <div className="logo h-[102px] w-1/4 flex">
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
              <div className="flex items-center justify-between">
                <Link to="/ticket" className="mr-5">
                  <AirplaneTicketIcon />
                  <span className="text-black">Vé của bạn</span>
                </Link>
                <i className="fa-solid fa-circle-user text-[#C6AB00] mx-2"></i>
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
