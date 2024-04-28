import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const FormLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    //Email không được để trống
    if (!formData.password.trim()) {
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

    if (
      formData.email === "phkane732002@gmail.com" &&
      formData.password === "123456"
    ) {
      navigate("/overview");
      localStorage.setItem("auth", 1);
    } else {
      newErrors.password = "Tài khoản hoặc mật khẩu không chính xác!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("Form submitted:", formData);
      setErrors({});
    }
  };
  return (
    <div>
      <div className="min-h-screen py-32">
        <div className="container">
          <div className="bg-[#FBFFF1] rounded-xl mx-auto shadow-2xl overflow-hidden flex w-[370px]">
            <div className="py-8 px-16 relative">
              <h1 className="text-3xl font-bold uppercase mb-1">đăng nhập</h1>
              <h3 className="mb-4 text-[#6E757F] ">Hãy đăng nhập tài khoản</h3>
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
                <button
                  className="mt-5 text-white font-semibold py-2 px-10 bg-blue-700 border rounded
                hover:bg-[#C6AB00] hover:text-white transition-all float-start"
                  type="submit"
                >
                  Đăng ký
                </button>
                {/* <i
                  class="text-2xl cursor-pointer fa-solid fa-house text-blue-700 hover:text-3xl transition-all
                hover:text-[#C6AB00]"
                ></i> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
