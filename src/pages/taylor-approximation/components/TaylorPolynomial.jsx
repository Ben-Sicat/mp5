import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  FormGroup,
} from '@mui/material';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import {
  outputText,
  output,
  inputGroup,
  inputStyle,
} from './ErrorPropagation';
import {
  calculateTrueError,
  calculateRelativeError,
} from '../../../functions/calculateApproximation';

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
  maxWidth: '700px',
  gap: '1rem',
};

const mathContainer = {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const formStyle = {
  width: '100%',
  maxWidth: '700px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

function TaylorPolynomial() {
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
    setDegree(0);
    setTaylorValue(0);
    setDecimalPlace(0);
    setIsCalculate(false);
  }

  return (
    <Box sx={style}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <Typography variant="h2">tanh(x)</Typography>

        <FormGroup style={inputGroup}>
          <TextField
            disabled={isCalculate}
            label="Degree"
            value={degree}
            onChange={handleChangeDegree}
            style={inputStyle}
          />
          <TextField
            disabled={isCalculate}
            label="X"
            value={taylorValue}
            onChange={handleChangeTaylorValue}
            style={inputStyle}
          />
          <TextField
            disabled={isCalculate}
            label="Decimal places"
            value={decimalPlace}
            onChange={handleChangeDecimalPlace}
          />
        </FormGroup>

        {!isCalculate && (
        <Button variant="outlined" type="submit" style={{ width: '200px', color: 'purple' }}>
        Calculate
          </Button>
        )}
        {isCalculate && (
        <Button variant="outlined" onClick={handleReset} style={{ width: '200px', color: 'purple' }}>
        Reset
          </Button>
        )}
      </form>

      {isCalculate && (
        <>
          <Box style={mathContainer}>
            <BlockMath>{`P_{${degree}}(x)=${taylorEquation}`}</BlockMath>
            <Typography style={{ marginTop: '1em' }}>
              {`True Value: ${taylorResult.trueValue}`}
            </Typography>
          </Box>

          <Box style={mathContainer}>
            <Box style={output}>
              <Box style={{ marginBottom: '1em' }}>
                <Typography>Chopped value:</Typography>
                <InlineMath>{`P_{${degree}}(x) = ${taylorResult.chopped}`}</InlineMath>
              </Box>

              <Box style={{ marginBottom: '1em' }}>
                <Typography>True Error:</Typography>
                <InlineMath>
                  {`${calculateTrueError(
                    taylorResult.trueValue,
                    taylorResult.chopped
                  )}`}
                </InlineMath>
              </Box>

              <Box style={{ marginBottom: '1em' }}>
                <Typography>Relative Error (%):</Typography>
                <InlineMath>
                  {`${calculateRelativeError(
                    taylorResult.trueValue,
                    taylorResult.chopped
                  )}`}
                </InlineMath>
              </Box>
            </Box>

            <Box style={output}>
              <Box style={{ marginBottom: '1em' }}>
                <Typography>Rounded value:</Typography>
                <InlineMath>{`P_{${degree}}(x) = ${taylorResult.rounded}`}</InlineMath>
              </Box>

              <Box style={{ marginBottom: '1em' }}>
                <Typography>True Error:</Typography>
                <InlineMath>
                  {`${calculateTrueError(
                    taylorResult.trueValue,
                    taylorResult.rounded
                  )}`}
                </InlineMath>
              </Box>

              <Box style={{ marginBottom: '1em' }}>
                <Typography>Relative Error (%):</Typography>
                <InlineMath>
                  {`${calculateRelativeError(
                    taylorResult.trueValue,
                    taylorResult.rounded
                  )}`}
                </InlineMath>
              </Box>
            </Box>
          </Box>

          <Typography
            style={{ fontWeight: 'bold', marginBottom: '0.5em' }}
          >
            {`Answer = ${
              calculateTrueError(taylorResult.trueValue, taylorResult.chopped) <
              calculateTrueError(
                taylorResult.trueValue,
                taylorResult.rounded
              )
                ? taylorResult.chopped
                : taylorResult.rounded
            }`}
          </Typography>
        </>
      )}
    </Box>
  );
}

export default TaylorPolynomial;
