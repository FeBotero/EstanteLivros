import { useEffect, useState } from "react";
import { Api } from "../API/api";
import * as dayjs from "dayjs";
import "dayjs/locale/pt-br";
import duration from "dayjs/plugin/duration"
import "./Report.css"
import { Books, FileText, Warning} from "phosphor-react";

export function Report(){
    dayjs.extend(duration)

    
const [transactions,setTransactions]= useState()
const now = Date.now();
const dateNow = Date(now);

    async function showTransation(){
        const response = await Api.bookings.readAll()
        const resultado = await response.json()

        setTransactions(resultado)

    }
        useEffect(function () {
            showTransation();
            
          }, []);

          if (transactions === undefined) {
            return (
                <div>
                <h1>Carregando</h1>
                </div>
      );
    }
    

    return(
        <div className="container">
            <h1>RELATÓRIO DE USO</h1>
            <a href="/edit"><button className="buttonReport" >Home <Books size={32} /> </button></a>
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
                    transactions.map(itemTransaction=>{
                        
                        const today = dayjs(dateNow)
                        
                        const LoanDate = dayjs(itemTransaction.loanDate)
                        
                        const CompletedDate = dayjs(itemTransaction.completedDate)

                        const duration = dayjs.duration(CompletedDate.diff(LoanDate)).days()
                        

                        const durationDelay = dayjs.duration(today.diff(LoanDate)).days()
                       


                        return(
                        <tr key={itemTransaction._id}>
                            <td>{itemTransaction.name}</td>
                            <td>{itemTransaction.bookingName}</td>
                            <td>{itemTransaction.telNumber}</td>
                            <td>{dayjs(itemTransaction.bookingDate).format("DD/MM/YYYY")}</td>
                            
                            <td>{itemTransaction.loanDate==""||itemTransaction.loanDate==undefined ||itemTransaction.loanDate==0? "": dayjs(itemTransaction.loanDate).format("DD/MM/YYYY")}</td>
                            <td>{itemTransaction.devolutionDate==""||itemTransaction.devolutionDate==undefined ||itemTransaction.devolutionDate==0? "": dayjs(itemTransaction.devolutionDate).format("DD/MM/YYYY")}</td>
                            <td>{itemTransaction.devolutionDate==""||itemTransaction.devolutionDate==undefined ||itemTransaction.devolutionDate==0? "": duration}</td>
                            <td>{itemTransaction.devolutionDate==""||itemTransaction.devolutionDate==undefined ||itemTransaction.devolutionDate==0
                            ? itemTransaction.loanDate==""||itemTransaction.loanDate==undefined ||itemTransaction.loanDate==0? "": durationDelay>=7? <p className="delay">{durationDelay} (d) <Warning size={32} color="red"weight="fill"/></p>:"":""
                                
                        }</td>

                        </tr>)
                    })
                }
                </tbody>
            </table>

            
        </div>
    )
}
// 