import "./books.css"
import Modal from "react-modal"
import { useState } from "react"
import {  XSquare,Trash,Pencil,FloppyDisk} from "phosphor-react";
import { Api } from "../API/api";

export function BookView({coverImage,id,author,pages,read,summary,name}){
    
    const [modalIsOpenExibir,setIsOpenExibir]=useState(false)

    function handleOpenModalCadastrar(event){
        event.preventDefault()
        setIsOpenCadastrar(true)
      }
    
      function handleCloseModalCadastrar(){
        setIsOpenCadastrar(false)
      }
    function handleOpenModalExibir(){
        setIsOpenExibir(true)
      }
      function handleCloseModalExibir(){
        setIsOpenExibir(false)
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
            <Modal
        isOpen={modalIsOpenExibir}
        onRequestClose={handleCloseModalExibir}
        style={customStyles}
        >
          <div className="ModalClose">
        <button className="closeModal" onClick={handleCloseModalExibir}><XSquare size={32} color="red"weight="fill"/></button>  

          </div>
        <form className="modalExibition">
          <div className="infoBook">
          <div className="coverImage">
               <img src={coverImage} alt="" />
          </div>
          <div>
          <h3>{name}</h3>
        <h5>{author}</h5>
        <p>{pages} paginas</p>
        
          </div>
          </div>
        
        <div>
        <p>{summary}</p>
        <div className="ModalClose">
        
        </div>
        </div>       
        </form>
 
        
        </Modal>

        
        
        <div className="containerBooks">
        
            <div >
            <button className="books" onClick={handleOpenModalExibir}>
                <img src={coverImage} alt=""id={id} />
                </button>
            </div>
            
        </div>
        </div>
        
        
    )
}