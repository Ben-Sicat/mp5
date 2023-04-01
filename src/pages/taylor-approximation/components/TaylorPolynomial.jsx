import { useState } from 'react'
import { createPortal } from 'react-dom';
import {
  Typography,
  TextField,
  Button,
  Box,
  FormGroup
} from '@mui/material'

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

import getTaylor from '../../../functions/getTaylor';
import calculateTaylor from '../../../functions/calculateTaylor';
import { outputText, output, inputGroup, inputStyle} from './ErrorPropagation';
import { calculateTrueError, calculateRelativeError} from '../../../functions/calculateApproximation';

const outputContainer = {
  marginTop: "1em",
  marginBottom: "0.5em",
  display: "flex",
  justifyContent: "space-around"
}

const errorOutputContainer = {
  marginTop: "1em",
  marginBottom: "0.5em",
  display: "flex",
  justifyContent: "space-between"
}

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: "100%",
  maxWidth: "700px",
  flexWrap: "wrap"
}

const mathContainer = {
  display: "flex",
  width: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
}

const formStyle = {
  width: "100%",
  maxWidth: "700px"
}

function TaylorPolynomial() {
  // input values
  const [degree, setDegree] = useState(0);
  const [taylorResult, setTaylorResult] = useState({});
  const [taylorValue, setTaylorValue] = useState(0);
  const [decimalPlace, setDecimalPlace] = useState(0);

  const [taylorEquation, setTaylorEquation] = useState('');
  const [isCalculate, setIsCalculate] = useState(false);

  function handleChangeDegree(e) {
    setDegree(e.target.value);
  }

  function handleChangeTaylorValue(e) {
    setTaylorValue(e.target.value);
  }

  function handleChangeDecimalPlace(e) {
    setDecimalPlace(e.target.value);
  }

  function handleSubmit() {
    setIsCalculate(true);
    setTaylorEquation(getTaylor(degree, taylorValue, decimalPlace));
    setTaylorResult(calculateTaylor(degree, taylorValue, decimalPlace));
  }

  function handleReset(e) {
    e.preventDefault();
    setTaylorEquation('');
    setTaylorResult({});
    setDegree(0)
    setTaylorValue(0);
    setDecimalPlace(0);
    setIsCalculate(false);
  }

  return (
    <Box sx={style}>
      <FormGroup sx={formStyle}>
        <Typography variant='h2'>
          ln (x + 1)
        </Typography>

        <Box sx={inputGroup}>
          <TextField sx={inputStyle} disabled={isCalculate} label='Degree' value={degree} onChange={handleChangeDegree} />
          <TextField sx={inputStyle} disabled={isCalculate} label='X' value={taylorValue} onChange={handleChangeTaylorValue} />
          <TextField disabled={isCalculate} label='Decimal places' value={decimalPlace} onChange={handleChangeDecimalPlace} />
        </Box>

        {!isCalculate && <Button variant="contained" type="submit" onClick={handleSubmit}> Calculate </Button>}
        {isCalculate && <Button variant="contained" onClick={handleReset}> Reset </Button>}

      </FormGroup>
        {/* where math equation happens */}
      {isCalculate && <>
        <Box sx={outputContainer}>
          <InlineMath>{`n=${degree}`}</InlineMath>
          <InlineMath>{`x=${taylorValue}`}</InlineMath>
        </Box>

        <Box sx={mathContainer}>
          <BlockMath >{`P_{${degree}}(x)=${taylorEquation}`}</BlockMath>
          <Typography sx={{ marginTop: "1em" }}> {`True Value: ${taylorResult.trueValue}`}</Typography>
        </Box>

        <Box sx={errorOutputContainer}>
          <Box sx={output}> 
            <Box sx={{ marginBottom: "1em" }}>
              <Typography> Chopped value: </Typography>
              <InlineMath >{`P_{${degree}}(x) = ${taylorResult.chopped}`}</InlineMath>
            </Box>

            <Box sx={{ marginBottom: "1em" }}>
              <Typography> True Error:</Typography>
              <InlineMath>{`${calculateTrueError(taylorResult.trueValue, taylorResult.chopped)}`}</InlineMath>
            </Box>

            <Box sx={{ marginBottom: "1em" }}>
              <Typography> Relative Error (%): </Typography>
              <InlineMath>{`${calculateRelativeError(taylorResult.trueValue, taylorResult.chopped)}`}</InlineMath>
            </Box>
          </Box>

          <Box sx={output}> 
            <Box sx={{ marginBottom: "1em" }}>
              <Typography> Rounded value: </Typography>
              <InlineMath >{`P_{${degree}}(x) = ${taylorResult.rounded}`}</InlineMath>
            </Box>

            <Box sx={{ marginBottom: "1em" }}>
              <Typography> True Error: </Typography> 
              <InlineMath>
                {`${calculateTrueError(taylorResult.trueValue, taylorResult.rounded)}`}
              </InlineMath>
            </Box>

            <Typography> Relative Error (%) </Typography>
            <InlineMath>
              {`${calculateRelativeError(taylorResult.trueValue, taylorResult.rounded)} `}
            </InlineMath>
          </Box>
        </Box>
      </>}

      {isCalculate && <Typography sx={{ fontWeight: "bold", marginBottom: '0.5em' }}>
        {`Answer = ${calculateTrueError(taylorResult.trueValue, taylorResult.chopped) < calculateTrueError(taylorResult.trueValue, taylorResult.rounded) ? taylorResult.chopped : taylorResult.rounded}`}
      </Typography>}
    </Box>
  )
}

export default TaylorPolynomial