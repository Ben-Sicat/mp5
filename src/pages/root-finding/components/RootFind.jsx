import React, { useState }  from 'react'
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  FormLabel,
  Button,
  TextField,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel
} from '@mui/material'

import { InlineMath } from 'react-katex';
import { rootFindSecant, testSecant} from '../../../functions/rootFindSecant';
import { rootFindBisection } from '../../../functions/rootFindBisection';

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

function RootFind({ rootFunctionValueType }) {
  const [rootFindInput, setRootFindInput] = useState({
    userFunction: rootFunctionValueType === "predefined" ? "log(x+1,e)" : "",
    firstGuessPoint: 0,
    secondGuessPoint: 1,
    numberOfIterations: 0,
    tolerance: 0,
  })
  const [rootFindOutput, setRootFindOutput] = useState([])
  const [isCalculate, setIsCalculate] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedApproach, setSelectedApproach] = useState('')
  
  async function handleSubmit(e) {
    if (rootFindInput.userFunction === "" || rootFindInput.userFunction === "f(x)") {
      // setErrMessage('Please enter a valid function');
      return;
    }
    
    try {
      e.preventDefault();
      setIsCalculate(true);
      console.log(rootFindInput)
      console.log(rootFindSecant(rootFindInput));
      console.log(rootFindBisection(rootFindInput))
      if (selectedMethod === "bisection") {
        setRootFindOutput(rootFindBisection(rootFindInput))
        return;
      }
      setRootFindOutput(rootFindSecant(rootFindInput));
    } catch (e) {
      setErrMessage(`There was a problem processing your request: ${e.message}`)
    }
  }

  function resetForm(e) {
    setRootFindInput({
      userFunction: rootFunctionValueType === "predefined" ? "log(x+1,e)" : "",
      firstGuessPoint: 0,
      secondGuessPoint: 1,
      numberOfIterations: 0,
      tolerance: 0,
    })
    setErrMessage('');
    setSelectedMethod('');
    setIsCalculate(false);
    setSelectedApproach('');
    setRootFindOutput([]);
  }

  function handleApproachChange(e) {
    setSelectedApproach(e.target.value)
  }

  function handleMethodChange(e) {
    setSelectedMethod(e.target.value);
  }

  return (
    <div>
      <FormControl>
        <FormLabel id="root-find-approach-label">Approach</FormLabel>
        <RadioGroup
          row
          name="root-find-approach-group"
          value={selectedApproach}
          onChange={handleApproachChange}
        >
          <FormControlLabel value="iterative" control={<Radio />} label="Iterative approach" />
          <FormControlLabel value="tolerance" control={<Radio />} label="Tolerance approach (Ɛ)" />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel id="root-find-method-label">Method</FormLabel>
        <RadioGroup
          row
          name="root-find-method-group"
          value={selectedMethod}
          onChange={handleMethodChange}
        >
          <FormControlLabel value="bisection" control={<Radio />} label="Bisection method" />
          <FormControlLabel value="secant" control={<Radio />} label="Secant method" />
        </RadioGroup>
      </FormControl>

       <FormControl sx={inputGroup}>

        {rootFunctionValueType === "userdefined" && <TextField
          sx={inputStyle}
          id="equation"
          label="f(x)"
          value={rootFindInput.userFunction}
          onChange={(e) => setRootFindInput(prev => ({ ...prev, userFunction: e.target.value }))} />}

        {rootFunctionValueType === "predefined" && <Typography variant="h4"> ln(x + 1)</Typography>}

        <TextField
          sx={inputStyle}
          id="first_guess"
          label="x0"
          value={rootFindInput.firstGuessPoint}
          onChange={(e) => setRootFindInput(prev => ({...prev, firstGuessPoint: e.target.value}))} />

        <TextField
          sx={inputStyle}
          id="equation"
          label="x1"
          value={rootFindInput.secondGuessPoint}
          onChange={(e) => setRootFindInput(prev => ({...prev, secondGuessPoint: e.target.value}))} />

        {selectedApproach === "iterative" &&
          <TextField
            sx={inputStyle}
            id="equation"
            label="Number of iterations"
            value={rootFindInput.numberOfIterations}
            onChange={(e) => setRootFindInput(prev => ({...prev, numberOfIterations: e.target.value}))} />
        }

        {selectedApproach === "tolerance" &&
          <TextField
            sx={inputStyle}
            id="equation"
            label="Ɛ"
            value={rootFindInput.tolerance}
            onChange={(e) => setRootFindInput(prev => ({...prev, tolerance: e.target.value}))} />
        }
      </FormControl>

      {
        isCalculate && selectedMethod === "secant" && <>
            {`c = ${rootFindOutput[rootFindOutput.length - 1].nextPoint}`}
            {`f(c) = ${rootFindOutput[rootFindOutput.length - 1].nextPointOutput}`}
            {`${selectedApproach === "iterative" ? `Ɛ = ${rootFindOutput[rootFindOutput.length - 1].toleranceValue}`: `n=${rootFindOutput[rootFindOutput.length - 1].iteration}`}`}
        </>
      }

      {
        isCalculate && selectedMethod === "bisection" && <>
            {`c = ${rootFindOutput[rootFindOutput.length - 1].midpoint}`}
            {`f(c) = ${rootFindOutput[rootFindOutput.length - 1].midpointOutput}`}
            {`${selectedApproach === "iterative" ? `Ɛ = ${rootFindOutput[rootFindOutput.length - 1].toleranceValue}`: `n=${rootFindOutput[rootFindOutput.length - 1].iteration}`}`}
        </>
      }
<Button variant="contained" type="submit" onClick={handleSubmit}>
        Calculate
      </Button>
      {/* {!isCalculate ?  : <Button variant="contained" onClick={resetForm}> Restart </Button>} */}

        {!isCalculate && <Typography type="error" sx={{ color: "red"}}>{errMessage}</Typography>}
    </div>
  )
}

export default RootFind