import logo from "../../assets/logo.png";

const Preloaders = ({ className }) => {
    return (
        <main className={`flex justify-center items-center h-screen flex-col space-y-6 ${className || "bg-slate1"} `}>
            {/* <Lottie animationData={loader} loop={true} className="w-60" /> */}
            <img src={logo} alt="Logo" className="w-24 h-24 object-contain spin-slow" />
            <p className="text-base font-tbPop font-medium text-slate-500">Please wait Loading...</p>
        </main>
    );
};

export default Preloaders;
