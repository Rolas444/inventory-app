import InputControlled from "../ui/input-controlled";

const FrmRegister = () => {
    return (<>
        <div>
            <form>
                <div>
                    <div>
                        <InputControlled name="username" control={control} label="Usuario" rules={{ required: true }} />
                    </div>

                </div>
            </form>

        </div>
    </>)
}

export default FrmRegister;