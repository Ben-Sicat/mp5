import React, { useState } from 'react';
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
  alignItems: 'center',
  gap: '2rem',
});

const SubmitButton = styled(Button)({
  backgroundColor: '#7E57C2',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#512DA8',
  },
});

const ResultText = styled('p')({
  textAlign: 'center',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  color: '#7E57C2',
});

function PreDefined() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [n, setN] = useState('');
  const [expression, setExpression] = useState('tanh(x)');
  const [method, setMethod] = useState('trapezoid');
  const [result, setResult] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
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
          <Image src="/images/equation.png" width={400} height={180} />
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
            label = "tanh(x)"
            type= "muted"
            variant = "filled"
            />

          <TextField
            label="a"
            type="text"
            value={a}
            onChange={e => setA(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="b"
            type="text"
            value={b}
            onChange={e => setB(e.target.value)}
            variant="outlined"
          />
          <TextField
            label="n"
            type="text"
            value={n}
            onChange={e => setN(e.target.value)}
            variant="outlined"
          />
          <SubmitButton variant="contained" type="submit">
            Submit
          </SubmitButton>
          {result && <ResultText>Result: {result}</ResultText>}
        </FormContainer>
      </form>
    </div>
  );
}

export default PreDefined;
