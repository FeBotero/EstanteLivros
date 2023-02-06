import "./booking.css"
import { CaretCircleUp,CaretCircleDown} from "phosphor-react";
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast } from 'react-toastify';

import { Api } from "../API/api";
export function Booking({id,name,date,title,number,status,refreshbookings}){
    
    const today = Date.parse(date)
document.getElementById
    async function handleStatus(){
        // const today = new Date()
        
        console.debug(new Intl.DateTimeFormat('pt-BR').format(today));
        if(status=="pending"){
      
            const payload = {
                bookingStatus:"loan",
                loanDate:new Date(today)
            }

            const request = await Api.bookings.updateUrl(id,payload)
            const data = await request.json()

            if(request.status==200){
                
                toast.success(data.message, {
                  position: toast.POSITION.TOP_RIGHT
              });
              }else{
                
                toast.error(data.message, {
                  position: toast.POSITION.TOP_CENTER
              })
              }

            refreshbookings()
            
        }else{
            if(status=="loan"){
                

                

            const payload = {
                bookingStatus:"devolution",
                devolutionDate:new Date(today)
            }

            const request = await Api.bookings.updateUrl(id,payload)
            const data = await request.json()

            if(request.status==200){
                
                toast.success(data.message, {
                  position: toast.POSITION.TOP_RIGHT
              });
              }else{
                
                toast.error(data.message, {
                  position: toast.POSITION.TOP_CENTER
              })
              }

            refreshbookings()
                
            }
        }     

    }   

    
    return(
        <div className={status}>
            
            
            <div>
                
            <h3>{title}</h3>
            <p>{new Intl.DateTimeFormat('pt-BR').format(today)}</p>
            
            <p>{name} - {number}</p>
            </div>
            <div className="ModalClose">          
            
            { status=="pending" ? 
            <button onClick={handleStatus}><CaretCircleUp size={32} color="red"weight="fill" value="Emprestar"/></button> 
            : status=="loan"? <button onClick={handleStatus}><CaretCircleDown size={32} color="green"weight="fill"value="Receber"/></button> :
            ""           
        }

            
            </div>
            
            <ToastContainer/>
        </div>
    )
}