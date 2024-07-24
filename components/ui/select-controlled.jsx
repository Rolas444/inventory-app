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

const SelectControlled = ({ name,label, control, options, placeholder='' }) => {


    return (<>
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <div className="w-full">
                        <div className="label">
                            <span>{label}</span>
                        </div>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                        <SelectValue>{field.value? options.find(item=>item.value==field.value).label: placeholder}</SelectValue>
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