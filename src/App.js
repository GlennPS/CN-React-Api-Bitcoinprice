
import { useState, useEffect } from 'react'   //imports libraries "useSate, useEffect"
const App = () => {                           //creates a new named "App" function "=> {"
  const [price, setPrice] = useState("")      //App func's variables set as
  const[currency, setCurrency] = useState("")
  const [error, setError] = useState({
    error: false,
    message: ""
  })
  const collect = async () => {
    try{
      const response = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
      console.log(response)
      
      if(response.status !=200){
        throw new Error("oops")
      }
      const data = await response.json()
      console.log(data.bpi)
      setPrice(data.bpi.GBP.rate)
      setCurrency(data.bpi.GBP.code)
      // price=data.bpi.GBP.rate
    } catch (error) {
      setError({ error:true, message: error.message })   
    }
  }

  useEffect (() => {
    collect()
    console.log("hello")
  }, [] )                         //in [] you would put your variable(s) to keep a check on. 
                                  //just [] means it would run just once on load.
  if(error.error){                // 
    return <h1>an error has occured: {error.message}</h1>
  }
  if(!price){
    console.log("loading...")
    return ( <p>loading...</p>)
  }
  
  return (
    <div>
      <h1> Current Price: {price}</h1>
      <h2> currency code: {currency}</h2>
      <button onClick={collect}>fetch</button>

    </div>
  )
}

export default App
