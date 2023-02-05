import {Api} from "../API/api"

import { ToastContainer, toast } from 'react-toastify';
import duration from "dayjs/plugin/duration"
import * as dayjs from "dayjs";
import "dayjs/locale/pt-br";
import Modal from "react-modal"
import { useState } from "react"
import { Books, XSquare,FloppyDisk} from "phosphor-react";

import "../App.css"
import 'react-toastify/dist/ReactToastify.min.css';

export function ButtonCreate({refreshBooks}){
  
    const [modalIsOpen,setIsOpen]=useState(false)

    dayjs.extend(duration)

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
          
              refreshBooks()
          
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
  return(
    <div>
      <button className="buttonAdd" onClick={handleOpenModal}>Adicionar <Books size={32} /> </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        id="modalCreate"
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
        <ToastContainer/>
    </div>
  )
}