import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'
import currency_list from './currencyNames'

function App() {
  const [convertingFromNumber, setConvertingFromNumber] = useState(0);
  const [convertingToNumber, setConvertingToNumber] = useState(0);
  const [convertingFromCurrency, setConvertingFromCurrency] = useState("");
  const [convertingToCurrency, setConvertingToCurrency] = useState("");

  useEffect(() => {
    const getConversion = async () => {
      console.log(convertingFromCurrency, convertingFromNumber, convertingToCurrency);
      if (convertingFromNumber !== null && convertingToCurrency !== "" && convertingFromCurrency !== "") {
        try {
          const data = await fetch(`https://api.api-ninjas.com/v1/convertcurrency?want=${convertingToCurrency}&have=${convertingFromCurrency}&amount=${convertingFromNumber}`, {
            method: "GET",
            headers: {"X-Api-Key": import.meta.env.VITE_SOME_KEY, // Whenever you use vite you need to use this to include your api key from the env file
                      "Content-Type": "application/json"}
          });
    
          if (!data.ok) {
            console.log("Can't get response");
          }
    
          const json = await data.json();
          console.log(json);
    
          setConvertingToNumber(json.new_amount);
    
        } catch (error) {
          console.log("Couldn't fetch data", error);
        }
      }
    }

  getConversion();
  }, [convertingFromCurrency, convertingToCurrency, convertingFromNumber]);

  const handleNum = (e) => { // When you enter a number on amount from, the currency converter api gets called to convert from the first currency to the second
    if (e.target.value) {
      setConvertingFromNumber(e.target.value);
    }
  }

  const handleFrom = (code) => {
    setConvertingFromCurrency(code);
  }

  const handleTo = (code) => {
    setConvertingToCurrency(code);
  }

  const handleSwitch = () => {
    const copy = convertingFromCurrency;

    setConvertingFromCurrency(convertingToCurrency);
    setConvertingToCurrency(copy);

    document.getElementById("convert-from").value = convertingToCurrency;
    document.getElementById("convert-to").value = convertingFromCurrency;
  }

  return (
    <>
      <div className="currency-card">
        <h1 className='title'>Currency Converter</h1>
        <div className="amounts">
          <div className="from">
            <label htmlFor="convert-from">Amount from</label>
            <input type="number" id='convert-from' min={0} onChange={handleNum} value={convertingFromNumber} />
          </div>
          <div className="to">
            <label htmlFor="convert-to">Amount to</label>
            <input type="number" id='convert-to' min={0} value={convertingToNumber}/>
          </div>
        </div>
        <div className="currency">
          <div className='curr-from'>
            <label htmlFor="currency-from">Converting from</label>
            <select name="currency-from" id="currency-from" onChange={(e) => handleFrom(e.target.value)} value={convertingFromCurrency}>
              {currency_list.map((currency) => {
                return <option key={currency.code} value={currency.code} id='fr'>{currency.code}</option>
              })}
            </select>
          </div>
          <button className='arrows'><img src="/backforth.png" alt="b" className='arrow' width={30} height={30} onClick={handleSwitch}/></button>
          <div className='curr-to'>
            <label htmlFor="currency-to">Converting to</label>
            <select name="currency-to" id="currency-to" onChange={(e) => handleTo(e.target.value)} value={convertingToCurrency}>
              {currency_list.map((currency) => {
                return <option key={currency.code} value={currency.code} id='to'>{currency.code}</option>
              })}
            </select>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
