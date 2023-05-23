import { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';
import round from '../../functions/Round';
import { InlineMath, BlockMath } from 'react-katex';
import { number } from 'mathjs';
import DrawerMenu from '../../../components/MachineProblemDrawer';

const rootContainer = {
  padding: '2em',
  display: 'flex',
  width: '100%',
  height: '100vh',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  color: 'black',
  backgroundColor: 'white',
};

const coordinatesContainer = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '10px',
  width: '800px',
  height: '100%',
  justifyContent: 'space-around',
  alignItems: 'center',
  maxHeight: '70px',
};

const definedCoordinatesContainer = {
  display: 'flex',
  width: '600px',
  height: '100%',
  justifyContent: 'space-evenly',
  maxHeight: '70px',
};

function CoordinatesInput() {
  const [option, setOption] = useState('predefined');
  const [numberOfPoints, setNumberOfPoints] = useState(10);
  const [coordinates, setCoordinates] = useState([]);
  const [xValue, setXValue] = useState(0);
  const [isInterpolated, setIsInterpolated] = useState(false);
  const [interpolatedValue, setInterpolatedValue] = useState(0);
  // ? x = week, y = closing price
  useEffect(() => {
    if (option == 'predefined') {
      setCoordinates([
        [1, 0.820927],
        [2, 0.839352],
        [3, 0.84956],
        [4, 0.854746],
        [5, 0.846662],
        [6, 0.862696],
        [7, 0.864018],
        [8, 0.883676],
        [9, 0.87288],
        [10, 0.876132],
      ]);
      return setXValue(11);
    }
    if (option == 'defined') {
      setCoordinates([
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ]);
    }
    // setCoordinates(Array(numberOfPoints).fill([null, null]));
    setXValue(0);
  }, [numberOfPoints, option]);

  const handleCoordinateChange = (coordinateIndex, valueIndex) => event => {
    const value = parseFloat(event.target.value);
    setCoordinates(prevCoordinates => {
      const newCoordinates = [...prevCoordinates];
      newCoordinates[coordinateIndex][valueIndex] = value;
      return newCoordinates;
    });
  };

  const onNumberOfPointsChange = event => {
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
    setXValue(parseInt(e.target.value));
  }

  function handleOptionChange(e) {
    setOption(e.target.value);
    setCoordinates([
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
      [0, 0],
    ]);
    setInterpolatedValue(0);
    setIsInterpolated(false);
  }

  function lagrange(x, y, xi) {
    let result = 0;
    const n = x.length;
    for (let i = 0; i < n; i++) {
      let term = y[i];
      for (let j = 0; j < n; j++) {
        if (j !== i) {
          term *= (xi - x[j]) / (x[i] - x[j]);
        }
      }
      result += term;
    }
    return result;
  }

  function handleInterpolate() {
    setIsInterpolated(true);
    const x = coordinates.map(([xi, _]) => xi);
    const y = coordinates.map(([_, yi]) => yi);

    const xi = 11;

    console.log();

    console.log(coordinates);
    setInterpolatedValue(lagrange(x, y, xi));
    console.log(lagrange(x, y, xi));

    console.log(interpolatedValue);
  }

  return (
    <>
      <DrawerMenu />
      <Box sx={rootContainer}>
        <Box sx={{ marginBottom: '1em' }}>
          <FormControl fullWidth>
            <Select
              id="select"
              defaultValue="predefined"
              value={option}
              onChange={handleOptionChange}
            >
              <MenuItem value={'predefined'}>
                Pre-defined points (forex)
              </MenuItem>
              <MenuItem value={'defined'}>Define a set of points</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {option == 'predefined' && (
          <Typography variant="h5">
            {' '}
            USD to EUR (May 2022 to February 2023){' '}
          </Typography>
        )}

        <Box>
          {coordinates.map((coordinate, index) => (
            <Box
              sx={
                option === 'predefined'
                  ? coordinatesContainer
                  : definedCoordinatesContainer
              }
              key={index}
            >
              <TextField
                label={`X${index + 1}`}
                disabled={option == 'predefined'}
                type="number"
                value={coordinate[0] || ''}
                onChange={handleCoordinateChange(index, 0)}
              />
              <TextField
                label={`Y${index + 1}`}
                disabled={option == 'predefined'}
                type="number"
                value={coordinate[1] || ''}
                onChange={handleCoordinateChange(index, 1)}
              />
              {option === 'predefined' && (
                <Typography sx={{ fontWeight: 'bold' }}>
                  {' '}
                  {`Month ${coordinates[index][0]} price: ${coordinates[index][1]}`}
                </Typography>
              )}
            </Box>
          ))}

          <Box
            sx={
              option === 'predefined'
                ? coordinatesContainer
                : definedCoordinatesContainer
            }
          >
            <TextField
              label={`X`}
              sx={{ marginBottom: '1em' }}
              disabled={option == 'predefined'}
              type="input"
              value={xValue}
              onChange={handleXValueChange}
            />
            <TextField
              label={`n`}
              sx={{ marginBottom: '1em' }}
              disabled={option == 'predefined'}
              type="input"
              value={numberOfPoints}
              onChange={onNumberOfPointsChange}
            />
            {option === 'predefined' && (
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  {isInterpolated && `Analyzed Month ${xValue} price trend: `}
                </Typography>
                <Typography sx={{ fontWeight: 'bold' }}>
                  {isInterpolated &&
                    `P${numberOfPoints}(${xValue}) = ${round(
                      interpolatedValue,
                      3
                    )} (${
                      round(interpolatedValue, 3) > 0 ? 'Uptrend' : 'Downtrend'
                    })`}
                </Typography>
              </Box>
            )}
          </Box>

          {option === 'defined' && (
            <Box
              sx={{
                padding: '1em',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ fontWeight: 'bold' }}>
                {isInterpolated &&
                  `P${numberOfPoints}(${xValue}) = ${round(
                    interpolatedValue,
                    3
                  )}`}
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              padding: '1em',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{ alignSelf: 'center', justifySelf: 'center' }}
              color="primary"
              onClick={handleInterpolate}
            >
              Interpolate
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CoordinatesInput;
