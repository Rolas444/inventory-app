'use client'
import { useForm } from "react-hook-form";
import { useState } from "react";
import InputControlled from "../ui/input-controlled";
import SelectControlled from "../ui/select-controlled";

const FrmAddTransaction = () => {

    const [modalLoading, setModalLoading] = useState(false);
    const [typeTransactions, setTypeTransactions] = useState([])
    const [tOps, setTOps] = useState([])
    const { control, handleSubmit,watch } = useForm()

    const onSubmit=()=>{

    }

    return (<>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex justify-between gap-2">
                    <div className="w-full">
                        <InputControlled name='date' type="date" control={control} label='Fecha' rules={{ required: false }} />
                        <InputControlled name='cantidad' type="number" control={control} label='cantidad' rules={{ required: false }} />
                        <SelectControlled name='type' control={control} label='Tipo de movimiento' rules={{ required: false }} options={typeTransactions} />
                        
                    </div>
                    <div className="w-full">
                        <SelectControlled name='typeOp' control={control} label='Tipo de Operación' rules={{ required: false }} options={tOps} />

                    </div>
                </div>
                <div className="w-full">
                <InputControlled name='sustento' control={control} label='Sustento' rules={{ required: false }} />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="btn btn-primary" disabled={modalLoading}>Guardar</button>
                </div>
            </form>
        </div>
    </>)
}

export default FrmAddTransaction;