import React from 'react'
import {
  FormControl,
  TextField,
} from '@mui/material'

function PreDefined() {
  return (
    <div>
      <FormControl sx={inputGroup}>
        <TextField
          sx={inputStyle}
          id="equation"
          label="Enter your equation"
          disabled={isCalculate}
          value={equation}
          onChange={handleChangeEquation} />

        <TextField
          id="decimal-place"
          label="Decimal Places"
          disabled={isCalculate}
          value={decimalPlace}
          onChange={handleChangeDecimalPlace} />
      </FormControl>
    </div>
  )
}

export default PreDefined