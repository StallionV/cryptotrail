import React, { Component } from 'react';
import './Today.css' 
import axios from 'axios'

class Today extends Component {
        // Adds a class constructor that assigns the initial state values:
        constructor () {
            super();
            this.state = {};
        }
        // This is called when an instance of a component is being created and inserted into the DOM.
        componentWillMount () {
            let coins = this.props.coins;
            if (!navigator.onLine) {
                coins.forEach(c => {
                    this.setState({ [c]: localStorage.getItem(c) });
                });
            }
            setInterval(() => {
            axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${coins.join(",")}&tsyms=USD`)
                .then(response => {
                    // We set the latest prices in the state to the prices gotten from Cryptocurrency.
                    let dt = Object.entries(response.data);
                    dt.forEach( b => {
                        let [key, value] = [...b];
                        this.setState({ [key]: value.USD });
                        localStorage.setItem( key, value.USD);
                    });
                })
                // Catch any error here
                .catch(error => {
                    console.log(error)
                });
            }, 10000);    
        }
        currentPrice() {
            return ( Object.keys(this.state).map( s => {
                        let val = s.toLowerCase();
                        return <div key= {s} className={`column ${s.toLowerCase()}--section`}>
                            <h5>${this.state[s]}</h5>
                            <p>1 {s}</p>
                        </div>
                    }) 
            )
        }
        // The render method contains the JSX code which will be compiled to HTML.
        render() {
            return(
                <div className="today--section container">
                    <h2>Current Price</h2>
                    <div className="columns today--section__box">
                    {this.currentPrice()}
                    </div>
                </div>)
        }
    }

    export default Today;