import "./books.css"
import Modal from "react-modal"
import { useState } from "react"
import {  XSquare,Trash,Pencil,FloppyDisk} from "phosphor-react";
import { Api } from "../API/api";

export function Book({coverImage,id,refreshBooks,author,pages,read,summary,name}){
    const [modalIsOpenCadastrar,setIsOpenCadastrar]=useState(false)
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

      async function deleteBook(event){
        
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
    //   async function updateBook(event){
    //     event.preventDefault()
    //     handleCloseModalExibir()
    //     document.getElementById("bookName").value=name,
    //     document.getElementById("bookAuthor").value=author,
    //     document.getElementById("bookPages").value=pages,
    //     document.getElementById("bookCover").value=coverImage,
    //     document.getElementById("bookRead").value=read,
    //     document.getElementById("bookSummary").value=summary
    //     handleOpenModal()

    //     const payload = {
    //         name:document.getElementById("bookName").value,
    //         author:document.getElementById("bookAuthor").value,
    //         pages:document.getElementById("bookPages").value,
    //         coverImage:document.getElementById("bookCover").value,
    //         read:document.getElementById("bookRead").value,
    //         summary:document.getElementById("bookSummary").value,
    //       }

    //     const request = await Api.books.updateUrl(id,payload)
    //     const data = await request.json()

    // if(request.status==200){
    //   alert(data.message)
    // }else{
    //   alert(data.message)
    // }
    // refreshBooks()
    // }


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
        <button >Editar <Pencil size={32} /></button>
        <button onClick={deleteBook} >Excluir <Trash size={32} /></button>
        </div>
        </div>       
        </form>
 
        
        </Modal>

        {/* <div>
        <Modal

        isOpen={modalIsOpenCadastrar}
        onRequestClose={handleCloseModalCadastrar}
        style={customStyles}
        >
          <div className="ModalClose">
        <button className="closeModal" onClick={handleCloseModalCadastrar}><XSquare size={32} color="red"weight="fill"/></button>  
        </div>
        <form onSubmit="" className="modalCreate">
        <label htmlFor="bookName">Nome do livro</label>
        <input id="bookName"type="text" value={name} />
        <label htmlFor="bookAuthor">Nome do autor</label>
        <input  id="bookAuthor"type="text" value={author} />
        <label htmlFor="bookPages">Número de paginas</label>
        <input id="bookPages"type="number" name=""  value={pages}/>
        <label htmlFor="bookRead">Já foi lido?</label>
        <select name="bookRead" id="bookRead">
          <option value="true">Sim</option>
          <option value="false">Não</option>
        </select>
        <label htmlFor="bookCover">Endereço de capa</label>
        <input id="bookCover"type="text" value={coverImage={}}/>
        <label htmlFor="bookSummary">Resumo</label>
        <textarea name="" id="bookSummary" cols="30" rows="10" value={summary} />
        <div className="ModalClose">

        <button type="submit">Salvar <FloppyDisk size={32} /></button>
        </div>
        </form>
        </Modal>
        </div> */}
        
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