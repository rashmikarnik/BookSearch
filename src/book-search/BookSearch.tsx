import React, { useEffect, useState, useContext } from "react";

import { getBooksByType } from "./book-search.service";
import "../styles/new.css";

import {
  Card,
  CardImg,
  CardBody,
  Button,
  CardTitle,
  Row,
  Col,
  CardText,
  CardHeader,
} from "reactstrap";

/* Context to Pass the books searchec*/
const bookContext = React.createContext([{}]);

const BookSearch = () => {
  /* Take the input and updatebooktype to be searched in form click*/
  const [bookType, updateBookType] = useState("");
  const [bookTypeToSearch, updateBookTypeToSearch] = useState("");
  /*Give search result with list of books*/
  const [allAvailableBooks, setAllAvailableBooks] = useState([]);

  async function requestBooks() {
    if (bookTypeToSearch) {
      const allBooks = await getBooksByType(bookTypeToSearch);
      setAllAvailableBooks(allBooks.items);
    }
  }

  useEffect(() => {
    async function getAllBooks() {
      await requestBooks();
    }
    getAllBooks();
  }, [bookTypeToSearch]);

  return (
    <>
      <div className="book--container">
        <div className="search-params">
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateBookTypeToSearch(bookType);
              }}
            >
              <input
                className="full-width"
                autoFocus
                name="gsearch"
                type="search"
                value={bookType}
                placeholder="Search for books to add to your reading list and press Enter"
                onChange={(e) => updateBookType(e.target.value)}
              />
            </form>

            <div>
              <bookContext.Provider value={allAvailableBooks}>
                <DisplayBook></DisplayBook>
              </bookContext.Provider>
            </div>

            {/* {!bookType && (
              <div className="empty">
                <p>
                  Try searching for a topic, for example
                  <a
                    onClick={() => {
                      updateBookType("Javascript");
                    }}
                  >
                    "Javascript"
                  </a>
                </p>
              </div>
            )} */}
          </div>
        </div>
      </div>

      {<pre>{JSON.stringify(allAvailableBooks, null, 4)}</pre>}
    </>
  );
};

/*Function to Display the books according to search value*/

const DisplayBook = () => {
  {
    const context = useContext(bookContext);
    const [list, setList] = useState([]);
    const [count, setcount] = useState(0);

    /* Adds clicked book to wish list */
    const handleaddToWishList = (addel: any) => {
      /*Avoid Same book adding to book wish list*/
      let newList = list;
      let found = false;
      if (newList.length > 0) {
        newList.forEach((element) => {
          if (element === addel) {
            alert("The Book \"" + addel + "\" you are trying to add already exists in My Wish List");
            found = true;
            setList(newList);
          }
        });
      }
      if (newList.length <= 0 || !found) {
        newList = list.concat(addel);
        setList(newList);
        setcount(count + 1);
      }
    };

    /* Remove Books from wish List */
    const handleRemove = (removeel: any) => {
      const dataRemove = [...list];
      let item = dataRemove.filter((el: any) => el !== removeel);
      setList(item);
      setcount(count - 1);
    };

    return (
      <div>
        <Row>
          {/*  */}
          <Col className="d-flex flex-wrap col-sm-6 col-md-9 col-lg-10">
            {context.map((b: any, key: any) => {
              return (
                <Card
                  key={b.id}
                  style={{
                    backgroundColor: "#white",
                    borderColor: "#333",
                    width: "15rem",
                    height: "400px",
                    margin: "2px",
                  }}
                >
                  <CardImg
                    top
                    width="80%"
                    height="20%"
                    src={b.volumeInfo.imageLinks.thumbnail}
                    alt="Card image cap"
                  />
                  <CardBody>
                    <CardHeader className="font-weight-bold">
                      {b.volumeInfo.title}
                    </CardHeader>
                    <CardTitle className="font-weight-light">
                      <label>Author:</label> {b.volumeInfo.authors}
                    </CardTitle>
                    <CardTitle className="font-weight-light font-italic">
                      <label>Publisher:</label> {b.volumeInfo.publisher}
                      {b.volumeInfo.publishedDate}
                    </CardTitle>
                    <CardText className="text-truncate">
                      <label>Description:</label> {b.volumeInfo.description}
                    </CardText>
                    <Button
                      type="button"
                      onClick={() => handleaddToWishList(b.volumeInfo.title)}
                    >
                      Add To MyList
                    </Button>
                    </CardBody>
                </Card>
              );
            })}
          </Col>
          
          <Col className="sidebar border border-dark">
            <CountDisplay count={count}></CountDisplay>
            <div>
              <AddBookToWishList
                count={count}
                data={list}
                newRemove={handleRemove}
              ></AddBookToWishList>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
};

const CountDisplay = ({count}:any) =>{
  return(
    <div>
 <label style={{ fontSize: "14px", color: "green", fontWeight: "bold" }}>
        My Reading Wish List ({count})
      </label>
    </div>
  )

}

const AddBookToWishList = (props: any) => {
  return (
    <div>
     
      {props.data.map((a: any, index: any) => {
        return (
          <ul className="list-group">
            <li key={index} className="list-group-item">{a}
            <button type="button" onClick={() => props.newRemove(a)}>
              X
            </button>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default BookSearch;
