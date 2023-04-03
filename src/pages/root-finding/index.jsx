import React, { useState, useEffect } from 'react'
import { Cantarell } from 'next/font/google'
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from '@mui/material'
import RootFind from './components/RootFind'
import { testSecant } from '../../functions/rootFindSecant'
import { testBisection } from '../../functions/rootFindBisection'


const cantarell = Cantarell({ subsets: ["latin"], weight: "700"})

const rootContainer = {
  display: 'flex',
  width: '100%',
  height: '100vh',
  flexDirection: "column",
  // justifyContent: 'center',
  alignItems: 'center',
  color: 'black',
  backgroundColor: 'white',
}

const headerContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  color: "white",
  height: "100%",
  maxHeight: "125px",
  width: "100vw",
  backgroundColor: "#1565c0"
}

const formContainer = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  alignSelf: "center",
  justifySelf: "center"
}


function Index() {
  const [itemValue, setItemValue] = useState('predefined')

  useEffect(() => {
    console.log("secant method", testSecant());
    console.log("bisection method", testBisection());
  }, [itemValue])


  return (
      <Box sx={rootContainer}>
        <Box sx={headerContainer}>
          <div className={cantarell.className}>
            <h1 style={{ fontSize: "3em" }}>
              MACHINE PROBLEM
            </h1>
          </div>
        </Box>

          <Box sx={formContainer}>
              <FormControl>
              </FormControl>
            <RootFind rootFunctionValueType={itemValue} />
          </Box>
        </Box>
  )
}

export default Index