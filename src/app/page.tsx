import Image from "next/image"

import Navbar from "@/components/Navbar"
import FeatureCard from "@/components/FeatureCard"
import Footer from "@/components/Footer"
import Contact from "@/components/Contact"

export default function Home() {
  return (
    <div className="bg-white rounded-lg h-full w-full text-black">
      <Navbar activeItem="Inicio" />
      <div className="h-[calc(100vh-4rem)] grid grid-cols-2 gap-2">
        <div className="flex flex-wrap flex-col	items-center align-middle justify-center">
          <div className="mx-24">
            <h1 className="text-[#0063c1] font-extrabold italic text-4xl">Sport Center</h1>
            <h2 className="font-bold italic text-3xl">Lider en ropa deportiva</h2>
            <p className="text-neutral-500 text-sm">
              Sport Center, ropa deportiva de calidad para todos los deportes. Encuentra lo que necesitas para tu próxima actividad física en nuestra amplia gama de productos.
            </p>
            <br />
            <a href={"/shop/products"}
              className={'bg-[#0063c1] text-white hover:bg-gray-700 hover:text-white rounded-3xl px-3 py-2 text-sm font-medium transition-color duration-200'
              }
            >
              Ver Productos
            </a>
          </div>
        </div>
        <div className=" flex-wrap flex-col	items-center align-middle justify-center  hidden sm:flex">
          <Image src={'/images/deportista.png'} alt="Deportista" width={600} height={600} className="bg-[url('/images/blob.svg')] bg-no-repeat bg-auto bg-center" />
        </div>
      </div>
      <div className="md:h-48 h-80 bg-[#0063C14D] grid grid-rows-1 md:grid-rows-3 flex-row">
        <div className="row-span-3 flex flex-wrap flex-col	items-center align-middle justify-center">
          <div className="flex items-center flex-col w-[100vw] md:w-auto">
            <h2 className="text-xl font-bold">
              Caracteristicas
            </h2>
            <p>
              Lo mas destacable de nuestras prendas
            </p>
          </div>
        </div>
        <div className="row-span-3 col-span-4 grid grid-cols-3 gap-3">
          <FeatureCard />
          <FeatureCard imageurl="/images/pies.svg" title="Comodidad" features={["Movimiento libre", "Sin rozaduras", "Absorbe la humedad"]} />
          <FeatureCard imageurl="/images/card.svg" title="Accesibilidad" features={["Precios competitivos", "Envío gratis", "Pago seguro"]} alternative={true} />
        </div>
      </div>
      <div className="h-[calc(100vh-4rem)] grid grid-cols-2 gap-2">
        <div className="flex flex-wrap flex-col	items-center align-middle justify-center">
          <div className="mx-24">
            <h1 className="font-bold text-4xl pb-3">Sobre Nosotros:</h1>
            <p className="text-sm text-neutral-500 pb-2">
              Somos un equipo de apasionados del deporte que creemos que la ropa deportiva debe ser más que una simple indumentaria. Debe ser cómoda, funcional y duradera. Por eso, nos comprometemos a ofrecer productos de la más alta calidad, diseñados para satisfacer las necesidades de todos los atletas, desde principiantes hasta profesionales.
            </p>
            <div className="bg-[#EBF5FF] rounded-2xl flex flex-col align-top p-4">
              <div className="flex flex-row items-start py-2">
                <Image src={'/images/confianza.svg'} height={50} width={50} alt="Icono" />
                <div className="flex grid-rows-2 gap-4 flex-col px-2">
                  <h3 className="text-xl font-semibold">Misión</h3>
                  <p className="text-sm text-neutral-500 pb-2">Ofrecer a los atletas de todas las edades la mejor ropa deportiva posible, para que puedan alcanzar sus objetivos y disfrutar de su deporte favorito.</p>
                </div>
              </div>
              <hr />
              <div className="flex flex-row items-start py-2">
                <Image src={'/images/vision.svg'} height={50} width={50} alt="Icono" />
                <div className="flex grid-rows-2 gap-4 flex-col px-2">
                  <h3 className="text-xl font-semibold">Visión</h3>
                  <p className="text-sm text-neutral-500 pb-2">Ser la tienda de ropa deportiva preferida por todos los atletas, ofreciendo productos de la más alta calidad, comodidad y accesibilidad.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap flex-col	items-center align-middle justify-center">
          <Image src={'/images/mujer.png'} alt="Deportista" width={450} height={450} className="border-xl" />
        </div>
      </div>
      <div
        className="flex flex-col items-center justify-center bg-[url('/images/bg.png')] bg-no-repeat bg-auto bg-center bg-[#0063C1] text-white py-10 h-[75vh]">
        <div className="w-2/6 items-center flex flex-col">
          <h2 className="text-4xl font-bold text-center">Ya nos conoces Ahora Viste tu sueño</h2>
          <p className="text-center text-sm py-4">
            Ahora que sabes más sobre nosotros, te invitamos a explorar nuestro catálogo de productos. Encuentra la ropa deportiva perfecta para ti, sea cual sea tu deporte o nivel de condición física.
          </p>
          <a href={"/shop"}
            className={'bg-white text-black hover:bg-gray-700 hover:text-white rounded-xl px-8 py-2 font-medium transition-color duration-200 text-center mt-4'
            }
          >
            Ver Catalogo
          </a>
        </div>
      </div>
      <div className="min-h-[90vh]">
        <div className="py-28 px-2 sm:px-14 md:px-28">
          <h2 className="font-semibold text-2xl">Nuestros Productos:</h2>
          <p className="text-neutral-500 pb-4">Tenemos los mejores productos a los mejores precios para:</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="w-full h-80 bg-[url('/images/hombre.png')] bg-no-repeat bg-auto bg-center rounded-2xl group">
              <div className="bg-[#00000088] h-full w-full rounded-2xl text-white hidden group-hover:flex flex-col p-8 transition-opacity duration-100 opacity-0 group-hover:opacity-100">
                <p className="py-2 px-0 text-xs md:px-8 md:text-base md:py-8 text-center">
                  Ropa deportiva cómoda, funcional y de moda para hombres que buscan rendir al máximo.
                </p>
                <a className="text-center w-full h-8 py-8 font-semibold" href="/category/3">
                  Ver Productos
                </a>
              </div>
              <h3 className="bg-[#00000088] text-white w-full h-8 group-hover:hidden text-center mt-56 font-bold text-lg">Hombres</h3>
            </div>
            <div className="w-full h-80 bg-[url('/images/niño.png')] bg-no-repeat bg-auto bg-center rounded-2xl group">
              <div className="bg-[#00000088] h-full w-full rounded-2xl text-white hidden group-hover:flex flex-col p-8 transition-opacity duration-100 opacity-0 group-hover:opacity-100">
                <p className="py-2 px-0 text-xs md:px-8 md:text-base md:py-8 text-center">
                  Ropa deportiva cómoda, funcional y de moda para niños que buscan rendir al máximo.
                </p>
                <a className="text-center w-full h-8 py-8 font-semibold" href="/category/4">
                  Ver Productos
                </a>
              </div>
              <h3 className="bg-[#00000088] text-white w-full h-8 group-hover:hidden text-center mt-56 font-bold text-lg">Niños</h3>
            </div>
            <div className="w-full h-80 bg-[url('/images/mujer2.png')] bg-no-repeat bg-auto bg-center rounded-2xl group">
              <div className="bg-[#00000088] h-full w-full rounded-2xl text-white hidden group-hover:flex flex-col p-8 transition-opacity duration-100 opacity-0 group-hover:opacity-100">
                <p className="py-2 px-0 text-xs md:px-8 md:text-base md:py-8 text-center">
                  Ropa deportiva cómoda, funcional y de moda para mujeres que buscan rendir al máximo.
                </p>
                <a className="text-center w-full h-8 py-8 font-semibold" href="/category/2">
                  Ver Productos
                </a>
              </div>
              <h3 className="bg-[#00000088] text-white w-full h-8 group-hover:hidden text-center mt-56 font-bold text-lg">Mujeres</h3>
            </div>
          </div>
        </div>
      </div>
      <Contact/>
      <Footer/>
    </div>
  )
}
