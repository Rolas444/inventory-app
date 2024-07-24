
import { Controller } from "react-hook-form";
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';

const AutcompleteControlled = ({ name, control, errors, label, options,placeholder='', customOptions=null }) => {
    const handleChanged = (e, field)=>{
        console.log(e)
    }

    const handleClick = (e, option)=>{
        console.log(option)
    }

    // console.log(options)
    return (<>
        <Controller
            name={name}
            control={control}
            render={({ field }) => {
                // if(typeof field.value !== 'object')
                    // field.value = options.filter(x=>x.value ==field.value)
                return (<>
                    <div className='w-full'>
                        <div className='label'>
                            <span></span>
                            {/* <span className='label-text-alt'>{label}</span> */}
                        </div>
                        <Autocomplete
                            id={name}
                            defaultItems={options}
                            popoverProps={{
                                classNames:{
                                    input: "no-border"
                                }
                            }}
                            variant='underlined'
                            label={label}
                            placeholder={placeholder}
                            // className='w-full text-gray-800 dark:text-gray-200'
                            // selectedKey={field.value ? field.value.toString() : null}
                            // selectedKey={field.value}
                            onSelectionChange={handleChanged}
                        >
                            {customOptions ? customOptions: option => <AutocompleteItem key={option.value} onClick={handleClick}  >{option.label}</AutocompleteItem> }
                        </Autocomplete>
                    </div>
                </>)
            }}
        />
    </>)
}

export default AutcompleteControlled
