import "./books.css"
import Modal from "react-modal"
import { useState } from "react"
import {  XSquare,ArchiveBox,PaperPlaneTilt,CheckCircle,XCircle} from "phosphor-react";
import {Api} from "../API/api"


export function BookView({coverImage,id,author,pages,read,summary,name}){
    
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

      async function booking(event){
        
          event.preventDefault()
          const now = Date.now();
          const dateNow = Date(now);
          
          const payload = {
            name:document.getElementById("bookName").value,
            bookingName:document.getElementById("bookingName").value,
            telNumber:document.getElementById("telNumber").value,
            bookingDate:dateNow,
            bookingStatus:"pending"
            
          }
          
          const request = await Api.bookings.createUrl(payload)
          const data = await request.json()

          if(request.status==200){
            alert(data.message)
          }else{
            alert(data.message)
          }
          
          document.getElementById("bookName").value="",
          document.getElementById("bookingName").value="",
          document.getElementById("telNumber").value=""
          
      
      }
      
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
        <div className="modalExibition">
          <div className="infoBook">
          <div className="coverImage">
               <img src={coverImage} alt="" />
          </div>
          <div>
          <h3>{name}</h3>
        <h5>{author}</h5>
        <p>{pages} paginas</p>
        {read==="true" ? <p className="avaible">DISPONÍVEL <CheckCircle size={32} color="green"weight="fill"/></p> : <p className="avaible">INDISPONÍVEL <XCircle size={32} color="red"weight="fill"/></p> }
        
          </div>
          </div>
        
        <div>
        <p>{summary}</p>
        <div className="ModalClose">
        <button onClick={handleOpenModalCadastrar} >Reservar <ArchiveBox size={32} /></button>
        </div>
        </div>       
        </div>
 
        
        </Modal>
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
        <label htmlFor="bookingName">Nome do solicitante</label>
        <input  id="bookingName" type="text" placeholder="Seu nome" />
        <label htmlFor="telNumber">Numero</label>
        <input id="telNumber"type="number" name=""  placeholder="9299999999" />
        
        <div className="ModalClose">
        
        <button onClick={booking}>Enviar reserva <PaperPlaneTilt size={32} /></button>
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