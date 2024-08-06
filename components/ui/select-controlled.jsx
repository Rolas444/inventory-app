import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Controller } from "react-hook-form";

const SelectControlled = ({ name,label, control, options, placeholder='', onChangeFn=null }) => {

    const handleChange = (e,field) => {
        // console.log(e)
        field.onChange(e);
        if(onChangeFn){
            onChangeFn(e);
        }
    }

    console.log(options);
    return (<>
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="w-full">
                        <div className="label">
                            <span>{label}</span>
                        </div>
                <Select onValueChange={(e)=>handleChange(e,field)} defaultValue={field.value}>
                    <SelectTrigger>
                        <SelectValue>{field.value? options.find(item=>item.value==field.value)?.label: placeholder}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {options.map((option, index) => (

                                <SelectItem key={index} value={option.value}>{option.label}</SelectItem>

                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                </div>
            )}
        />
    </>)
}

export default SelectControlled;