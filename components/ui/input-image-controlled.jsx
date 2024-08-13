// import { read } from "fs";
import { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { CiImageOn } from "react-icons/ci";
import { RiImageEditFill } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";

const InputImageControlled = ({ name, control, label, errors, rules, }) => {

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
            render={({ field }) => (<>
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
                    <div className="w-full flex-col cursor-pointer relative">
                    {
                        files.length > 0 ? (
                            
                                <img src={files} alt="preview" className="w-full  h-auto align-center object-cover" />
                            ) : (<>
                                
                                <CiImageOn onClick={()=>inpurRef.current.click()}  className=" w-full h-auto align-center"/>
                                
                            </>)
                    }
                    <div className="w-full bg-black bg-opacity-70 bottom-0 text-white text-center p-2 mt-4 absolute bottom-0 left-0 right-0  opacity-0 group-hover:opacity-80 transition-opacity duration-300">
                        <div className="w-full flex justify-between ">
                            <button ><RiImageEditFill className="w-6 h-6"/></button>
                            {files.length >0 && <button ><MdDeleteOutline className="w-6 h-6" /></button>}
                        </div>
                    </div>
                    </div>
                </div>
            </>)}
        />
    </>)
}

export default InputImageControlled;