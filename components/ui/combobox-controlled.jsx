import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Controller } from "react-hook-form";
import { useState } from "react"


const ComboboxControlled = ({ name, control, errors, label, options, placeholder = '', customOptions = null }) => {

    const [open, setOpen] = useState(false)
    // console.log(options)

    return (<>
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                return (<>
                    <div className="w-full">
                        <div className="label">
                            <span>{label}</span>
                        </div>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[200px] justify-between"
                                >
                                    {field.value
                                        ? options.find((item) => item.value === field.value)?.label
                                        : "selecciona una opción..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder={placeholder} />
                                    <CommandEmpty>Sin datos.</CommandEmpty>
                                    <CommandGroup>
                                        {options.map((item) => (
                                            <CommandItem
                                                key={item.value}
                                                value={item.value}
                                                onSelect={(currentValue) => {
                                                    field.onChange(currentValue === field.value ? "" : currentValue)
                                                    setOpen(false)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        field.value === item.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {item.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                </>)
            }}
        />
    </>)

}

export default ComboboxControlled