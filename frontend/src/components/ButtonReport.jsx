import {Api} from "../API/api"
import duration from "dayjs/plugin/duration"
import * as dayjs from "dayjs";
import "dayjs/locale/pt-br";
import Modal from "react-modal"
import { useState } from "react"
import { XSquare, FileText,Warning} from "phosphor-react";

import "../App.css"
import 'react-toastify/dist/ReactToastify.min.css';


export function ButtonReport(){

    const [modalIsOpenTransaction,setIsOpenTransaction]=useState(false)
    const [transactions,setTransactions]= useState()
    
    dayjs.extend(duration)

    const now = Date.now();
    const dateNow = Date(now);

 
  function handleOpenModalTransaction(){
    showTransation()
    setIsOpenTransaction(true)
  }
  function handleCloseModalTransaction(){
    setIsOpenTransaction(false)
  }
  async function showTransation(){
    const response = await Api.bookings.readAll()
    const resultado = await response.json()

    setTransactions(resultado)
    if (transactions === undefined) {
      return (
          <div>
          <h1>Carregando</h1>
          </div>
)}  
}
  const customStyles = {
    content: {
      top: '50%',
      minWidth:"30rem",
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      borderRadius:"8px",
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  
    return(
        <div>
            <button className="buttonReport" onClick={handleOpenModalTransaction}>Relatório <FileText size={32} /> </button>
            <Modal
        isOpen={modalIsOpenTransaction}
        onRequestClose={handleCloseModalTransaction}
        style={customStyles}
        >
          <div className="ModalClose">
        <button className="closeModal" onClick={handleCloseModalTransaction}><XSquare size={32} color="red"weight="fill"/></button>  
        </div>
          <div className="contentReport">          
            <h1>RELATÓRIO DE USO</h1>            
            <table>
                <thead>
                    <tr>
                    <th>Livro</th>
                    <th>Solicitante</th>
                    <th>Contato</th>
                    <th>Solicitação</th>
                    <th>Saída</th>
                    <th>Devolução</th>
                    <th>Tempo</th>
                    <th>Atraso</th>
                    </tr>                    
                </thead>
                <tbody>                
                {
                    transactions==""||transactions==undefined?"":
                    transactions.map(itemTransaction=>{                        
                      const today = dayjs(dateNow)                      
                      const LoanDate = dayjs(itemTransaction.loanDate)                      
                      const CompletedDate = dayjs(itemTransaction.completedDate)
                      const duration = dayjs.duration(CompletedDate.diff(LoanDate)).days()
                      const durationDelay = dayjs.duration(today.diff(LoanDate)).days()  
                      const dateExibition = dayjs(itemTransaction.bookingDate).format("DD/MM/YYYY")                 
                      return(
                      <tr key={itemTransaction._id}>
                          <td>{itemTransaction.name}</td>
                          <td>{itemTransaction.bookingName}</td>
                          <td>{itemTransaction.telNumber}</td>
                          <td>{dateExibition}</td>
                          <td>{itemTransaction.loanDate==""||itemTransaction.loanDate==undefined ||itemTransaction.loanDate==0? "": dayjs(itemTransaction.loanDate).format("DD/MM/YYYY")}</td>
                          <td>{itemTransaction.devolutionDate==""||itemTransaction.devolutionDate==undefined ||itemTransaction.devolutionDate==0?"": dayjs(itemTransaction.devolutionDate).format("DD/MM/YYYY")}</td>
                          <td>{itemTransaction.devolutionDate==""||itemTransaction.devolutionDate==undefined ||itemTransaction.devolutionDate==0?"": duration}</td>
                          <td>{itemTransaction.devolutionDate==""||itemTransaction.devolutionDate==undefined ||itemTransaction.devolutionDate==0? itemTransaction.loanDate==""||itemTransaction.loanDate==undefined ||itemTransaction.loanDate==0? "": durationDelay>=7? <p className="delay">{durationDelay} (d) <Warning size={32} color="red"weight="fill"/></p>:"":""}</td>

                      </tr>)
                  })
                }
                </tbody>
            </table>
            </div>        
        </Modal>
        </div>
    )
}