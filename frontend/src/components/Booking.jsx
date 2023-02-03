import "./booking.css"
import * as dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { CaretCircleUp,CaretCircleDown} from "phosphor-react";
import { useState } from "react";
export function Booking({name,title,number,date,status,refreshbookings}){
    const [statusBooking,setStatusBooking]=useState("peding")
    function handleStatus(status){
        if(status=="peding"){
            setStatusBooking("loan")
        }else{
            if(status=="loan"){
                setStatusBooking("completed")
            }
        }


    }   





    return(
        <div className="cardBooking">
            
            <div>
            <h3>{title}</h3>
            <p>{dayjs(date).format("DD/MM/YYYY")}</p>
            
            <p>{name} - {number}</p>
            </div>
            <div className="ModalClose">
            { status=="pending" ? 
            <button><CaretCircleUp size={32} color="red"weight="fill" value="Emprestar"/></button> :
            <button><CaretCircleDown size={32} color="green"weight="fill"value="Receber"/></button> 
        }
            
            </div>
            
            
        </div>
    )
}