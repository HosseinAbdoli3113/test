import { useState } from "react";
import axios from "../core/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Alert from "../components/alert/Alert";
import InputForm from "../components/common/InputForm";

const Register = () => {
  const [phone, setPhone] = useState("");
  const [fullname, setFullname] = useState("");
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

    if (!fullname) {
      validationErrors.fullname = "رمز عبور الزامی است";
    } else if (fullname.length < 6) {
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
      await axios.post("/register", {
        //set the api
        phone,
        fullname,
      });

      setSuccess(true);
      setTimeout(() => {
        navigate("/login"); // set the route
      }, 2000);
    } catch (error) {
      console.error(error);
      setSuccess(false);
      if (error.response && error.response.status === 401) {
        setErrors({ password: "شماره موبایل یا رمز عبور اشتباه است" });
      } else {
        setErrors({ general: "خطایی رخ داده است. دوباره تلاش کنید." });
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full py-12 sm:px-6 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="mb-2">
          {success && <Alert message={"خوش آمدید!"} />}
          {errors.general && (
            <Alert error={true} errorMessage={errors.general} />
          )}
        </div>
        <div className="bg-white px-6 py-8 shadow sm:rounded-lg sm:px-12">
          <div class="text-center pb-6 text-xl text-[#442a7e]">
            <h1>ورود به حساب کاربری</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <InputForm
                label={"تلفن همراه*"}
                errorMessage={errors.phone}
                placeholder={"09130000000"}
                onChange={(value) => setPhone(value)}
                name={"phone"}
                id={"phone"}
                htmlFor={"phone"}
                value={phone}
                type={"text"}
              />

              <InputForm
                label={"نام و نام خانوادگی*"}
                errorMessage={errors.fullname}
                placeholder={"محمد محمدی"}
                onChange={(value) => setFullname(value)}
                name={"fullname"}
                id={"fullname"}
                htmlFor={"fullname"}
                value={fullname}
                type={"text"}
              />

              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#A700FE] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                ورود
              </button>
            </div>
          </form>

          <div className="flex flex-col items-center mt-6 text-sm text-gray-600">
            <div className="flex space-y-2">
              <p className="text-black font-medium">حساب کاربری دارید؟</p>
              <Link
                to="/"
                className="text-[#8162c3] pr-2 hover:text-[#442a7e] transition-colors"
              >
                ورود
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
