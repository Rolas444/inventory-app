// import { read } from "fs";
import { useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { toast } from "sonner";
import { CiImageOn } from "react-icons/ci";

const InputImageControlled = ({ name, control, label, errors, rules, }) => {

    const inpurRef = useRef(null);
    const [files, setFiles] = useState([]);
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
                <div className="group d-inline-block position-relative opacity-trigger-hover">
                    <div className="absolute w-full  bottom-0 opacity-0 group-hover:opacity-100">
                    </div>
                    <input
                        ref={inpurRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, field)}
                        hidden
                    />
                    {
                        files.length > 0 ? (
                            <div className="w-24 h-24">
                                <img src={files} alt="preview" className="w-full h-full object-cover" />
                            </div>) : (<>
                                <CiImageOn  className=" w-full h-auto align-center"/>
                            </>)
                    }
                </div>
            </>)}
        />
    </>)
}

export default InputImageControlled;