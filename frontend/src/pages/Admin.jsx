import {Api} from "../API/api"
import {Book} from "../components/Book"
import Logo from "../assets/log.png"
import { ToastContainer, toast } from 'react-toastify';
import duration from "dayjs/plugin/duration"
import * as dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useState,useEffect } from "react"
import { Booking } from "../components/Booking"
import "../App.css"
import 'react-toastify/dist/ReactToastify.min.css';

import { ButtonCreate } from "../components/ButtonCreate";
import { ButtonReport } from "../components/ButtonReport";

export function Admin(){
    const [bookList,setBooksList]=useState()
    const [bookingList,setBookingsList]=useState()

    dayjs.extend(duration)

  async function showBooks(){
    const response = await Api.books.readAll()
    const resultado = await response.json()
  setBooksList(resultado)
 }
 async function showBookings(){
  const response = await Api.bookings.readAll()
  const resultado = await response.json()

setBookingsList(resultado)
}
  useEffect(function () {
    showBooks();
    showBookings()

  }, []);
  if (bookingList === undefined||bookList === undefined) {
    return (
        <div>
        <h1>Carregando</h1>
        </div>
  )
}
  
  return (
    <div className="App">
      <div className="container">
      <img className="logoImage"src={Logo} alt="" />
      <div className="menu">
      <ButtonCreate refreshBooks={showBooks}/>
      <ButtonReport />
       
      </div>    

         <div className="content">
      <div >
      <h2 className="titleTag">Acervo</h2>
      <div className="listbooks">
      {bookList.map((book)=>(
            
            <Book 
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
        <div >
          
        <h2 className="titleTag">Reservas</h2>
        <div className="bookings">
        {bookingList.map((booking)=>(
            
            <Booking 
            name={booking.bookingName} 
            id={booking._id}
            key={booking._id}
            title={booking.name}
            number={booking.telNumber}
            date={booking.bookingDate}
            status={booking.bookingStatus}
            refreshbookings={showBookings}
            
            />
          ))}
</div>
      </div>
      </div>
      </div>
      <ToastContainer />
    </div>
  )
}

 