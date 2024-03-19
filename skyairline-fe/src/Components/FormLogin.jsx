import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Services/UserServices";
import { setToken } from "../Redux/reducers/AuthReducer";
import { useDispatch } from "react-redux";
const FormLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    error: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    //Email không được để trống
    if (!formData.email.trim()) {
      newErrors.email = "Vui lòng nhập địa chỉ email";
    }
    //Mật khẩu k được bỏ trống
    if (!formData.password.trim()) {
      newErrors.password = "Vui lòng nhập mật khẩu";
    } else {
      //Mật khẩu phải từ 6 đến 20 kí tự
      if (formData.password.length < 6 || formData.password.length > 20) {
        newErrors.password = "Mật khẩu phải từ 6 đến 20 kí tự";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const data = await login(formData.email, formData.password);
      if (data === false) {
        newErrors.error = "Sai tài khoản hoặc mật khẩu!";
        setErrors(newErrors);
      } else {
        dispatch(setToken(data));
        navigate(-1);
      }
    }
  };
  return (
    <div>
      <div className="min-h-screen py-32">
        <div>
          <div className="w-8/12 bg-[#FBFFF1] rounded-xl mx-auto shadow-2xl overflow-hidden flex">
            <div className="w-1/2 bg-img"></div>
            <div className="w-1/2 py-8 px-16 relative">
              <Link to="/">
                <i
                  className="fa-solid fa-house cursor-pointer text-2xl text-blue-700 
              float-end absolute top-2 right-4 hover:text-[#C6AB00] transition-all"
                ></i>
              </Link>
              <h1 className="text-3xl font-bold uppercase mb-1">
                Chào mừng bạn đã quay lại!
              </h1>
              <h3 className="mb-4 text-[#6E757F] ">
                Hãy đăng nhập tài khoản để đặt vé máy bay
              </h3>
              <form onSubmit={handleSubmit}>
                <label className="block mt-5">
                  <span className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </span>
                  <input
                    className={`peer border border-gray-400 py-2 px-2
                  rounded focus:border-[#C6AB00] focus:outline-none w-full
                  ${!errors.email ? "border-gray-400" : "border-red-400"}`}
                    type="email"
                    name="email"
                    placeholder="Nhập địa chỉ Email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs absolute">
                      {errors.email}
                    </p>
                  )}
                  <p className="invisible peer-invalid:visible text-red-500 text-xs absolute">
                    Địa chỉ email không hợp lệ
                  </p>
                </label>
                <label className="block mt-6">
                  <span className="block text-sm font-medium text-slate-700 mb-2">
                    Mật khẩu
                  </span>
                  <input
                    className={`peer border border-gray-400 py-2 px-2
                  rounded focus:border-[#C6AB00] focus:outline-none w-full
                  ${!errors.password ? "border-gray-400" : "border-red-400"}`}
                    type="password"
                    name="password"
                    placeholder="Nhập mật khẩu"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs absolute">
                      {errors.password}
                    </p>
                  )}
                </label>
                <p className="text-red-500 text-xs absolute">{errors.error}</p>
                <button
                  className="mt-5 text-white font-semibold py-2 px-10 bg-blue-700 border rounded
                hover:bg-[#C6AB00] hover:text-white transition-all float-start"
                  type="submit"
                >
                  Đăng nhập
                </button>
              </form>
              <div className="mt-5 cursor-default float-end">
                Bạn chưa có tài khoản hãy{" "}
                <Link
                  to="/register"
                  className="text-blue-700 font-semibold cursor-pointer hover:text-[#C6AB00]"
                >
                  đăng ký tài khoản.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
