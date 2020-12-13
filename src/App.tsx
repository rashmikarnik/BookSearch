import React, { Component } from 'react'
import './styles/App.scss';
import BookSearch from './book-search/BookSearch';
import ParentModal from './book-search/test';

function App() {
  return (
      <div>
        <header className="header">
          <div className="header--content">
            <h1>My Good Reads</h1>
          </div>
        </header>
        <main>
          <BookSearch/>

                  </main>
                  
{/* <ParentModal></ParentModal> */}
      </div>
  );
}

export default App;
