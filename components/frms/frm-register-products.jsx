'use client'
import { useState } from "react";
import { useForm } from "react-hook-form";
import InputControlled from "@/components/ui/input-controlled";

const FrmRegisterProducts = ({ stateForm }) => {

    const [initForm, setInitForm] = useState({
        name: '',
        sku: '',
        status: false,
        stock: 0,
        price: 0.00,
        cost: 0.00,
        image: ''
    });

    const { control, handleSubmit,watch } = useForm(
        { defaultValues: initForm }
    );

    const onSubmit = async () => {

    }

    return (<>
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full flex justify-between gap-2">
                    <div>
                        <InputControlled name="name" control={control} label="Nombre" rules={{ required: false }} />
                        <InputControlled name="sku" type="text" control={control} label="SKU" rules={{ required: true }} />
                        <InputControlled name="stock" type="number" control={control} label="stock" rules={{ required: true }} />
                        <InputControlled name="price" type="number" control={control} label="Precio" rules={{ required: true }} />
                        <InputControlled name="cost" type="number" control={control} label="Costo" rules={{ required: true }} />
                    </div>
                    <div>

                    </div>
                </div>
            </form>
        </div>
    </>)

}

export default FrmRegisterProducts;