import Image from "next/image"
import { convertToFloatWithTwoDecimals } from "@/utils/utils"

interface ProductProps {
    name: string
    price: number
    reduced_price?: number
    image: string
    url: string
}

const Product = ({ name, price, reduced_price, image, url }: ProductProps) => {
    return (
        <div className="group">
            <div className=" rounded-xl border flex flex-col items-center text-center  group-hover:border-[#0063C1]">
                <Image src={image} width={250} height={250} alt="Template" className="rounded-xl" />
                <div className="py-2">
                    <p className="text-[#0063C1] font-medium">{name}</p>
                    <div className={reduced_price ? "flex flex-row gap-1" : ""}>
                        <p className={(reduced_price ? " text-red-700 line-through" : "")}>S/ {convertToFloatWithTwoDecimals(price)}</p><p className={reduced_price ? "font-bold" : "hidden"}> {reduced_price ? "S/ " + reduced_price : ""}</p>
                    </div>
                </div>
                <a href={url} className="w-full py-2 group-hover:bg-[#0063C1] group-hover:text-white rounded-b-xl font-semibold transition duration-200">Más Info</a>
            </div>
        </div>
    );
}

export default Product;