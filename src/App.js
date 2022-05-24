
import React from 'react';
import './App.css';
import Content from './Components/Content';
import ContentFooter from './Components/ContentFooter';
import Footer from './Components/Footer';
import Header from './Components/Header';

function App() {
  return (
    <React.Fragment> 
    <section className="todoapp">
        <Header />
        <Content />
        <ContentFooter />
       
    </section>
    <Footer />
    </React.Fragment>
  );
}

export default App;
