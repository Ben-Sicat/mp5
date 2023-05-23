import React, { useState } from 'react';
import * as math from 'mathjs';
import { styled } from '@mui/system';
import Image from 'next/image';
import { MainBox } from '..';
import calcSimpson from '../../../functions/calcSimpson';
import calcTrapezoid from '../../../functions/calcTrapezoidal';
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
  width: '100vw',
  gap: '1rem',
  maxWidth: '400px',
  margin: '0 auto',
});

const InputFieldGroup = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100vw',
  gap: '1rem',
  maxWidth: '400px',
  margin: '0 auto',
});

const SubmitButton = styled(Button)({
  backgroundColor: '#2196f3',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#1976d2',
  },
});

const ResultText = styled('p')({
  textAlign: 'center',
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
    setExpression(`(${numeratorFn})/${denominatorFn}`);
    // setExpression(`(${numeratorFn})/${0}`);
    event.preventDefault();
    if (method == 'simpson') {
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
          <Image
            src="/images/user-defined-equation.png"
            width={400}
            height={180}
          />
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
          <InputFieldGroup>
            <TextField
              label="a"
              type="text"
              value={a}
              onChange={e => setA(e.target.value)}
            />
            <TextField
              label="b"
              type="text"
              value={b}
              onChange={e => setB(e.target.value)}
            />
            <TextField
              label="n"
              type="text"
              value={n}
              onChange={e => setN(e.target.value)}
            />
          </InputFieldGroup>
          <InputFieldGroup>
            <TextField
              label="f(x)"
              type="text"
              value={numeratorFn}
              onChange={e => setNumeratorFn(e.target.value)}
            />
            <TextField
              label="g(x)"
              type="text"
              value={denominatorFn}
              onChange={e => setDenominatorFn(e.target.value)}
            />
          </InputFieldGroup>
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
