import 'bulma/css/bulma.css'

// Import React and Component
    import React, { Component } from 'react';
    // Import CSS from App.css
    import './App.css';
    // Import the Today component to be used below
    import Today from './Today/Today'
    // Import the History component to be used below
    import History from './History/History'

    class App extends Component {
      render() {
        return (
          <div className="">
              <div className="topheader">
                  <header className="container">
                      <nav className="navbar">
                          <div className="navbar-brand">
                              <span className="navbar-item">Crypto Trail</span>
                          </div>
                          <div className="navbar-end">
                              <a className="navbar-item" href="https://cryptocompare.com" target="_blank" rel="noopener noreferrer">Cryptocompare.com</a>
                          </div>
                      </nav>
                  </header>
              </div>
              <section className="results--section">
                  <div className="container">
                      <h1>Crypto Trail is a realtime price information about<br></br> BTC, ETH and LTC.</h1>
                  </div>
                  <div className="results--section__inner">
                      <Today />
                      <History />
                  </div>
              </section>
          </div>
        );
      }
    }

    export default App;