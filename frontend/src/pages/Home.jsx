import "../App.css"
import Logo from "../assets/log.png"

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
        <div>
        <h1>Carregando</h1>
        </div>
);
}

  
  

  return (
    <div className="App">
      <div className="container">
        <img className="logoImage"src={Logo} alt="" />
        <Link to="/edit"><button> ADM</button></Link>
      
      
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