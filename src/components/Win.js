import React from 'react'
import Confetti from 'react-confetti'

const Win = ({playWinner}) => {
    playWinner()
  return (
    <Confetti />
  )
}

export default Win