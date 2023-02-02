import "./books.css"
import Modal from "react-modal"
import { useState,useEffect } from "react"
import { Books, XSquare,Trash,Pencil,FloppyDisk} from "phosphor-react";
import { Api } from "../API/api";

export function Book({coverImage,id,refreshBooks,author,pages,read,summary,name}){

    const [modalIsOpen2,setIsOpen2]=useState(false)

    function handleOpenModal2(){
        setIsOpen2(true)
      }
      async function deleteBook(event){
        const response = Api.books.deleteUrl()
        const data = await response.json()

        if(request.status==200){
          alert(data.message)
        }else{
          alert(data.message)
        }
        
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
    // refreshBooks()
    return(
        <div>
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
        <button>Editar <Pencil size={32} /></button>
        <button >Excluir <Trash size={32} /></button>
        </div>
        </div>       
        </form>
 
        
        </Modal>
        <div className="containerBooks">
        
            <div >
            <button className="books" onClick={handleOpenModal2}>
                <img src={coverImage} alt=""id={id} />
                </button>
            </div>
            
        </div>
        </div>
        
        
    )
}