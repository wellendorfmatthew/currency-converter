import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import currency_list from './currencyNames'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="currency-card">
        <h1>Currency Converter</h1>
        <div className="amounts">
          <div className="from">
            <label htmlFor="convert-from">Converting from</label>
            <input type="text" id='convert-from'/>
          </div>
          <div className="to">
            <label htmlFor="convert-to">Converting to</label>
            <input type="text" id='convert-to'/>
          </div>
        </div>
        <div className="currency">
          <button className='currency-from'></button>
          <button className='currency-to'></button>
        </div>
        <div className="currencies">
        </div>
        {currency_list.map((currency) => {
          
        })}
      </div>
    </>
  )
}

export default App
