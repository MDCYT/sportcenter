import Image from "next/image"

const Footer = () => {
  return (
    <div className="h-64 bg-black flex flex-row text-white">
      <div className="h-full items-center justify-center flex flex-col mx-8">
        <Image src={"/images/logo.png"} width={200} height={200} alt="Logo Empresa" />
        <p className="italic pb-4 text-sm">© SportCenter.</p>
        <div className="flex flex-row gap-3">
          <a href="#">
            <Image src={"/images/logo-facebook.svg"} width={20} height={20} alt="Facebook Logo" />
          </a>
          <a href="#">
            <Image src={"/images/logo-instagram.svg"} width={20} height={20} alt="Facebook Logo" />
          </a>
          <a href="#">
            <Image src={"/images/logo-tiktok.svg"} width={20} height={20} alt="Facebook Logo" />
          </a>
          <a href="#">
            <Image src={"/images/logo-whatsapp.svg"} width={20} height={20} alt="Facebook Logo" />
          </a>
        </div>
      </div>
      <div className="h-full w-full flex flex-col items-center justify-center text-center">
        <div className="flex flex-row justify-between w-[72%] py-4 text-xs sm:text-lg gap-2">
          <a href="#">Ropa de hombre</a>
          <a href="#">Ropa de mujer</a>
          <a href="#">Ropa de niño</a>
        </div>
        <hr className="bg-white text-white border-white w-[80%]" />
        <div className="flex flex-row justify-between w-[72%] py-4 text-xs sm:text-lg gap-2">
          <a href="#">Inicio</a>
          <a href="#">Productos</a>
          <a href="#">Contactanos</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;