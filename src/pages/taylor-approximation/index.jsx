import { useState } from 'react';
import Box from '@mui/material/Box';
import { MenuItem } from '@mui/material';
import { FormControl } from '@mui/material';
import Select from '@mui/material/Select';

import ErrorPropagation from './components/ErrorPropagation';
import TaylorPolynomial from './components/TaylorPolynomial';

const rootContainer = {
  display: 'flex',
  width: '100vw',
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'black',
  backgroundColor: 'white',
}

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: "100%",
  height: "100%",
  maxWidth: "700px",
}

const mainContainer = {
  offSetY: "hidden",
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: "1em",
  height: "99vh",
  width: "100%",
}

function Index() {
 const [option, setOption] = useState('approximation');

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <Box sx={rootContainer}>
      <Box sx={mainContainer}>
        <Box sx={style}>
          <Box sx={{ marginBottom: "1em"}}>
            <FormControl fullWidth>
                <Select
                  id="select"
                  defaultValue='approximation'
                  value={option}
                  onChange={handleChange}
                >
                <MenuItem value={'approximation'}>Error Propagated Approximation</MenuItem>
                <MenuItem value={'taylor'}>{'Taylor\'s Polynomial'}</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {option == "taylor" && <TaylorPolynomial/> }
          {option == "approximation" && <ErrorPropagation/> }
        </Box>
      </Box>
    </Box>
  );
}

export default Index
