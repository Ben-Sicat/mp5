import React, { useState } from 'react';
import * as math from 'mathjs';
import { styled } from '@mui/system';
import { MainBox } from '..';
import calcSimpson from '../../../functions/calcSimpson';
import calcTrapezoid from '../../../functions/calcTrapezoidal';
import rootFindBisection from '../../../functions/rootFindBisection';
import {
  Typography,
  Button,
  TextField,
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  MenuItem,
  Select,
  RadioGroup,
} from '@mui/material';

const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2rem',
});

const SubmitButton = styled(Button)({
  backgroundColor: '#FF4081',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#D81B60',
  },
});

const ResultText = styled('p')({
  textAlign: 'center',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: '#FF4081',
});

function UserDefined() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [n, setN] = useState('');
  const [numeratorFn, setNumeratorFn] = useState('');
  const [denominatorFn, setDenominatorFn] = useState('');
  const [expression, setExpression] = useState('');
  const [method, setMethod] = useState('trapezoid');
  const [result, setResult] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    let root;
    if (denominatorFn !== '1') {
      root = rootFindBisection({
        userFunction: denominatorFn,
        firstGuessPoint: parseFloat(a),
        secondGuessPoint: parseFloat(b),
        tolerance: 0.0000000001,
      });
    }

    if (root) {
      setResult(root.message);
      return;
    }

    setExpression(`(${numeratorFn})/${denominatorFn}`);

    if (method === 'simpson') {
      setResult(
        calcSimpson(parseFloat(a), parseFloat(b), parseInt(n), expression)
      );
      return;
    }

    setResult(
      calcTrapezoid(parseFloat(a), parseFloat(b), parseInt(n), expression)
    );
  }

  function onMethodChange(e) {
    e.preventDefault();
    setMethod(e.target.value);
  }

  return (
    <div>
      <Box></Box>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Method
            </FormLabel>
            <RadioGroup
              row
              defaultValue={'trapezoid'}
              aria-labelledby="demo-row-radio-buttons-group-label"
              onChange={onMethodChange}
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="trapezoid"
                control={<Radio />}
                label="Trapezoidal Rule"
              />
              <FormControlLabel
                value="simpson"
                control={<Radio />}
                label="Simpson's Rule"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            label="a"
            type="text"
            value={a}
            onChange={(e) => setA(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="b"
            type="text"
            value={b}
            onChange={(e) => setB(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="n"
            type="text"
            value={n}
            onChange={(e) => setN(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="f(x)"
            type="text"
            value={numeratorFn}
            onChange={(e) => setNumeratorFn(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="g(x)"
            type="text"
            value={denominatorFn}
            onChange={(e) => setDenominatorFn(e.target.value)}
            variant="outlined"
          />
          <SubmitButton variant="contained" type="submit">
            Submit
          </SubmitButton>
          <ResultText>Result: {result}</ResultText>
        </FormContainer>
      </form>
    </div>
  );
}

export default UserDefined;
