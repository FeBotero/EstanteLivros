import { useEffect, useState } from "react";
import { Api } from "../API/api";
import * as dayjs from "dayjs";
import "dayjs/locale/pt-br";
import duration from "dayjs/plugin/duration"

export function Report(){
    dayjs.extend(duration)

const [transactions,setTransactions]= useState()

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
        <div>
            <table>
                <thead>
                    <tr>
                    <th>Livro</th>
                    <th>Solicitante</th>
                    <th>Contato</th>
                    <th>Data Solicitação</th>
                    <th>Data Emprestimo</th>
                    <th>Data Entrega</th>
                    <th>Atraso</th>
                    </tr>
                    
                </thead>
                <tbody>


                {
                    transactions.map(itemTransaction=>{
                        const x = dayjs(itemTransaction.loanDate)
                        const y = dayjs(itemTransaction.completedDate)
                        var duration = dayjs.duration(y.diff(x)).days()
                        console.log(duration)

                        return(
                        <tr key={itemTransaction._id}>
                            <td>{itemTransaction.name}</td>
                            <td>{itemTransaction.bookingName}</td>
                            <td>{itemTransaction.telNumber}</td>
                            <td>{dayjs(itemTransaction.bookingDate).format("DD/MM/YYYY")}</td>
                            <td>{dayjs(itemTransaction.loanDate).format("DD/MM/YYYY")}</td>
                            <td>{dayjs(itemTransaction.completedDate).format("DD/MM/YYYY")}</td>
                            <td>{duration}</td>

                        </tr>)
                    })
                }
                </tbody>
            </table>

            
        </div>
    )
}