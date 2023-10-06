import Image from "next/image"

const Contact = () => {
    return ( 
        <div className="h-[90vh] bg-[url('/images/bgcontact.png')] bg-no-repeat bg-auto bg-center">
        <div className="h-[calc(100vh-4rem)] grid grid-cols-2 gap-2 text-white">
          <div className="flex flex-wrap flex-col	items-center align-middle justify-center">
            <div className="mx-24 text-center flex flex-col items-center justify-center">
              <h1 className="font-extrabold text-4xl">Contactanos</h1>
              <p className="text-sm py-4">
              ¿Tienes alguna pregunta? ¡No dudes en contactarnos! Estamos aquí para ayudarte a encontrar la ropa deportiva perfecta para ti. Puedes escribirnos a whatsapp o llamarnos al 999 999 999.
              </p>
              <br />
              <a href={"/contact"}
                className={'bg-[#25D366] text-white hover:bg-gray-700 hover:text-white rounded-3xl px-3 py-2 text-sm font-medium transition-color duration-200 flex flex-row text-center items-center justify-center w-1/2'
                }
              >
                <Image src={'/images/whatsapp.svg'} width={20} height={20} alt="WhatsApp Logo"/>
                <p className="px-3">Contactanos via WhatsApp</p>
              </a>
            </div>
          </div>
        </div>
      </div>
     );
}
 
export default Contact;