import { Checkbox } from "@/components/ui/checkbox"
import { Controller } from "react-hook-form"

const CheckboxControlled = ({ name, label, control, rules = {}, errors }) => {

    return (<>
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="w-full py-2 flex gap-2">
                    <Checkbox {...field}  />
                    <label htmlFor={name} className="label-text-alt">{label}</label>
                </div>
            )}
        />
    </>)
}

export default CheckboxControlled;