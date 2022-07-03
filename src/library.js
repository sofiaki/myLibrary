import db from "./firebase";
import { useEffect, useState } from "react";
import styles from "./index.css";

function Library() {
  var [books, setBooks] = useState([]);
  var [hidden, setHidden] = useState(true);
  useEffect(() => {
    db.collection("books").onSnapshot((data) => {
      setBooks(data.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
  }, [books]);

  function addBook(e) {
    e.preventDefault();
    db.collection("books").add({
      title: document.getElementById("title").value,
      author: document.getElementById("author").value,
      pages: document.getElementById("pages").value,
      read: document.getElementById("read").checked,
    });
    document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").checked = false;
  }
  function remove(id){
    db.collection("books").doc(id).delete()
  }
  function updateRead(book){
    let setRead = book.data.read?false:true
    db.collection("books").doc(book.id).set({title: book.data.title, author: book.data.author, pages: book.data.pages, read: setRead} )
  }
  function hide() {
    hidden ? setHidden(false) : setHidden(true);
    console.log(hidden)
  }
  return (
    <>
      <h1>My Library</h1>
      <button
        className="button hover"
        onClick={() => hide()}
      >
        Add a book
      </button>
      <div id="form" className={hidden ? "hide" : ``}>
        <form>
          <div className="row mt10">
            <div className="col1">
              <label>Title</label>
            </div>
            <div className="col3">
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title.."
              />
            </div>
          </div>
          <div className="row">
            <div className="col1">
              <label>Author</label>
            </div>
            <div className="col3">
              <input
                type="text"
                id="author"
                name="author"
                placeholder="Author.."
              />
            </div>
          </div>
          <div className="row">
            <div className="col1">
              <label>Pages</label>
            </div>
            <div className="col3">
              <input
                type="text"
                id="pages"
                name="pages"
                placeholder="Pages.."
              />
            </div>
          </div>
          <div className="row">
            <input type="checkbox" id="read" name="read" value="true" />
            <label> I have read it</label>
          </div>
          <div className="row">
            <button
              className="button mt10"
              onClick={(e) => addBook(e)}
            >
              +
            </button>
          </div>
        </form>
      </div>
      <div className="displayArea">
      {books.map((book) => (
        <div key={book.id} className="displayBox">
          <div className="mt10">{book.data.title}</div>
          <div className="mt10">{book.data.author}</div>
          <div className="mt10">{book.data.pages}</div>
          <div className="mt10">{book.data.read?"Have read it.":"Have not read it yet."}</div>
          <button
        className="button hover mt10"
        onClick={() => updateRead(book)}
      >
        Update Read
      </button>
          <button
        className="button hover"
        onClick={() => remove(book.id)}
      >
        Delete
      </button>
        </div>
      ))}
      </div>
    </>
  );
}

export default Library;
