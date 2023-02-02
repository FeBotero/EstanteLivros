import "./App.css"

import {Api} from "./API/api"
import {Book} from "./components/Book"


import Modal from "react-modal"
import { useState,useEffect } from "react"
import { Books, XSquare,Trash,Pencil,FloppyDisk} from "phosphor-react";
import { ReadBooks } from "./components/ReadBooks";

Modal.setAppElement("#root")

export function App() {
  const [bookList,setBooksList]=useState()
  const [bookCase,setBookCase]=useState()
 
  const [modalIsOpen,setIsOpen]=useState(false)
  const [modalIsOpen2,setIsOpen2]=useState(false)
  

  function handleOpenModal(){
    setIsOpen(true)
  }

  function handleCloseModal(){
    setIsOpen(false)
  }
  function handleOpenModal2(){
    setIsOpen2(true)
  }

  function handleCloseModal2(){
    setIsOpen2(false)
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

  useEffect(function () {
    showBooks();
  }, []);
  
  if (bookList === undefined) {
    return (
        <div>
        <h1>Carregando</h1>
        </div>
);
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
        <h1>Estante de Livros</h1>
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

      {/* Modal de exibição */}
        {/* <Modal
        isOpen={modalIsOpen2}
        onRequestClose={handleCloseModal2}
        style={customStyles}
        >
          <div className="ModalClose">
        <button className="closeModal" onClick={handleCloseModal2}><XSquare size={32} color="red"weight="fill"/></button>  

          </div>
        <form className="modalExibition">
          <div className="infoBook">
          <div className="coverImage">
               <img src="https://m.media-amazon.com/images/I/81HKcvLn15L.jpg" alt="" />
          </div>
          <div>
          <h3>O homem mais rico da babilônia</h3>
        <h5>George S. Clason</h5>
        <p>130 paginas</p>
        
          </div>
          </div>
        
        <div>
        <p>O homem mais rico da Babilônia é um clássico sobre como multiplicar riqueza e solucionar problemas financeiros. Baseando-se nos segredos de sucesso dos antigos babilônicos — os habitantes da cidade mais rica e próspera de seu tempo.George S. Clason mostra soluções ao mesmo tempo sábias e muito atuais para evitar a falta de dinheiro. como não desperdiçar recursos durante tempos de opulência. buscar conhecimento e informação em vez de apenas lucro. assegurar uma renda para o futuro. manter a pontualidade no pagamento de dívidas e. sobretudo. cultivar as próprias aptidões. tornando-se cada vez mais habilidoso e consciente.</p>
        <div className="ModalClose">
        <button>Editar <Pencil size={32} /></button>
        <button >Excluir <Trash size={32} /></button>
        </div>
        </div>       
        </form>
 
        
        </Modal> */}
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
        
      </div>
       
        
      </div>
    </div>
  )
}

