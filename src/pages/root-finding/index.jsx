import React, { useState, useEffect } from 'react'
import {
  Box,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material'
import RootFind from './components/RootFind'
import { testSecant } from '../../functions/rootFindSecant'
import { testBisection } from '../../functions/rootFindBisection'

const rootContainer = {
  display: 'flex',
  width: '100vw',
  height: '100vh',
  flexDirection: "column",
  justifyContent: 'center',
  alignItems: 'center',
  color: 'black',
  backgroundColor: 'white',
}

function Index() {
  const [itemValue, setItemValue] = useState('predefined')

  useEffect(() => {
    console.log("secant method", testSecant());
    console.log("bisection method", testBisection());
  }, [itemValue])

  function handleChange(e) {
    e.preventDefault();
    setItemValue(e.target.value);
  }

  return (
    <Box sx={rootContainer}>
      <Box sx={{ width: "50%" }}>
        <FormControl fullWidth>
            <Select
              id="select"
              defaultValue='predefined'
              value={itemValue}
              onChange={handleChange}
            >
            <MenuItem value={'predefined'}>Pre-defined function</MenuItem>
            <MenuItem value={'userdefined'}>Define a function</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        <RootFind rootFunctionValueType={itemValue} />
      </Box>

      </Box>
  )
}

export default Index