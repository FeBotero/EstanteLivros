import "./books.css"

export function Book({coverImage,id,refreshBooks}){
    // refreshBooks()
    return(
        <div className="containerBooks">
            <div className="books">
                <img src={coverImage} alt=""id={id} />
            </div>
            
        </div>
    )
}