import React from 'react'
import ReactDOM from 'react-dom/client'
import './popup.css'

const PopUp = () => {
  let browser = process.env.BROWSER
  browser = browser.charAt(0).toUpperCase() + browser.slice(1)

  return <h1>Extension for {browser}</h1>
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.createRoot(root).render(<PopUp />)
