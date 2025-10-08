import React from "react";
import Lottie from "lottie-react";
import loader from "../../assets/loader.json";

const Preloaders = () => {
    return (
        <main className="flex justify-center items-center h-screen flex-col space-y-6 bg-slate1 ">
            <Lottie animationData={loader} loop={true} className="w-60" />
            <p className="text-base font-tbPop font-medium text-slate-500">Please wait Loading...</p>
        </main>
    );
};

export default Preloaders;
