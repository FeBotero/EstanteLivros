import "./App.css"
import {Book} from "./components/Book"
import Modal from "react-modal"
import { useState } from "react"
import { Books, XSquare,Trash,Pencil,FloppyDisk} from "phosphor-react";

Modal.setAppElement("#root")

export function App() {
  const [modalIsOpen,setIsOpen]=useState(false)
  const [modalIsOpen2,setIsOpen2]=useState(false)
  const [edit,setEdit]=useState(false)

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

  return (
    <div className="App">
      <div className="container">
        <h1>Estante de Livros</h1>
        <button onClick={handleOpenModal}>Adicionar Livro <Books size={32} /> </button>
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        >
          <div className="ModalClose">
        <button className="closeModal" onClick={handleCloseModal}><XSquare size={32} color="red"weight="fill"/></button>  
        </div>
        <form className="modalCreate">
        <input type="text" placeholder="Nome do Livro" />
        <input type="text" placeholder="Nome do Autor" />
        <input type="number" name="" id="" placeholder="Paginas"/>
        <input type="checkbox" name="" id="" />
        <input type="text" placeholder="Endereço da Capa"/>
        <textarea name="" id="" cols="30" rows="10" placeholder="Resumo" />
        <div className="ModalClose">

        <button>Salvar <FloppyDisk size={32} /></button>
        </div>
        </form>
        </Modal>


        <Modal
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
        <button>Excluir <Trash size={32} /></button>
        </div>
        </div>       
        </form>
 
        
        </Modal>
      <div className="content">
       <button onClick={handleOpenModal2}><Book /></button>
       <button onClick={handleOpenModal2}><Book /></button>
       <button onClick={handleOpenModal2}><Book /></button>
       <button onClick={handleOpenModal2}><Book /></button>
       <button onClick={handleOpenModal2}><Book /></button>
       <button onClick={handleOpenModal2}><Book /></button>
       <button onClick={handleOpenModal2}><Book /></button>
       <button onClick={handleOpenModal2}><Book /></button>
       <button onClick={handleOpenModal2}><Book /></button>
      </div>
       
        
      </div>
    </div>
  )
}

