import "./booking.css"
import * as dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { XCircle} from "phosphor-react";
export function Booking({name,title,number,date}){
    return(
        <div className="cardBooking">
            
            <div>
            <h3>{title}</h3>
            <p>{dayjs(date).format("DD/MM/YYYY")}</p>
            
            <p>{name} - {number}</p>
            </div>
            <div className="ModalClose">

            <XCircle size={32} color="red"weight="fill"/>
            </div>
            
            
        </div>
    )
}