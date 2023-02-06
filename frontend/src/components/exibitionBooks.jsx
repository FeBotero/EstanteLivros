import { useEffect, useState } from "react";
import {Api} from "../API/api"
import Loading from "../assets/loading.gif"

export function ReadBooks(){
    const [bookList,setBooksList]=useState()
    
    
    async function showBooks(){
            const response = await Api.books.readAll()
        
            const resultado = await response.json()
        
          setBooksList(resultado)
          
         }
        
          useEffect(function () {
            showBooks();
          }, []);
        
          console.log(bookList)
          
          if (bookList === undefined) {
            return (
                <div className="loading">
          <img src={Loading} alt="" />
        <h1>Aguarde, estamos carregando as informações.</h1>
        </div>
      );
    }
        return(
            <div>
                {
                    bookList && bookList.map(function(book){
                        
                        <h3 key={book._id}>{book}</h3>
                    })
                }
            </div>
        )
}