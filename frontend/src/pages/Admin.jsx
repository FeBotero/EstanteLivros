import "../App.css"

import {Api} from "../API/api"
import {Book} from "../components/Book"
import Logo from "../assets/log.png"


import Modal from "react-modal"
import { useState,useEffect } from "react"
import { Books, XSquare,FloppyDisk} from "phosphor-react";
import { Booking } from "../components/Booking"



export function Admin(){
    const [bookList,setBooksList]=useState()
    const [bookingList,setBookingsList]=useState()
  
 
  const [modalIsOpen,setIsOpen]=useState(false)
  
  

  function handleOpenModal(){
    setIsOpen(true)
  }

  function handleCloseModal(){
    setIsOpen(false)
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
  console.log(resultado)
 }
 async function showBookings(){
  const response = await Api.bookings.readAll()

  const resultado = await response.json()

setBookingsList(resultado)
console.log(resultado)
}

  useEffect(function () {
    showBooks();
    showBookings()
  }, []);
  if (bookingList === undefined||bookList === undefined) {
    return (
        <div>
        <h1>Carregando</h1>
        </div>
  )
}

  async function createBook(event){
    event.preventDefault()
    
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
      alert(data.message)
    }else{
      alert(data.message)
    }

    showBooks()

      document.getElementById("bookName").value="",
      document.getElementById("bookAuthor").value="",
      document.getElementById("bookPages").value="",
      document.getElementById("bookCover").value="",
      document.getElementById("bookRead").value="",
      document.getElementById("bookSummary").value=""

  }
  

  return (
    <div className="App">
      <div className="container">
      <img className="logoImage"src={Logo} alt="" />
        <button onClick={handleOpenModal}>Adicionar Livro <Books size={32} /> </button>

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
        <label htmlFor="bookRead">Já foi lido?</label>
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

      
      <div className="content">
      
      
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
        <div className="bookings">
        <h3>Reservas</h3>
        {bookingList.map((booking)=>(
            
            <Booking 
            name={booking.bookingName} 
            key={booking._id}
            title={booking.name}
            number={booking.telNumber}
            date={booking.bookingDate}
            refreshbookings={showBookings}
            
            />
          ))}


      </div>
      </div>
      
       
        
      </div>
    </div>
  )
}