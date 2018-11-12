import React, { Component } from 'react';
import './History.css'
import axios from 'axios'
import moment from 'moment'

class History extends Component {
	constructor() {
		super();
		this.state = {
			todayprice: {},
			yesterdayprice: {},
			twodaysprice: {},
			threedaysprice: {},
			fourdaysprice: {}
		}
	}

	// This function gets the coin price for a specific timestamp/date. The date is passed in as an argument along with the coin code
	getPricesForAllCoins (date, coin) {
	  return axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=${coin.toUpperCase()}&tsyms=USD&ts=${date}`);
	}
	
	// Get current price or price based on timestamp passed
    getPriceForTheDay ({t = moment().unix(), component}) {
        
        // axios.all is used to make concurrent API requests. These requests were the functions we first created and they accept an argument of the date required.
        axios.all(this.props.coins.map(c => this.getPricesForAllCoins(t, c)))
            .then(axios.spread((...args) => {
                let f = { date: moment.unix(t).format("MMMM Do YYYY") };
                args.forEach( (a,i) =>  {
                    let coinKey = this.props.coins[i]
                    f[coinKey] = a.data[coinKey.toUpperCase()].USD
                });
                // Set the state of price component to the content of the object f
                this.setState({ [component]: f });
            }));
    }

    // This is called when an instance of a component is being created and inserted into the DOM.
    componentWillMount () {
        this.getPriceForTheDay({t: moment().unix(), component: "todayprice"});
        this.getPriceForTheDay({t: moment().subtract(1, 'days').unix(), component: "yesterdayprice"});
        this.getPriceForTheDay({t: moment().subtract(2, 'days').unix(), component: "twodaysprice"});
        this.getPriceForTheDay({t: moment().subtract(3, 'days').unix(), component: "threedaysprice"});
        this.getPriceForTheDay({t: moment().subtract(4, 'days').unix(), component: "fourdaysprice"});
    }

    historicPrice() {
        return ( Object.keys(this.state).map( s => {
                        return <div key={s} className="history--section__box__inner">
                                    <h4>{this.state[s].date}</h4>
                                    <div className="columns">
                                        {this.coinPrice(s)}
                                    </div>
                                </div>
                    }) 
            )
    }

    coinPrice(day) {
        return (
                this.props.coins.map(c => {
                    return <div key={c} className="column">
                                <p>1 {c.toUpperCase()} = ${this.state[day][c.toUpperCase()]}</p>
                            </div>
                })      
            )
    }

	render() {
        return (
            <div className="history--section container">
                <h2>History (Past 5 days)</h2>
                <div className="history--section__box">
                {this.historicPrice()}
                </div>
            </div>
        )
    }
}
export default History;