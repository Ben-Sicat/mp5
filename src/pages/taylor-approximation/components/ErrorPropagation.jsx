import { useEffect, useState } from 'react'
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
  const [trueValue, setTrueValue] = useState("0");
  const [decimalPlace, setDecimalPlace] = useState(0);
  const [approximateValue, setApproximateValue] = useState({
    initial: "0",
    chopped: "0",
    rounded: "0"
  });
  const [approximationError, setApproximationError] = useState({
    choppedTrueError: "0",
    choppedRelativeError: "0",
    roundedTrueError: "0",
    roundedRelativeError: "0"
  })
  // approximate values
  
  const [isCalculate, setIsCalculate] = useState(false);

  // useEffect(() => {
  
  // },[trueValue])
  
  function handleTrueValueChange(e) {
    e.preventDefault();
    setTrueValue(e.target.value);
  }

  function handleApproximateValueChange(e) {
    e.preventDefault();

    setApproximateValue(prev => ({
      ...prev,
      initial: e.target.value,
    }))
  }

  function handleChangeDecimalPlace(e) {
    e.preventDefault();
    setDecimalPlace(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsCalculate(true);


    // setApproximateValue(prev => ({ ...prev, rounded: round(approximateValue.initial, decimalPlace)}))
    setApproximateValue(prev => ({
      ...prev,
      chopped: chop(math.evaluate(approximateValue.initial), decimalPlace),
      rounded: round(math.evaluate(approximateValue.initial), decimalPlace)
    }))

    // return { approximationError, approximateValue};
  }

  function resetForm() {
    setIsCalculate(false);
    setTrueValue(0)
    setApproximateValue({
      initial: 0,
      chopped: 0,
      rounded: 0
    })
    setApproximationError({
      choppedTrueError: 0,
      choppedRelativeError: 0,
      roundedTrueError: 0,
      roundedRelativeError: 0
    })
    setDecimalPlace(0);
  }



  return (
    <Box sx={containerStyle}>
      <FormGroup sx={formStyle} >
        <FormControl sx={inputGroup}>
          <TextField
            sx={inputStyle}
            id="true-value"
            label="Enter true value"
            value={trueValue}
            onChange={handleTrueValueChange} />

          <TextField
            sx={inputStyle}
            id="approximate-value"
            label="Enter approximate value"
            value={approximateValue.initial}
            onChange={handleApproximateValueChange} />

          <TextField
            id="decimal-place"
            label="Decimal Places"
            value={decimalPlace}

            onChange={handleChangeDecimalPlace} />
        </FormControl>

          {!isCalculate ? <Button variant="contained" type="submit" onClick={handleSubmit}>
            Calculate
          </Button> : <Button variant="contained" onClick={resetForm}> Restart </Button>}

        {isCalculate && <>
          <Typography sx={{ marginTop: "1em" }}> {`True Value: ${math.evaluate(trueValue)}`}</Typography>

          <Box sx={outputContainer}>
            <Box sx={output}>
              <Typography sx={outputText}>{`Chopped Value: ${approximateValue.chopped}`}</Typography>
              <Typography sx={outputText}>{`True Error (chop): ${calculateTrueError(math.evaluate(trueValue), approximateValue.chopped)}`}</Typography>
              <Typography sx={outputText}>{`Relative Error (chop): ${calculateRelativeError(math.evaluate(trueValue), approximateValue.chopped)} %`}</Typography>
            </Box>

            <Box sx={output}>
              <Typography sx={outputText}>{`Rounded Value: ${approximateValue.rounded}`}</Typography>

              <Typography sx={outputText}>{`True Error (round): ${calculateTrueError(math.evaluate(trueValue), approximateValue.rounded)}`}</Typography>

              <Typography sx={outputText}>{`Relative Error (round): ${calculateRelativeError(math.evaluate(trueValue), approximateValue.rounded)} %`}</Typography>
            </Box>
          </Box>


        </>}

        <Typography sx={{ marginTop: "1em"}}> <a href="https://mathjs.org/docs/expressions/parsing.html" target="_blank"> Syntax guide </a></Typography>
        <Typography sx={{ marginTop: "0.5em"}}> <a href="https://mathjs.org/docs/reference/functions.html" target="_blank"> Functions </a></Typography>
      </FormGroup>
    </Box>
  )
}

export default ErrorPropagation;
