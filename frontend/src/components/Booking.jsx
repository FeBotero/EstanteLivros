import "./booking.css"
import * as dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { CaretCircleUp,CaretCircleDown} from "phosphor-react";

import { Api } from "../API/api";
export function Booking({id,name,title,number,date,status,refreshbookings}){
    async function handleStatus(){
        const now = Date.now();
        const dateNow = Date(now);
        if(status=="pending"){
      
            const payload = {
                bookingStatus:"loan",
                loanDate:dateNow
            }

            const request = await Api.bookings.updateUrl(id,payload)
            const data = await request.json()

            if(request.status==200){
                alert(data.message)
              }else{
              alert(data.message)
                }

            refreshbookings()
            
        }else{
            if(status=="loan"){
                

                

            const payload = {
                bookingStatus:"completed",
                completedDate:dateNow
            }

            const request = await Api.bookings.updateUrl(id,payload)
            const data = await request.json()

            if(request.status==200){
                alert(data.message)
              }else{
              alert(data.message)
                }

            refreshbookings()
                
            }
        }     
    }   
    return(
        <div className={status}>
            
            
            <div>
                
            <h3>{title}</h3>
            <p>{dayjs(date).format("DD/MM/YYYY")}</p>
            
            <p>{name} - {number}</p>
            </div>
            <div className="ModalClose">          
            
            { status=="pending" ? 
            <button onClick={handleStatus}><CaretCircleUp size={32} color="red"weight="fill" value="Emprestar"/></button> 
            : status=="loan"? <button onClick={handleStatus}><CaretCircleDown size={32} color="green"weight="fill"value="Receber"/></button> :
            ""           
        }

            
            </div>
            
            
        </div>
    )
}