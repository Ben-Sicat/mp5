import React, { useEffect, useState } from 'react';
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
  FormControlLabel,
} from '@mui/material';

import { InlineMath } from 'react-katex';
import { rootFindSecant, testSecant } from '../../../functions/rootFindSecant';
import rootFindBisection from '../../../functions/rootFindBisection';

export const inputGroup = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
};

export const functionInput = {
  marginTop: '1em',
  width: '100vw',
  maxWidth: '500px',
  marginBottom: '1em',
};

export const outputContainer = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '100vh',
  maxHeight: '75px',
  marginTop: '1em',
};

export const output = {
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'left',
};

export const inputStyle = {
  marginTop: '1em',
  marginBottom: '1em',
  marginRight: '1em',
};

export const outputText = {
  marginBottom: '1em',
};

export const formContainer = {
  display: 'flex',
  width: '100vw',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'center',
  alignSelf: 'center',
  justifySelf: 'center',
  maxWidth: '500px',
};

export const equationContainer = {
  alignSelf: 'center',
};

function RootFind() {
  const [rootFunctionValueType, setRootFunctionValueType] =
    useState('predefined');

  const [rootFindInput, setRootFindInput] = useState({
    userFunction: rootFunctionValueType === 'predefined' ? 'log(x+1,e)' : '',
    firstGuessPoint: 0,
    secondGuessPoint: 1,
    tolerance: 0,
    numberOfIterations: 0,
  });
  const [rootFindOutput, setRootFindOutput] = useState([]);
  const [isCalculate, setIsCalculate] = useState(false);
  const [errMessage, setErrMessage] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [selectedApproach, setSelectedApproach] = useState('');

  async function handleSubmit(e) {
    if (
      rootFindInput.userFunction === '' ||
      rootFindInput.userFunction === 'f(x)'
    ) {
      // setErrMessage('Please enter a valid function');
      return;
    }
    e.preventDefault();
    setIsCalculate(true);
    console.log(rootFindInput);
    // console.log(rootFindSecant(rootFindInput));
    console.log(rootFindBisection(rootFindInput).stack);

    if (selectedMethod === 'bisection') {
      setRootFindOutput(rootFindBisection(rootFindInput));
      return;
    }

    setRootFindOutput(rootFindSecant(rootFindInput));
  }

  function handleApproachChange(e) {
    setSelectedApproach(e.target.value);
  }

  function handleMethodChange(e) {
    setSelectedMethod(e.target.value);
  }

  function handleChange(e) {
    e.preventDefault();
    setRootFunctionValueType(e.target.value);
    setRootFindInput(prev => ({
      ...prev,
      userFunction: e.target.value === 'predefined' ? 'log(x+1,e)' : 'f(x)',
    }));
  }

  return (
    <Box sx={formContainer}>
      <FormControl>
        <Select
          id="select"
          sx={{ marginBottom: '1em' }}
          defaultValue="predefined"
          value={rootFunctionValueType}
          onChange={handleChange}
        >
          <MenuItem value={'predefined'}>Pre-defined function</MenuItem>
          <MenuItem value={'userdefined'}>Define a function</MenuItem>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel id="root-find-approach-label">Approach</FormLabel>
        <RadioGroup
          row
          name="root-find-approach-group"
          value={selectedApproach}
          onChange={handleApproachChange}
        >
          <FormControlLabel
            value="iterative"
            control={<Radio />}
            label="Iterative approach"
          />
          <FormControlLabel
            value="tolerance"
            control={<Radio />}
            label="Tolerance approach (Ɛ)"
          />
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
          <FormControlLabel
            value="bisection"
            control={<Radio />}
            label="Bisection method"
          />
          <FormControlLabel
            value="secant"
            control={<Radio />}
            label="Secant method"
          />
        </RadioGroup>
      </FormControl>

      <Box sx={equationContainer}>
        {rootFunctionValueType === 'predefined' && (
          <Typography variant="h3"> ln(x + 1)</Typography>
        )}
        {rootFunctionValueType === 'userdefined' && (
          <TextField
            sx={functionInput}
            id="equation"
            label="f(x)"
            value={rootFindInput.userFunction}
            onChange={e =>
              setRootFindInput(prev => ({
                ...prev,
                userFunction: e.target.value,
              }))
            }
          />
        )}
      </Box>

      <FormControl sx={inputGroup}>
        <TextField
          sx={inputStyle}
          id="first_guess"
          label="x0"
          value={rootFindInput.firstGuessPoint}
          onChange={e =>
            setRootFindInput(prev => ({
              ...prev,
              firstGuessPoint: e.target.value,
            }))
          }
        />

        <TextField
          sx={inputStyle}
          id="equation"
          label="x1"
          value={rootFindInput.secondGuessPoint}
          onChange={e =>
            setRootFindInput(prev => ({
              ...prev,
              secondGuessPoint: e.target.value,
            }))
          }
        />

        {selectedApproach === 'iterative' && (
          <TextField
            id="equation"
            label="n"
            value={rootFindInput.numberOfIterations}
            onChange={e =>
              setRootFindInput(prev => ({
                ...prev,
                numberOfIterations: e.target.value,
              }))
            }
          />
        )}

        {selectedApproach === 'tolerance' && (
          <TextField
            id="equation"
            label="Ɛ"
            value={rootFindInput.tolerance}
            onChange={e =>
              setRootFindInput(prev => ({ ...prev, tolerance: e.target.value }))
            }
          />
        )}
      </FormControl>

      <Button variant="contained" type="submit" onClick={handleSubmit}>
        Calculate
      </Button>

      {!isCalculate && (
        <Typography type="error" sx={{ color: 'red' }}>
          {errMessage}
        </Typography>
      )}
      {isCalculate && (
        <>
          <Box sx={outputContainer}>
            <p>{`c = ${
              rootFindOutput.stack[rootFindOutput.stack.length - 1].nextPoint
            }`}</p>
            <p>{`f(c) = ${
              rootFindOutput.stack[rootFindOutput.stack.length - 1]
                .nextPointOutput
            }`}</p>
            <p>{`${
              selectedApproach === 'iterative'
                ? `Ɛ = ${
                    rootFindOutput.stack[rootFindOutput.stack.length - 1]
                      .toleranceValue
                  }`
                : `n = ${
                    rootFindOutput.stack[rootFindOutput.stack.length - 1]
                      .iteration
                  }`
            }`}</p>
          </Box>
        </>
      )}
    </Box>
  );
}

export default RootFind;
