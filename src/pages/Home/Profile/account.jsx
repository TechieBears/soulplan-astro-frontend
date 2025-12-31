import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "../../../components/Sidebar/ProfileSidebar";
import { formBtn3, formBtn1 } from "../../../utils/CustomClass";
import TextInput from "../../../components/TextInput/TextInput";
import ImageCropUpload from "../../../components/TextInput/ImageCropUpload";
import {
  validateAlphabets,
  validateEmail,
  validatePhoneNumber,
} from "../../../utils/validateFunction";
import { useForm } from "react-hook-form";
import SelectTextInput from "../../../components/TextInput/SelectTextInput";
import { editUserCustomer } from "../../../api";
import toast from "react-hot-toast";
import { setUserDetails, setLoggedUser, setLoggedUserDetails } from "../../../redux/Slices/loginSlice";
import { CaretRight, Power, Trash } from "@phosphor-icons/react";

const Private = ({ children }) => children;
const UserDashboard = ({ children }) => children;

export default function AccountPage() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
    setValue,
  } = useForm();
  const [isEditable, setIsEditable] = useState(false);
  const user = useSelector((state) => state.user.userDetails);
  console.log("~ account.jsx ~ user from Redux:", user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formSubmit = async (data) => {
    const updatedData = {
      id: user?._id,
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      mobileNo: data?.mobileNo,
      image: data?.profileImage,
      gender: data?.gender
    };

    await editUserCustomer(updatedData).then((res) => {
      if (res?.success) {
        console.log(res?.data?.user);
        dispatch(setUserDetails(res?.data?.user));
        toast.success(res?.message);
        reset();
        setIsEditable(false);
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (user) {
      reset({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        mobileNo: user?.mobileNo,
        profileImage: user?.profileImage,
        gender: user?.gender
      });
    }
  }, [user, reset]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      dispatch(setLoggedUser(false));
      dispatch(setLoggedUserDetails({}));
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Logout failed");
    }
  };

  return (
    <>
      <Private>
        <UserDashboard>
          <ProfileSidebar>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h2 className="text-lg text-center font-medium  text-gray-800  p-4 font-tbLex">
                My Account
              </h2>

              <div className="flex gap-3">
                {!isEditable && (
                  <button
                    onClick={() => setIsEditable(true)}
                    className={`${formBtn3} border-b`}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onSubmit={handleSubmit(formSubmit)}
            >
              <div className="">
                <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">
                  First Name
                </h4>
                <TextInput
                  label="Enter First Name*"
                  placeholder="Enter First Name"
                  type="text"
                  registerName="firstName"
                  value={user?.firstName}
                  props={{
                    ...register("firstName", {
                      required: "First name is required",
                      validate: validateAlphabets,
                    }),
                    minLength: 3,
                    disabled: !isEditable,
                    readOnly: !isEditable,
                  }}
                  errors={errors.firstName}
                />
              </div>

              {/* Last Name */}
              <div className="">
                <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">
                  Last Name
                </h4>
                <TextInput
                  label="Enter Last Name*"
                  placeholder="Enter Last Name"
                  type="text"
                  registerName="lastName"
                  value={user?.lastName}
                  props={{
                    ...register("lastName", {
                      required: "Last name is required",
                      validate: validateAlphabets,
                    }),
                    minLength: 3,
                    disabled: !isEditable,
                    readOnly: !isEditable,
                  }}
                  errors={errors.lastName}
                />
              </div>

              {/* Email */}
              <div className="">
                <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">
                  Email{" "}
                  <span className="text-yellow-500 font-tbPop font-normal text-xs">
                    (Read Only)
                  </span>
                </h4>
                <TextInput
                  label="Enter Your Email"
                  placeholder="Enter Your Email"
                  type="text"
                  registerName="email"
                  value={user?.email}
                  props={{
                    ...register("email"),
                    valdate: validateEmail,
                    required: "Email is required",
                    disabled: true,
                    readOnly: true,
                  }}
                  errors={errors.email}
                />
              </div>

              {/* Phone */}
              <div>
                <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">
                  Phone Number
                </h4>
                <TextInput
                  label="Enter Your Phone Number"
                  placeholder="Enter Your Phone Number"
                  type="tel"
                  registerName="mobileNo"
                  value={user?.mobileNo}
                  props={{
                    ...register("mobileNo", {
                      validate: validatePhoneNumber,
                      required: true,
                    }),
                    maxLength: 10,
                    minLength: 10,
                    disabled: !isEditable,
                    readOnly: !isEditable,
                  }}
                  errors={errors.mobileNo}
                />
              </div>

              {/* Profile Image */}
              <div className="">
                <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">
                  Profile Image*
                </h4>
                <ImageCropUpload
                  label="Upload Profile Image*"
                  multiple={false}
                  registerName="profileImage"
                  errors={errors.profileImage}
                  {...register("profileImage", {
                    required: "Profile Image is required",
                  })}
                  register={register}
                  setValue={setValue}
                  control={control}
                  defaultValue={user?.profileImage}
                  cropAspectRatio={1}
                  cropHeight={300}
                  cropWidth={300}
                  shouldUploadToCloudinary={false}
                />
              </div>

              {/* Gender */}
              <div className="">
                <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">
                  Gender
                </h4>
                <div className="">
                  <SelectTextInput
                    label="Select Gender"
                    registerName="gender"
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "other", label: "Other" },
                    ]}
                    disabled={!isEditable}
                    placeholder="Select Gender"
                    props={{
                      ...register("gender", { required: true }),
                      value: watch("gender") || "",
                    }}
                    errors={errors.gender}
                  />
                </div>
              </div>

              {/* Add this wherever you want to show the currency */}
              <div className="">
                <h4 className="text-sm font-tbLex font-normal text-slate-400 pb-2.5">
                  Currency
                </h4>
                <p className="text-base font-tbLex text-gray-800">
                  {user?.currencyType || 'Not set'}
                </p>
              </div>


              {/* Action Buttons */}
              {isEditable && (
                <div className="md:col-span-2 flex gap-4 justify-self-center md:justify-self-end">
                  <button
                    type="button"
                    onClick={() => setIsEditable(false)}
                    className="px-6 py-2 border border-gray-900 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button type="submit" className={`${formBtn3}`}>
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </ProfileSidebar>
        </UserDashboard>
      </Private>
    </>
  );
}
