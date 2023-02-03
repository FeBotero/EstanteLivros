import "../App.css"
import Logo from "../assets/log.png"

import {Api} from "../API/api"
import { BookView } from "../components/BookView"



import { useState,useEffect } from "react"




export function Home(){
    const [bookList,setBooksList]=useState()
  
 
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

  
  

  return (
    <div className="App">
      <div className="container">
        <img className="logoImage"src={Logo} alt="" />
      
      
      <div className="content">
      
      <div className="listbooks">
          {bookList.map((book)=>(
            
            <BookView 
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
    </div>
  )
}