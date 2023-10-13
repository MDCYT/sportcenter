"use client";

import { useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation";

import Modal from "@/components/Modal";
import useCreateProductModal from "@/hooks/useCreateProductModal";
import { ChangeEvent, useEffect, useState } from "react";
import { PhotoIcon } from '@heroicons/react/24/solid'

import { toast } from "react-hot-toast";
import uniqid from "uniqid";

const CreateProductModal = () => {
    const supabaseClient = useSupabaseClient();

    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen } = useCreateProductModal()

    const [categories, setCategories] = useState<{ name: string; id: number }[]>([]);

    useEffect(() => {
        supabaseClient.from('category').select('*')
            .then((res) => {
                console.log(res)
                if (res.data) return setCategories(res.data);
            });
    }, [session, router, onClose, supabaseClient])

    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productSmallPrice, setProductSmallPrice] = useState('');
    const [productTalle, setProductTalle] = useState(['']);
    const [productCategory, setProductCategory] = useState('');
    const [productStock, setProductStock] = useState('');
    const [productSmallDescription, setProductSmallDescription] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const onSelectValues = (value: string) => {
        //If not in the array, add in the arry, if is in the array delete them
        if (productTalle.includes(value)) {
            setProductTalle(productTalle.filter(item => item !== value));
        } else {
            setProductTalle([...productTalle, value]);
        }
    };

    const defaultImage = "/images/adidas.png"

    const [selectedFile, setSelectedFile] = useState<File>()
    const [preview, setPreview] = useState<string>(defaultImage)

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            setPreview(defaultImage)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async () => {
        setIsLoading(true)

        // Convert price, smallPrice and stock to number
        const productPriceNumber = Number(productPrice)
        const productSmallPriceNumber = Number(productSmallPrice)
        const productStockNumber = Number(productStock)
        const productCategoryNumber = Number(productCategory)

        // Check if is a number
        if (isNaN(productPriceNumber)) {
            setIsLoading(false);
            return toast.error("El precio no es un numero")
        }
        if (isNaN(productSmallPriceNumber)) {
            setIsLoading(false);
            return toast.error("El precio de las ofertas no es un numero")
        }
        if (isNaN(productStockNumber)) {
            setIsLoading(false);
            return toast.error("El stock no es un numero")
        }
        if (isNaN(productCategoryNumber)) {
            setIsLoading(false);
            return toast.error("La categoria no valida")
        }

        // Check if stock is a int, not float
        if (productStockNumber % 1 !== 0) {
            setIsLoading(false);
            return toast.error("El stock debe ser un numero entero")
        }

        // Check if number is not negative
        if (productPriceNumber < 0) {
            setIsLoading(false);
            return toast.error("El precio no puede ser negativo")
        }
        if (productSmallPriceNumber < 0) {
            setIsLoading(false);
            return toast.error("El precio de las ofertas no puede ser negativo")
        }
        if (productStockNumber < 0) {
            setIsLoading(false);
            return toast.error("El stock no puede ser negativo")
        }

        // Check if exist image 
        if (!selectedFile) {
            setIsLoading(false);
            return toast.error("Debes subir una imagen")
        }

        //Check if exist category
        const {
            data: categoryData,
            error: categoryError
        } = await supabaseClient.from('category').select('*').eq('id', productCategoryNumber).single()

        if(categoryError){
            setIsLoading(false);
            return toast.error("Error al verificar la categoria")
        }

        if(categoryData === null){
            setIsLoading(false);
            return toast.error("Categoria no encontrada, seleccione otra")
        }

        // Check productTalle, Talle is a Array, convert to a string like A, B, C, if exist empty string in the array, delete them, if dont have items, is null
        const productTalleString = productTalle.filter(item => item !== '').join(', ')

        const uniqueID = uniqid();

        // Upload to supabase the image and get the url
        const {
            data: imageData,
            error: imageError
        } = await supabaseClient
            .storage
            .from('products')
            .upload(`image-${uniqueID}`, selectedFile, {
                cacheControl: '3600',
                upsert: false
            })

        if (imageError) {
            setIsLoading(false)
            return toast.error("No hemos podido subir tu imagen, intentalo denuevo")
        }

        // Add new product
        const {
            error: productError
        } = await supabaseClient
            .from('product')
            .insert({
                name: productName,
                description: productSmallDescription,
                large_description: productDescription,
                price: productPriceNumber,
                reduced_price: productSmallPriceNumber,
                size: productTalleString,
                stock: productStockNumber,
                category: productCategoryNumber,
                image_url: imageData.path,
            })

        if(productError) {
            setIsLoading(false)
            return toast.error("No hemos podido agregar tu producto, intentalo denuevo")
        }

        router.refresh();
        setIsLoading(false);
        toast.success("Producto agregado correctamente!")
        onClose();
    }
    return (
        <Modal
            title="Nuevo Producto"
            description="Estas a punto de crear un nuevo producto"
            isOpen={isOpen}
            onChange={onChange}
        >
            <form className="h-96 overflow-x-hidden overflow-y-scroll scrollbar-hide">
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
                                    Nombre del producto
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        type="text"
                                        name="name"
                                        id="name"
                                        disabled={isLoading}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Polo Deportivo de Mujer"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="normal-price" className="block text-sm font-medium leading-6 text-white">
                                    Precio Normal
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="normal-price"
                                        id="normal-price"
                                        disabled={isLoading}

                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="9.99"
                                        step={0.01}
                                        value={productPrice}
                                        onChange={(e) => setProductPrice(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-price" className="block text-sm font-medium leading-6 text-white">
                                    Precio Rebajado
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="last-price"
                                        id="last-price"
                                        disabled={isLoading}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="7.99"
                                        value={productSmallPrice}
                                        onChange={(e) => setProductSmallPrice(e.target.value)}
                                        step={0.01}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="talla" className="block text-sm font-medium leading-6 text-white">
                                    Talla
                                </label>
                                <div className="mt-2">
                                    <select
                                        name="talla"
                                        id="talla"
                                        disabled={isLoading}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 select-all"
                                        multiple
                                        value={productTalle}
                                        onChange={(e) => onSelectValues(e.target.value)}
                                    >
                                        <option value="XS">XS</option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="category" className="block text-sm font-medium leading-6 text-white">
                                    Categoria
                                </label>
                                <div className="mt-2">
                                    <select
                                        name="category"
                                        id="category"
                                        disabled={isLoading}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 select-all"
                                        value={productCategory}
                                        onChange={(e) => setProductCategory(e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>Seleccione una categoría</option>
                                        {
                                            categories.map((category) => (
                                                <option key={category.id} value={category.id}>{category.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="stock" className="block text-sm font-medium leading-6 text-white">
                                    Stock
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="stock"
                                        id="stock"
                                        disabled={isLoading}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="10"
                                        value={productStock}
                                        onChange={(e) => setProductStock(e.target.value)}
                                        step={1}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="small-description" className="block text-sm font-medium leading-6 text-white">
                                    Descripcion Corta
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="small-description"
                                        name="small-description"
                                        type="text"
                                        disabled={isLoading}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={productSmallDescription}
                                        onChange={(e) => setProductSmallDescription(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-6">
                                <label htmlFor="big-description" className="block text-sm font-medium leading-6 text-white">
                                    Descripcion Larga
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="big-description"
                                        name="big-description"
                                        disabled={isLoading}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={productDescription}
                                        onChange={(e) => setProductDescription(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-white-900">
                                    Foto
                                </label>
                                { /*eslint-disable-next-line @next/next/no-img-element*/}
                                <img src={preview} alt={"Imagen del producto"} className={((preview === defaultImage) ? "hidden" : "")} />
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white-900/25 px-6 py-10 bg-white">
                                    <div className="text-center">
                                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Sube un archivo</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={onSelectFile} disabled={isLoading} />
                                            </label>
                                            <p className="pl-1">o arrastra y suelta uno aqui</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG hasta de 10MB</p>
                                    </div>
                                    image</div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-white" disabled={isLoading}>
                        Cancelar
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            onSubmit()
                        }}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Guardar
                    </button>
                </div>
            </form>
        </Modal>
    );
}

export default CreateProductModal;