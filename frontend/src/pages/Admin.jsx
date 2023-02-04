

import {Api} from "../API/api"
import {Book} from "../components/Book"
import Logo from "../assets/log.png"
import { ToastContainer, toast } from 'react-toastify';
import duration from "dayjs/plugin/duration"
import * as dayjs from "dayjs";
import "dayjs/locale/pt-br";

import Modal from "react-modal"
import { useState,useEffect } from "react"
import { Books, XSquare,FloppyDisk, FileText,Warning} from "phosphor-react";
import { Booking } from "../components/Booking"


import "../App.css"
import 'react-toastify/dist/ReactToastify.min.css';

export function Admin(){
  
    const [bookList,setBooksList]=useState()
    const [bookingList,setBookingsList]=useState()
    const [modalIsOpen,setIsOpen]=useState(false)
    const [modalIsOpenTransaction,setIsOpenTransaction]=useState(false)
    const [transactions,setTransactions]= useState()
    
    dayjs.extend(duration)
  
    
    const now = Date.now();
    const dateNow = Date(now);

  function handleOpenModal(){
    setIsOpen(true)
  }

  function handleCloseModal(){
    setIsOpen(false)
  }

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
          <h1>Carregando2</h1>
          </div>
);

}
    

      
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
  async function showBooks(){
    const response = await Api.books.readAll()
    const resultado = await response.json()

  setBooksList(resultado)

 }
 async function showBookings(){
  const response = await Api.bookings.readAll()
  const resultado = await response.json()

setBookingsList(resultado)

}

  useEffect(function () {
    showBooks();
    showBookings()
    showTransation()
    
  }, []);
  if (bookingList === undefined||bookList === undefined) {
    return (
        <div>
        <h1>Carregando 1</h1>
        </div>
  )
}

  async function createBook(event){
    event.preventDefault()
    
    if(document.getElementById("bookName").value==""||document.getElementById("bookName").value==undefined){
      
      toast.error('Favor preencher o nome do livro!', {
        position: toast.POSITION.TOP_CENTER
    });
    }else{
      if(document.getElementById("bookAuthor").value==""||document.getElementById("bookAuthor").value==undefined){
        
        toast.error('Favor preencher o nome do autor!', {
          position: toast.POSITION.TOP_CENTER
      });
      }else{
        if(document.getElementById("bookPages").value==""||document.getElementById("bookPages").value==undefined){
          
          toast.error('Favor preencher o número de paginas!', {
            position: toast.POSITION.TOP_CENTER
        });
        }else{
          if(document.getElementById("bookCover").value==""||document.getElementById("bookCover").value==undefined){
            
            toast.error('Favor preencher o endereço da capa!', {
              position: toast.POSITION.TOP_CENTER
          });
          }else{
            if(document.getElementById("bookCover").value.includes("jpg"||"png"||"gif")==false){
              
              toast.error('Favor preencher com um endereço de imagem!', {
                position: toast.POSITION.TOP_CENTER
            });
            }else{
              if(document.getElementById("bookSummary").value==""||document.getElementById("bookSummary").value==undefined){
                
                toast.error('Favor preencher o resumo do livro!', {
                  position: toast.POSITION.TOP_CENTER
              });
              }else{
                const payload = {
                  name:document.getElementById("bookName").value,
                  author:document.getElementById("bookAuthor").value,
                  pages:document.getElementById("bookPages").value,
                  coverImage:document.getElementById("bookCover").value,
                  read:document.getElementById("bookRead").value,
                  summary:document.getElementById("bookSummary").value,
                }
            
                const request = await Api.books.createUrl(payload)
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
            
                showBooks()
            
                  document.getElementById("bookName").value="",
                  document.getElementById("bookAuthor").value="",
                  document.getElementById("bookPages").value="",
                  document.getElementById("bookCover").value="",
                  document.getElementById("bookRead").value="",
                  document.getElementById("bookSummary").value=""
              }
            }
          }
        }
      }
    }


  }
  

  return (
    <div className="App">
      <div className="container">
      <img className="logoImage"src={Logo} alt="" />
      <div className="menu">
      <button className="buttonAdd" onClick={handleOpenModal}>Adicionar <Books size={32} /> </button>
        <button className="buttonReport" onClick={handleOpenModalTransaction}>Relatório <FileText size={32} /> </button>
      </div>
        


        {/* Modal de novos livros */}
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        >
          <div className="ModalClose">
        <button className="closeModal" onClick={handleCloseModal}><XSquare size={32} color="red"weight="fill"/></button>  
        </div>
        <form onSubmit={createBook} className="modalCreate">
        <label htmlFor="bookName">Nome do livro</label>
        <input id="bookName"type="text" placeholder="Nome do Livro" />
        <label htmlFor="bookAuthor">Nome do autor</label>
        <input  id="bookAuthor"type="text" placeholder="Nome do Autor" />
        <label htmlFor="bookPages">Número de paginas</label>
        <input id="bookPages"type="number" name=""  placeholder="Paginas"/>
        <label htmlFor="bookRead">Disponível?</label>
        <select name="bookRead" id="bookRead">
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
        <label htmlFor="bookCover">Endereço de capa</label>
        <input id="bookCover"type="text" placeholder="Endereço da Capa"/>
        <label htmlFor="bookSummary">Resumo</label>
        <textarea name="" id="bookSummary" cols="30" rows="10" placeholder="Resumo" />
        <div className="ModalClose">

        <button type="submit">Salvar <FloppyDisk size={32} /></button>
        </div>
        </form>
        </Modal>

      
        {/* Modal de relatórios */}
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
        
        </Modal>


      <div className="content">
      
      <div >
      <h2 className="titleTag">Acervo</h2>
      <div className="listbooks">
      {bookList.map((book)=>(
            
            <Book 
            coverImage={book.coverImage} 
            id={book._id}
            key={book.name}
            name={book.name}
            author={book.author}
            pages={book.pages}
            read={book.read}
            summary={book.summary}
            refreshBooks={showBooks}
            
            />
          ))}
      </div>
      
      </div>
          
        <div >
          
        <h2 className="titleTag">Reservas</h2>
        <div className="bookings">
        {bookingList.map((booking)=>(
            
            <Booking 
            name={booking.bookingName} 
            id={booking._id}
            key={booking._id}
            title={booking.name}
            number={booking.telNumber}
            date={booking.bookingDate}
            status={booking.bookingStatus}
            refreshbookings={showBookings}
            
            />
          ))}
</div>

      </div>
      </div>
      
       
        
      </div>
      <ToastContainer />
    </div>
  )
}