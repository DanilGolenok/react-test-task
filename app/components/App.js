import '../styles/app.scss'
import { connect as tickerConnect } from '../services'
import { connect } from 'react-redux'
import React, { PureComponent } from 'react'
import PriceChart from './PriceChart.jsx'
import { UPDATE_STOCK_TICKER } from '../reducers/types'
import StockPanel from './StockPanel.jsx'
import UpdateInterval from './UpdateInterval.jsx'

const PRICES_LEN = 15

class App extends PureComponent {
  constructor() {
    super()
    this.prices = []
  }

  componentDidMount() {
    tickerConnect('AAPL', this.props.updateStockTicker)
  }

  managePrices() {
    const { price } = this.props.ticker
    if (!price) return

    this.prices.push(price)

    if (this.prices.length > PRICES_LEN) {
      this.prices.splice(0, this.prices.length - PRICES_LEN)
    }
  }

  render() {
    this.managePrices()
    const { ticker } = this.props

    return (
      <div className="stock-ticker">
        <StockPanel ticker={ticker} initialPrice={this.prices[0]} />
        <PriceChart prices={this.prices} />
        <UpdateInterval ticker={ticker} />
      </div>
    )
  }
}

const mapStateToProps = state => ({ ticker: state })
const mapDispatchToProps = dispatch => ({
  updateStockTicker: data =>
    dispatch({ type: UPDATE_STOCK_TICKER, payload: data })
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
