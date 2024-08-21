// import { read } from "fs";
import { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { CiImageOn } from "react-icons/ci";
import { RiImageEditFill } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { GetUrlBucketSupabase } from "@/lib/tools";

const InputImageControlled = ({ name, control, label, errors, rules }) => {

    const inpurRef = useRef(null);
    const [files, setFiles] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [uriViewer, setUriViewer] = useState(null);

    const handleFileChange = async (e, field) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            // reader.onload = (e) => {
            //     setUriViewer(e.target.result);
            // }
            reader.onloadend = () => {
                if (!file.type.includes('image')) {
                    toast.warning('El archivo seleccionado no es una imagen')
                    return;
                }

                const fileSizeInMB = file.size / (1024 * 1024);
                if (fileSizeInMB > 5) {
                    toast.warning('El archivo seleccionado excede el tamaño máximo de 5MB');
                    return;
                }

                setFiles(reader.result)
                field.onChange(reader.result);
                // setUriViewer(reader.result);
            }
            // reader.readAsDataURL(file);
            // setFiles([...files, file]);
            // field.onChange(file);
            reader.onerror = (err) => {
                // console.log(err)
                toast.error('Error al cargar la imagen ' + err)
            }

            reader.readAsDataURL(file);
        }
    }

    return (<>
        <Controller
            name={name}
            control={control}
            render={({ field }) => {

                const imageView = files.length > 0 ? files : GetUrlBucketSupabase(field.value);

                return (<>
                    <div className="group w-full d-inline-block position-relative opacity-trigger-hover p-2 group">
                        <div className="">
                            <label>{label}</label>
                        </div>
                        <input
                            ref={inpurRef}
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, field)}
                            hidden
                        />
                        <div className="w-full flex-col  relative">
                            {
                                field?.value?.length > 0 ? (

                                    <img src={imageView} alt="preview" className="w-full  h-auto align-center object-cover" />
                                ) : (<>

                                    <CiImageOn className=" w-full h-auto align-center" />

                                </>)
                            }
                            <div className="w-full bg-black bg-opacity-70 bottom-0 text-white text-center p-2 mt-4 absolute bottom-0 left-0 right-0  opacity-0 group-hover:opacity-80 transition-opacity duration-300">
                                <div className="w-full flex justify-between ">
                                    <button type="button" onClick={() => inpurRef.current.click()} ><RiImageEditFill className="w-6 h-6" /></button>
                                    {field.value?.length > 0 && <button type="button" onClick={() => field.onChange('')} ><MdDeleteOutline className="w-6 h-6" /></button>}
                                </div>
                            </div>
                        </div>
                    </div>
                </>)
            }
            }
        />
    </>)
}

export default InputImageControlled;