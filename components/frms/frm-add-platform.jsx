'use client'
import { useForm } from "react-hook-form";
import { useState } from "react";
import InputControlled from "../ui/input-controlled";
import SelectControlled from "../ui/select-controlled";

const FrmAddPlatform = () => {

    const [modalLoading, setModalLoading] = useState(false);
    const { control, handleSubmit, watch } = useForm()
    const [platforms, setPlatforms] = useState([])

    const onSubmit = () => {

    }

    return (<>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full">
                    <SelectControlled name='type' control={control} label='Plataforma' rules={{ required: false }} options={platforms} />

                </div>
                <div className="w-full flex justify-between gap-2">

                    <div className="w-full">
                        <InputControlled name={'qty'} type="number" control={control} label='Cantidad Ofertada' rules={{ required: false }} />
                        
                    </div>
                    <div className="w-full">
                    <InputControlled name='precio' type="number" control={control} label='Precio' rules={{ required: false }} />
                    </div>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary" disabled={modalLoading}>Guardar</button>
                </div>
            </form>
        </div>
    </>)
}

export default FrmAddPlatform;