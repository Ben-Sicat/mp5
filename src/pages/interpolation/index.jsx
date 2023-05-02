import { useEffect, useState } from 'react';
import { Typography, Box, FormControl, Select, MenuItem, TextField, Button } from '@mui/material';
import round from '../../functions/Round';
import { InlineMath, BlockMath } from 'react-katex';

const rootContainer = {
  padding: '2em',
  display: 'flex',
  width: '100%',
  height: '100vh',
  flexDirection: "column",
  alignItems: 'center',
  color: 'black',
  backgroundColor: 'white',
}

const coordinatesContainer = {
  display: 'flex',
  width: '600px',
  height: '100%',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  maxHeight: '70px'
}

function CoordinatesInput() {
  const [option, setOption] = useState('predefined');
  const [numberOfPoints, setNumberOfPoints] = useState(0);
  const [coordinates, setCoordinates] = useState([]);
  const [xValue, setXValue] = useState(0);
  const [isInterpolated, setIsInterpolated] = useState(false);
  const [interpolatedValue, setInterpolatedValue] = useState(0);

  useEffect(() => {
    if (option == "predefined") {
      return setCoordinates([[
        1.07,
        0.732
      ],
      [
        1.72,
        0.997
      ],
      [
        1.95,
        1.082
      ],
      [
        2.47,
        1.244
      ],
      [
        2.89,
        1.358
      ],
      [
        3.18,
        1.43
      ],
      [
        3.36,
        1.472
      ],
      [
        4.02,
        1.613
      ],
      [
        4.51,
        1.707
      ],
      [
        5.26,
        1.834
      ]]);
    }
    setCoordinates([]);
  }, [option])

  const handleCoordinateChange = (coordinateIndex, valueIndex) => (event) => {
    const value = parseFloat(event.target.value);
    setCoordinates((prevCoordinates) => {
      const newCoordinates = [...prevCoordinates];
      newCoordinates[coordinateIndex][valueIndex] = value;
      return newCoordinates;
    });
  };

  const onNumberOfPointsChange = (event) => {
    try {
      const value = parseInt(event.target.value);
      setNumberOfPoints(value);
      if (value >= 10) {
        setCoordinates(Array(value).fill([null, null]));
      }
    } catch (e) {
      return;
    }
  };

  function handleXValueChange(e) {
    setXValue(e.target.value);
  }
  
  function handleOptionChange(e) {
    setOption(e.target.value);
  }

  function handleInterpolate() {
    setIsInterpolated(true);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let value = 0;
    for (let i = 0; i < coordinates.length; i++) {
      let temp = 1;
      for (let j = 0; j < coordinates.length; j++) {
        if (i !== j) {
          temp *= (xValue - coordinates[j][0]) / (coordinates[i][0] - coordinates[j][0])
        }
      }
      value += coordinates[i][1] * temp;
    }
    console.log(coordinates);
    setInterpolatedValue(value);
    console.log(interpolatedValue);
  };

  return (
    <Box sx={rootContainer}>
      <Box sx={{ marginBottom: "1em"}}>
        <FormControl fullWidth>
            <Select
              fullWidth
              id="select"
              defaultValue='predefined'
              value={option}
              onChange={handleOptionChange}
            >
            <MenuItem value={'predefined'}>Pre-defined function</MenuItem>
            <MenuItem value={'defined'}>Define a set of points</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {option == 'predefined' && <Typography variant="h3"> ln (x + 1) </Typography> }

      <form onSubmit={handleSubmit}>
        {coordinates.map((coordinate, index) => (
          <Box sx={coordinatesContainer} key={index}>
            <TextField
              label={`X${index + 1}`}
              type="input"
              value={coordinate[0] || ''}
              onChange={handleCoordinateChange(index, 0)}
            />
            <TextField
              label={`Y${index + 1}`}
              type="input"
              value={coordinate[1] || ''}
              onChange={handleCoordinateChange(index, 1)}
            />
          </Box>
        ))}
        <Box sx={{ display: 'flex', marginTop: "1em", marginBottom: ".5em", flexDirection: 'column', alignItems: 'center'}}>
          <Box sx={coordinatesContainer}>
            <TextField
                label={`X`}
                sx={{ marginBottom: '1em'}}
                type="input"
                value={xValue}
                onChange={handleXValueChange}
              />
              <TextField
                label={`n`}
                sx={{ marginBottom: '1em'}}
                type="input"
                value={numberOfPoints}
                onChange={onNumberOfPointsChange}
              />
          </Box>
          <Button type="submit" variant="contained" color="primary" onClick={handleInterpolate}>
            Interpolate
          </Button>
          <Typography sx={{ marginTop: "1em", marginBottom: '1em'}} variant="h4">{isInterpolated && `P${numberOfPoints}(${xValue}) = ${round(interpolatedValue,3)}`}</Typography>
        </Box>
      </form>
    </Box>
  );
}

export default CoordinatesInput;
