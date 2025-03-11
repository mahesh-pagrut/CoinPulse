import React from 'react'
import './Coin.css'
import { useParams } from 'react-router-dom'

const Coin = () => {

    const {coinId} = useParams();

  return (
    <div>
        <p>- {coinId}</p>
    </div>
  )
}

export default Coin