import React from "react";
import { HeartIcon } from "../../../admin/icons";

export default function CoopHero() {
    return (
        <>
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 dark:bg-gray-800 dark:text-gray-100">
                <h2 className="mb-8 text-4xl font-bold leadi text-center flex items-center justify-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                    You like 
                    <HeartIcon className="w-6 h-6 ml-2 text-purple-400" />
                    <HeartIcon className="w-6 h-6 ml-2 text-red-400" />
                </h2>
            </div>
        </>
    );
}
