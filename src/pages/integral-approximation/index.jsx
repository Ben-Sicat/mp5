import { useState } from 'react';
import PreDefined from './components/predefined';
import UserDefined from './components/user-defined';
import { styled } from '@mui/system';
import { Typography, Box, FormControl, MenuItem, Select } from '@mui/material';
import DrawerMenu from '../../../components/MachineProblemDrawer';

export const MainBox = styled('div')({
  display: 'flex',
  width: '100vw',
  height: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'black',
});

const RenderBox = styled('div')({
  display: 'flex',
  width: '100%',
  maxWidth: '500px',
  height: '100%',
  flexDirection: 'column',
});

function Index() {
  const [option, setOption] = useState('pre-defined');

  function onOptionChange(e) {
    setOption(e.target.value);
  }

  return (
    <>
      <DrawerMenu />
      <MainBox>
        <FormControl fullWidth sx={{ maxWidth: '400px', marginBottom: '1em' }}>
          <Select
            id="select"
            defaultValue="pre-defined"
            value={option}
            onChange={onOptionChange}
          >
            <MenuItem value={'pre-defined'}>Pre-defined function</MenuItem>
            <MenuItem value={'user-defined'}>Define a function</MenuItem>
          </Select>
        </FormControl>
        {option == 'pre-defined' && <PreDefined />}
        {option == 'user-defined' && <UserDefined />}
      </MainBox>
    </>
  );
}

export default Index;
