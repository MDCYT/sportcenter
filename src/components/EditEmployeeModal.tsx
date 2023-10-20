"use client";

import { useSupabaseClient, useSessionContext } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation";

import Modal from "@/components/Modal";
import useEditEmployeeModal from "@/hooks/useEditEmployeeModal";
import { ChangeEvent, useEffect, useState } from "react";
import { PhotoIcon } from '@heroicons/react/24/solid'

import { toast } from "react-hot-toast";
import uniqid from "uniqid";

const CreateEmployeeModal = () => {
    const supabaseClient = useSupabaseClient();

    const router = useRouter();
    const { session } = useSessionContext();
    const { onClose, isOpen, id } = useEditEmployeeModal()
    const onChange = (open: boolean) => {
        if (!open) {
            onClose();
        }
    }

    const [employeeName, setEmployeeName] = useState('');
    const [employeeLastName, setEmployeeLastName] = useState('');
    const [employeeLastName2, setEmployeeLastName2] = useState('');
    const [employeeDocumentType, setEmployeeDocumentType] = useState('');
    const [employeeDocumentID, setEmployeeDocumentID] = useState('');

    const [employeeOldImage, setEmployeeOldImage] = useState<string | null>(null);

    useEffect(() => {
        setPreview(defaultImage)
        supabaseClient.from('profiles').select('*').eq('id', id).single()
            .then((res) => {
                console.log(res)
                if (res.data) {
                    setEmployeeName(res.data.name);
                    setEmployeeLastName(res.data.last_name_1);
                    setEmployeeLastName2(res.data.last_name_2);
                    setEmployeeDocumentType(res.data.type_document);
                    setEmployeeDocumentID(res.data.document_id);
                    if (res.data.avatar_url) setEmployeeOldImage(res.data.avatar_url)
                };
            });
    }, [id, supabaseClient])


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

    const onSelectImage2 = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }

    const [isLoading, setIsLoading] = useState(false);
    let [newImageData, setNewImageData] = useState<{ path: string } | null>()

    const onSubmit = async () => {
        setIsLoading(true)

        const uniqueID = uniqid();

        // Upload to supabase the image and get the url
        if (selectedFile) {
            const {
                data: imageData,
                error: imageError
            } = await supabaseClient
                .storage
                .from('avatars')
                .upload(`image-${uniqueID}`, selectedFile, {
                    cacheControl: '3600',
                    upsert: false
                })

            if (imageError) {
                setIsLoading(false)
                return toast.error("No hemos podido subir tu imagen, intentalo denuevo")
            }

            setNewImageData(imageData);
        }

        console.log(newImageData)

        // Edit product
        const {
            error: profileError
        } = await supabaseClient
            .from('profiles')
            .update({
                name: employeeName,
                last_name_1: employeeLastName,
                last_name_2: employeeLastName2,
                type_document: employeeDocumentType,
                document_id: employeeDocumentID,
                avatar_url: (newImageData && newImageData.path) ? newImageData.path : employeeOldImage

            }).eq("id", id)

        if (profileError) {
            console.log(profileError)
            setIsLoading(false)
            return toast.error("No hemos podido editar a tu empleado, intentalo denuevo")
        }

        router.refresh();
        setIsLoading(false);
        toast.success("Empleado editado correctamente!")
        onClose();
    }
    return (
        <Modal
            title="Editar Empleado"
            description="Estas a punto de editar a un nuevo empleado"
            isOpen={isOpen}
            onChange={onChange}
        >
            <form className="h-96 overflow-x-hidden overflow-y-scroll scrollbar-hide">
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label htmlFor="name" className="block text-sm font-medium leading-6 text-white">
                                    Nombres
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={employeeName}
                                        onChange={(e) => setEmployeeName(e.target.value)}
                                        type="text"
                                        name="name"
                                        id="name"
                                        disabled={isLoading}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="John"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="ap" className="block text-sm font-medium leading-6 text-white">
                                    Apellido Paterno
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="ap"
                                        id="ap"
                                        disabled={isLoading}

                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Doe"
                                        value={employeeLastName}
                                        onChange={(e) => setEmployeeLastName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="am" className="block text-sm font-medium leading-6 text-white">
                                    Apellido Materno
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="am"
                                        id="am"
                                        disabled={isLoading}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Perez"
                                        value={employeeLastName2}
                                        onChange={(e) => setEmployeeLastName2(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="doc" className="block text-sm font-medium leading-6 text-white">
                                    Tipo de Documento
                                </label>
                                <div className="mt-2">
                                    <select
                                        name="doc"
                                        id="doc"
                                        disabled={isLoading}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 select-all"
                                        value={employeeDocumentType}
                                        onChange={(e) => setEmployeeDocumentType(e.target.value)}
                                    >
                                        <option value="" disabled>Selecciona una opcion</option>

                                        <option value="DNI">Documento Nacional de Identidad / DNI</option>
                                        <option value="PAS">Pasaporte</option>
                                    </select>
                                </div>
                            </div>
                            <div className="sm:col-span-3">
                                <label htmlFor="am" className="block text-sm font-medium leading-6 text-white">
                                    Numero de documento
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="am"
                                        id="am"
                                        disabled={isLoading}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="72310874"
                                        value={employeeDocumentID}
                                        onChange={(e) => setEmployeeDocumentID(e.target.value)}
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
                                                htmlFor="file-upload2"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                            >
                                                <span>Sube un archivo</span>
                                                <input id="file-upload2" name="file-upload2" type="file" className="sr-only" accept="image/*" onChange={onSelectImage2} disabled={isLoading} />
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

export default CreateEmployeeModal;