import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import COLORS from './colors'
// import * as cheerio from 'cheerio'
import axios from 'axios'


const Square = () => {
  return <div style={{height: '35px', width: '35px', backgroundColor: COLORS.color13, border: '2px solid black'}}></div>
}
async function getHTML() {
  const { data: html} = await axios({
    method: 'get',
    url: 'https://imdb.com/chart/top',
    withCredentials: false,
    headers: {
      "Access-Control-Allow-Origin": '*',
      "Content-Type": "application/json"
    }

  })
  return html
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <button style={{border: '2px solid red'}} onClick={async () => console.log(await getHTML())}>Steal Board!</button>
    <Square />
    <Square />
    <Square />
    <Square />
    <Square />
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
