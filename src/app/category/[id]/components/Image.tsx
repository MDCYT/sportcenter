"use client"

import useLoadImage from "@/hooks/useLoadImage";

interface ImageProps {
    product: any
}

import Image from "next/image";


const Image2 = ({ product }: ImageProps) => {
    const imagePath = useLoadImage(product);

    return (
        <div className="flex items-center justify-center">

            <Image src={imagePath || "/images/template.png"} width={400} height={400} alt="Image" />
        </div>

    );
}

export default Image2;