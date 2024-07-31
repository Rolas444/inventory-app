import { Controller } from "react-hook-form";

const InputImageControlled = ({ name, control, label, errors, rules, }) => {

    return (<>
        <Controller
            name={name}
            control={control}
            render={({ field }) => (<>
                <div className="group d-inline-block position-relative opacity-trigger-hover">
                    <div className="absolute w-full  bottom-0 opacity-0 group-hover:opacity-100">
                    </div>
                </div>
            </>)}
        />
    </>)
}

export default InputImageControlled;