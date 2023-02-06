import "../App.css"
import Logo from "../assets/log.png"
import Loading from "../assets/loading.gif"

import {Api} from "../API/api"
import { BookView } from "../components/BookView"

import { Link } from "react-router-dom";

import { useState,useEffect, } from "react"




export function Home(){
    const [bookList,setBooksList]=useState()
  
  async function showBooks(){
    const response = await Api.books.readAll()

    const resultado = await response.json()

  setBooksList(resultado)

 }

  useEffect(function () {
    showBooks();
  }, []);
  
  if (bookList === undefined) {
    return (
      <div className="loading">
          <img src={Loading} alt="" />
        <h1>Aguarde, estamos carregando as informações.</h1>
        </div>
);
}
  return (
    <div className="App">
      <div className="container">
        <nav >
        <p></p>
        <img className="logoImage"src={Logo} alt="" />  
        <div>
        
       <Link to="/edit"><button className="buttonAdm">Administrador</button></Link>
        </div>
        
        </nav>
      
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