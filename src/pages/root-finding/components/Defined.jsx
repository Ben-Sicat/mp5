import React, { useState }  from 'react'
import {
  FormControl,
  InputLabel,
  TextField
} from '@mui/material'

import { InlineMath, BlockMath } from 'react-katex';

// i need a function that can calculate the secant formula with the object as it's parameter, unwrap it.
// calculation output
// for let i = 1; i <= n; i++
// do secant method stuff
// push results
// result = {
//      1: [{}],
//       2: [{}],
      // ...
      // n: [{}]
// }

function formatSecantValue(userFunction, firstGuess, secondGuess, numberOfIterations, accuracy) {
  return {
    userFunction,
    firstGuess,
    secondGuess,
    numberOfIterations,
    accuracy
  }
}

export const inputGroup = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: "center",
  justifyContent: "space-around",
}

export const outputContainer = {
  display: "flex",
  marginTop: "1em"
}

export const output = {
  display: "flex",
  flexDirection: "column",
  textAlign: "left"
}

export const inputStyle = {
  marginTop: "1em",
  marginBottom: "1em",
  marginRight: "1em"
}

export const outputText = {
  marginBottom: "1em"
}

function Defined() {
  const [userValues, setUserValue] = useState({
    userFunction: 'f(x)',
    firstGuess: 0,
    secondGuess: 0,
    numberOfIterations: 0,
    accuracy: 0,
  })

  function handleIterationFocus() {}
  function handleAccuracyFocus() {}

  return (
    <div>
      <FormControl sx={inputGroup}>
        <TextField
          sx={inputStyle}
          id="equation"
          label={"Function"}
          value={userValues.functionOfX}
          onChange={(prev, e) => setUserValue({...prev, functionOfX: e.target.value})} />

        <TextField
          sx={inputStyle}
          id="first_guess"
          label="First guess value"
          value={userValues.firstGuess}
          onChange={(prev, e) => setUserValue({...prev, firstGuess: e.target.value})} />

        <TextField
          sx={inputStyle}
          id="equation"
          label="Second guess value"
          value={userValues.secondGuess}
          onChange={(prev, e) => setUserValue({...prev, secondGuess: e.target.value})} />

        <TextField
          sx={inputStyle}
          id="equation"
          label="Number of iterations"
          onFocus={handleIterationFocus}
          value={userValues.numberOfIterations}
          onChange={(prev, e) => setUserValue({...prev, numberOfIterations: e.target.value})} />

        <TextField
          sx={inputStyle}
          id="equation"
          label="Accuracy value"
          value={userValues.accuracy}
          onFocus={handleAccuracyFocus}
          onChange={(prev, e) => setUserValue({...prev, accuracy: e.target.value})} />
      </FormControl>
    </div>
  )
}

export default Defined