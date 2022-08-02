import React from 'react'
import ReactDOM from 'react-dom'
import './popup.css'
import Main from '../components/Main';

const App: React.FC<{}> = () => {
    return (
        <>
            <Main/>
        </>
    )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App/>, root)
