import "./books.css"
import Modal from "react-modal"
import { useState,useEffect } from "react"
import {  XSquare,Trash,Pencil,FloppyDisk,CheckCircle,XCircle} from "phosphor-react";
import { Api } from "../API/api";

export function Book({coverImage,id,refreshBooks,author,pages,read,summary,name}){
  
    const [modalIsOpenCadastrar,setIsOpenCadastrar]=useState(false)
    const [modalIsOpenExibir,setIsOpenExibir]=useState(false)

    function handleOpenModalCadastrar(){

        setIsOpenExibir(false)
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

      async function deleteBook(){
        
        const response = await Api.books.deleteUrl(id)
        const data = await response.json()

        if(request.status==200){
          alert(data.message)
            }else{
          alert(data.message)
        }
        refreshBooks()
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
   
      async function editBook(){

        handleCloseModalExibir()
        handleOpenModalCadastrar()
      
    }
    async function updateBook(){
      

      const payload = {
        name:document.getElementById("bookName").value,
        author:document.getElementById("bookAuthor").value,
        pages:document.getElementById("bookPages").value,
        coverImage:document.getElementById("bookCover").value,
        read:document.getElementById("bookRead").value,
        summary:document.getElementById("bookSummary").value,
      }

      
    const request = await Api.books.updateUrl(id,payload)
    console.log(request)
    const data = await request.json()
    console.log(data)

      if(request.status==200){
        alert(data.message)
      }else{
      alert(data.message)
        }
        handleCloseModalCadastrar()
        refreshBooks()

        }


    return(
        <div>
          
      <Modal
        isOpen={modalIsOpenCadastrar}
        onRequestClose={handleCloseModalCadastrar}
        style={customStyles}
      >
        <div className="modalCreate">
        <div className="ModalClose">
        <button className="closeModal" onClick={handleCloseModalCadastrar}><XSquare size={32} color="red"weight="fill"/></button>  
        </div>
        <label htmlFor="bookName" >Nome do livro</label>
        <input id="bookName"type="text" placeholder="Nome do Livro" defaultValue={name}/>
        <label htmlFor="bookAuthor">Nome do autor</label>
        <input  id="bookAuthor" type="text" placeholder="Nome do Autor" defaultValue={author}/>
        <label htmlFor="bookPages">Número de paginas</label>
        <input id="bookPages"type="number" name=""  placeholder="Paginas" defaultValue={pages}/>
        <label htmlFor="bookRead">Disponível</label>
        <select name="bookRead" id="bookRead">
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
        <label htmlFor="bookCover">Endereço de capa</label>
        <input id="bookCover"type="text" placeholder="Endereço da Capa"defaultValue={coverImage}/>
        <label htmlFor="bookSummary">Resumo</label>
        <textarea name="" id="bookSummary" cols="30" rows="10" placeholder="Resumo" defaultValue={summary}/>
        <div className="ModalClose">
        
        <button onClick={updateBook}>Salvar <FloppyDisk size={32} /></button>
        </div>
        </div>
       
      </Modal>




            <Modal
        isOpen={modalIsOpenExibir}
        onRequestClose={handleCloseModalExibir}
        style={customStyles}
        >
          <div className="ModalClose">
        <button className="closeModal" onClick={handleCloseModalExibir}><XSquare size={32} color="red"weight="fill"/></button>  

          </div>
        <div className="modalExibition">
          <div className="infoBook">
          <div className="coverImage">
               <img src={coverImage} alt="" />
          </div>
          <div>
          <h3>{name}</h3>
        <h5>{author}</h5>
        <p>{pages} paginas</p>
        {read==="true" ? <CheckCircle size={32} color="green"weight="fill"/> : <XCircle size={32} color="red"weight="fill"/> }
        
          </div>
          </div>
        
        <div>
        <p>{summary}</p>
        <div className="ModalClose">
        <button onClick={editBook}>Editar <Pencil size={32} /></button>
        <button onClick={deleteBook} >Excluir <Trash size={32} /></button>
        </div>
        </div>       
        </div>
 
        
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