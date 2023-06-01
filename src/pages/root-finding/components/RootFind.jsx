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
  marginTop: '1em',
};

export const functionInput = {
  marginTop: '1em',
  width: '100%',
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
  width: '100%',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'center',
  alignSelf: 'center',
  justifySelf: 'center',
  maxWidth: '500px',
  padding: '1em',
};

export const equationContainer = {
  alignSelf: 'center',
};

function RootFind() {
  const [rootFunctionValueType, setRootFunctionValueType] =
    useState('predefined');

  const [rootFindInput, setRootFindInput] = useState({
    userFunction: rootFunctionValueType === 'predefined' ? 'tanh(x)' : '',
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
      userFunction: e.target.value === 'predefined' ? 'tanh(x)' : '',
    }));
  }

  return (
    <form style={formContainer} onSubmit={handleSubmit}>
      <FormControl style={inputStyle}>
        <InputLabel id="root-find-function-type-label">
          Function Type
        </InputLabel>
        <Select
          labelId="root-find-function-type-label"
          id="root-find-function-type"
          value={rootFunctionValueType}
          onChange={handleChange}
        >
          <MenuItem value="predefined">Predefined</MenuItem>
          <MenuItem value="custom">Custom</MenuItem>
        </Select>
      </FormControl>

      {rootFunctionValueType === 'custom' && (
        <TextField
          style={functionInput}
          id="root-find-function"
          label="Function"
          value={rootFindInput.userFunction}
          onChange={(e) => setRootFindInput((prev) => ({ ...prev, userFunction: e.target.value }))}
        />
      )}

      <Box style={inputGroup}>
        <TextField
          id="root-find-guess-point-1"
          label="Guess Point 1"
          type="number"
          value={rootFindInput.firstGuessPoint}
          onChange={(e) => setRootFindInput((prev) => ({ ...prev, firstGuessPoint: e.target.value }))}
        />

        <TextField
          id="root-find-guess-point-2"
          label="Guess Point 2"
          type="number"
          value={rootFindInput.secondGuessPoint}
          onChange={(e) => setRootFindInput((prev) => ({ ...prev, secondGuessPoint: e.target.value }))}
        />
      </Box>

      <Box style={inputGroup}>
        <TextField
          id="root-find-tolerance"
          label="Tolerance"
          type="number"
          value={rootFindInput.tolerance}
          onChange={(e) => setRootFindInput((prev) => ({ ...prev, tolerance: e.target.value }))}
        />

        <TextField
          id="root-find-iterations"
          label="Number of Iterations"
          type="number"
          value={rootFindInput.numberOfIterations}
          onChange={(e) => setRootFindInput((prev) => ({ ...prev, numberOfIterations: e.target.value }))}
        />
      </Box>

      <FormControl style={inputStyle}>
        <InputLabel id="root-find-approach-label">Approach</InputLabel>
        <Select
          labelId="root-find-approach-label"
          id="root-find-approach"
          value={selectedApproach}
          onChange={handleApproachChange}
        >
          <MenuItem value="iterative">Iterative</MenuItem>
          <MenuItem value="tolerance">Tolerance</MenuItem>
        </Select>
      </FormControl>

      <FormControl style={inputStyle}>
        <InputLabel id="root-find-method-label">Method</InputLabel>
        <Select
          labelId="root-find-method-label"
          id="root-find-method"
          value={selectedMethod}
          onChange={handleMethodChange}
        >
          <MenuItem value="bisection">Bisection</MenuItem>
          <MenuItem value="secant">Secant</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" type="submit">
        Calculate
      </Button>

      {isCalculate && (
        <div style={outputContainer}>
          {rootFindOutput.map((step, index) => (
            <div key={index} style={output}>
              <Typography variant="h6" style={outputText}>
                Step {index + 1}
              </Typography>
              <Typography variant="body1" style={outputText}>
                Root: {step.root}
              </Typography>
              <Typography variant="body1" style={outputText}>
                f(Root): {step.functionValue}
              </Typography>
              <Typography variant="body1" style={outputText}>
                Error: {step.error}
              </Typography>
              <br />
            </div>
          ))}
        </div>
      )}
    </form>
  );
}

export default RootFind;
