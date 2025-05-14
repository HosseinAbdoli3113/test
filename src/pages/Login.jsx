import { useState } from "react";
import axios from "../core/axios";
import { useNavigate } from "react-router-dom";
import Alert from "../components/alert/Alert";
import { Link } from "react-router-dom";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const validate = () => {
    const validationErrors = {};
    const phoneRegex = /^09\d{9}$/;

    if (!phone) {
      validationErrors.phone = "شماره موبایل الزامی است";
    } else if (!phoneRegex.test(phone)) {
      validationErrors.phone = "شماره موبایل معتبر نیست";
    }

    if (!password) {
      validationErrors.password = "رمز عبور الزامی است";
    } else if (password.length < 6) {
      validationErrors.password = "رمز باید حداقل ۶ کاراکتر باشد";
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSuccess(false);
      return;
    }

    try {
      const response = await axios.post("/login", {
        //set the api
        phone,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setSuccess(true);
        setTimeout(() => {
          navigate(""); // set the route
        }, 2000);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error(error);
      setSuccess(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full py-12 sm:px-6 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        {success && <Alert message={"ورود موفقیت‌آمیز بود"} />}
        {success === false && (
          <Alert error={!success} errorMessage={"ورود ناموفق بود"} />
        )}

        <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  تلفن همراه
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  رمز عبور
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-2 outline-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#A700FE] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                ورود
              </button>
            </div>
          </form>

          <div className="mt-4 text-sm text-center text-blue-600 cursor-pointer">
            <Link to={"/register"} className="">
              ثبت نام
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
