import { GiCheckMark } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

const BoolMask = ({ value }) => {
    return value ? <GiCheckMark className="w-4 h-4 text-green-500" /> : <RxCross2 className="w-4 h-4 text-red-500" />;
}

export default BoolMask;