import { useState } from 'react'
import {
  Box,
  Modal,
  Typography,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Button,
  FormGroup
} from '@mui/material'
import * as math from "mathjs";

// strategy pattern
// import { context } from '../../../../functions/context';
import { calculateTrueError, calculateRelativeError } from '../../../functions/calculateApproximation';

import round from '../../../functions/Round';
import chop from '../../../functions/Chop'
import { typeOf } from 'mathjs';


const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  // alignItems: 'center',
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: "100%"
  // alignItems: 'center',
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

function ErrorPropagation() {
  // user input
  const [equation, setEquation] = useState("0");
  const [decimalPlace, setDecimalPlace] = useState(0);
  // approximate values
  const [chopValue, setChopValue] = useState(0);
  const [roundValue, setRoundValue] = useState(0);
  
  const [remarks, setRemarks] = useState("");
  const [isCalculate, setIsCalculate] = useState(false);
  const [trueValue, setTrueValue] = useState();
  const [errMessage, setErrMessage] = useState("");
  
  function handleChangeEquation(e) {
    setEquation(e.target.value);
  }

  function handleChangeDecimalPlace(e) {
    setDecimalPlace(e.target.value);
  }


  function handleSubmit(e) {
    if (equation === "") {
      setErrMessage('Please enter a value to approximate');
      return;
    }
    
    setChopValue(chop(equation, decimalPlace))
    setRoundValue(round(equation, decimalPlace))
    
    try {
      e.preventDefault();
      setIsCalculate(true);
      setTrueValue(math.evaluate(equation));
    } catch (e) {
      setErrMessage(`There was a problem processing your request: ${e.message}`)
    }
  }


  function resetForm(e) {
    setEquation("");
    setErrMessage("");
    setRemarks("");
    setDecimalPlace(0);
    setIsCalculate(false);
    e.preventDefault();
  }


  return (
    <Box sx={containerStyle}>
      <FormGroup sx={formStyle} >
        <FormControl sx={inputGroup}>
          <TextField
            sx={inputStyle}
            id="equation"
            label="Enter your equation"
            disabled={isCalculate}
            value={equation}
            onChange={handleChangeEquation} />

          <TextField
            id="decimal-place"
            label="Decimal Places"
            disabled={isCalculate}
            value={decimalPlace}
            onChange={handleChangeDecimalPlace} />
        </FormControl>

          {!isCalculate ? <Button variant="contained" type="submit" onClick={handleSubmit}>
            Calculate
          </Button> : <Button variant="contained" onClick={resetForm}> Restart </Button>}

          {!isCalculate && <Typography type="error" sx={{ color: "red"}}>{errMessage}</Typography>}

        {isCalculate && <>
          <Typography sx={{ marginTop: "1em" }}> {`True Value: ${trueValue}`}</Typography>

          <Box sx={outputContainer}>
            <Box sx={output}>
              <Typography sx={outputText}>{`Chopped Value: ${chopValue}`}</Typography>
              <Typography sx={outputText}>{`True Error (chop): ${calculateTrueError(trueValue, chopValue) }`}</Typography>
              <Typography sx={outputText}>{`Relative Error (chop): ${calculateRelativeError(trueValue, chopValue)} %`}</Typography>
            </Box>

            <Box sx={output}>
              <Typography sx={outputText}>{`Rounded Value: ${roundValue}`}</Typography>
              <Typography sx={outputText}>{`True Error (round): ${calculateTrueError(trueValue, roundValue)}`}</Typography>
              <Typography sx={outputText}>{`Relative Error (round): ${calculateRelativeError(trueValue, roundValue)} %`}</Typography>
            </Box>
          </Box>

          <Typography sx={{ fontWeight: "bold", marginBottom: '0.5em' }}>
            {`Answer = ${calculateTrueError(trueValue, chopValue) < calculateTrueError(trueValue, chopValue) ? chopValue : roundValue}`}
          </Typography>

        </>}

        <Typography sx={{ marginTop: "1em"}}> <a href="https://mathjs.org/docs/expressions/parsing.html" target="_blank"> Syntax guide </a></Typography>
        <Typography sx={{ marginTop: "0.5em"}}> <a href="https://mathjs.org/docs/reference/functions.html" target="_blank"> Functions </a></Typography>
      </FormGroup>
    </Box>
  )
}

export default ErrorPropagation;
