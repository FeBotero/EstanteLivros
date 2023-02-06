import {Api} from "../API/api"
// import duration from "dayjs/plugin/duration"
import Modal from "react-modal"
import { useState } from "react"
import { XSquare, FileText,Warning} from "phosphor-react";

import "../App.css"
import 'react-toastify/dist/ReactToastify.min.css';


export function ButtonReport(){
  const now = new Date()
  const todayDate = new Date()
    const [modalIsOpenTransaction,setIsOpenTransaction]=useState(false)
    const [transactions,setTransactions]= useState()

    
    

 
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
                    transactions.map((itemTransaction)=>{                        
                      const today = new Intl.DateTimeFormat("pt-BR").format(todayDate)
                  

                      
                     
                      const diffLoanCompleted = new Date((itemTransaction.devolutionDate)) - new Date(itemTransaction.loanDate)
                      const durationDate =  diffLoanCompleted / (1000 * 60 * 60 * 24);
                      
                      const diffLoanToday = new Date((todayDate)) - new Date(itemTransaction.loanDate)
                      const durationDelay =  Math.round(diffLoanToday / (1000 * 60 * 60 * 24))
                                      
                      return(
                      <tr key={itemTransaction._id}>
                          <td>{itemTransaction.name}</td>
                          <td>{itemTransaction.bookingName}</td>
                          <td>{itemTransaction.telNumber}</td>
                          <td>{today}</td>
                          <td>{itemTransaction.loanDate==""||itemTransaction.loanDate==undefined ||itemTransaction.loanDate==0? "": new Intl.DateTimeFormat("pt-BR").format(Date.parse(itemTransaction.loanDate))}</td>
                          <td>{itemTransaction.devolutionDate==""||itemTransaction.devolutionDate==undefined ||itemTransaction.devolutionDate==0?"": new Intl.DateTimeFormat("pt-BR").format(Date.parse(itemTransaction.devolutionDate))}</td>
                          <td>{itemTransaction.devolutionDate==""||itemTransaction.devolutionDate==undefined ||itemTransaction.devolutionDate==0?"": durationDate}</td>
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