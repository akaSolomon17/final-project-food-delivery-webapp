import React from 'react'
import { FaSquareXTwitter, FaSquareFacebook, FaLinkedin, FaSquareInstagram } from "react-icons/fa6";

const Footer = () => {
    return (
        <div>
            <div className="page-footer w-full h-[20rem] mt-14 border-t-1 shadow-inner bg-[#f7fafc93] flex flex-col justify-center select-none">
                <h1 className="font-semibold font-sans ms-[21rem] text-lg">Deok Sun Korean Food.</h1>
                <div className="flex footer-info self-center mt-[1rem] justify-center">
                    <ul className="flex flex-col me-[8rem]  gap-3">
                        <p className="font-sans font-semibold">Contact us</p>
                        <li>doeksunkor@gmail.com</li>
                        <li>+1-2345-6789</li>
                        <li>123 Bach Dang, Da Nang, Vietnam</li>
                        <li className="flex gap-3">
                            <FaSquareFacebook className="size-5" />
                            <FaSquareXTwitter className="size-5" />
                            <FaLinkedin className="size-5" />
                            <FaSquareInstagram className="size-5" />
                        </li>
                    </ul>
                    <ul className="flex flex-col me-[8rem] gap-3">
                        <p className="font-sans font-semibold">Product</p>
                        <li>Korean foods</li>
                        <li>Soju</li>
                        <li>Ramen</li>
                        <li>Tokbokki</li>
                    </ul>
                    <ul className="flex flex-col me-[8rem] gap-3">
                        <p className="font-sans font-semibold">About</p>
                        <li></li>
                        <li>+1-2345-6789</li>
                        <li>123 Bach Dang, Da Nang, Vietnam</li>
                        <li></li>
                    </ul>
                    <ul className="flex flex-col gap-1">
                        <p className="font-sans font-semibold">Get the app</p>
                        <li><img src="badges\apple-badge.png" alt="Apple Badge" className="mt-3" /></li>
                        <li><img src="badges\google-badge.png" alt="Google Badge" className="max-w-[45%] mt-3" /></li>
                    </ul>
                </div>
                <span className="text-default w-full font-normal text-right pe-[30rem] mt-10">Copyright © 2020. All rights reserved.</span>
            </div>
        </div>
    )
}

export default Footer