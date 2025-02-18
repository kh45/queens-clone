import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import COLORS from "./colors";
import hello, { dimensions, secondDimensions, secondNewOne } from "./mock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown, faX } from "@fortawesome/free-solid-svg-icons";

const Square = ({
  color,
  row,
  column,
  rowsWithCrown,
  setRowsWithCrown,
  setColumnsWithCrown,
  columnsWithCrown,
  colorsWithCrown,
  setColorsWithCrown,
}) => {
  const [displayStateOfSquare, setDisplayStateOfSquare] = useState({
    isXShowing: false,
    isCrownShowing: false,
  });

  const calculateDiagonals = (row, column) => {
    const rowAbove = parseInt(row) - 1;
    const rowBelow = parseInt(row) + 1;

    const columnToTheLeft = parseInt(column) - 1;
    const columnToTheRight = parseInt(column) + 1;

    const NWDiagonal = { row: rowAbove, column: columnToTheLeft };
    const NEDiagonal = { row: rowAbove, column: columnToTheRight };
    const SEDiagonal = { row: rowBelow, column: columnToTheRight };
    const SWDiagonal = { row: rowBelow, column: columnToTheLeft };

    const diagonalsArray = [NWDiagonal, NEDiagonal, SWDiagonal, SEDiagonal];

    return diagonalsArray;
  };

  const handleClick = () => {
    // There is nothing in square so set an X
    if (
      !displayStateOfSquare.isXShowing &&
      !displayStateOfSquare.isCrownShowing
    ) {
      setDisplayStateOfSquare({
        isXShowing: true,
        isCrownShowing: false,
      });
    }

    console.log("SHOW ME THE DIAGONALS:", calculateDiagonals(row, column));

    // There is already an X so set a Crown
    if (
      displayStateOfSquare.isXShowing &&
      !displayStateOfSquare.isCrownShowing
    ) {
      setDisplayStateOfSquare({
        isXShowing: false,
        isCrownShowing: true,
      });
      if (rowsWithCrown.includes(row)) {
        window.alert("ROW ERROR!");
        location.reload();
        return;
      }
      if (columnsWithCrown.includes(column)) {
        window.alert("COLUMN ERROR!");
        location.reload();
        return;
      }
      if (colorsWithCrown.includes(color)) {
        window.alert("COLOR ERROR!");
        location.reload();
        return;
      }
      // Check for diagonal errors
      calculateDiagonals(row, column).forEach((square) => {
        // console.log('SHOW ME WHAT YOUR CALCULATING HERE:', square)
        console.log({rowsWithCrown, columnsWithCrown, row, column, square})
        // console.log(`This is the diagonal: ${square.row}` + ` and this is row condition: ${rowsWithCrown.includes(square.row)} `)
        if (
          rowsWithCrown.includes(square.row.toString()) &&
          columnsWithCrown.includes(square.column.toString())
        ) {
          console.log('AM I JUMPING HERE?????')
          window.alert("DIAGONAL ERROR!");
          location.reload();
          return
        }
      });
      setRowsWithCrown([...rowsWithCrown, row]);
      setColumnsWithCrown([...columnsWithCrown, column]);
      setColorsWithCrown([...colorsWithCrown, color]);
    }

    // There is already a Crown, so turn it off
    if (
      !displayStateOfSquare.isXShowing &&
      displayStateOfSquare.isCrownShowing
    ) {
      setDisplayStateOfSquare({
        isXShowing: false,
        isCrownShowing: false,
      });
      const removingCrownFromRow = rowsWithCrown.filter(
        (arrayRow) => arrayRow !== row
      );
      const removingCrownFromColumn = columnsWithCrown.filter(
        (arrayColumn) => arrayColumn !== column
      );
      const removingCrownFromColors = colorsWithCrown.filter(
        (arrayColor) => arrayColor !== color
      );

      setRowsWithCrown([removingCrownFromRow]);
      setColumnsWithCrown([removingCrownFromColumn]);
      setColorsWithCrown([removingCrownFromColors]);
    }
  };

  // console.log("THIS IS THE COLOR IM PASSING IN:", color);
  return (
    <div
      onClick={handleClick}
      style={{
        height: "35px",
        width: "35px",
        backgroundColor: COLORS[color],
        border: "2px solid black",
      }}
    >
      {displayStateOfSquare.isXShowing && <FontAwesomeIcon icon={faX} />}
      {displayStateOfSquare.isCrownShowing && (
        <FontAwesomeIcon icon={faCrown} />
      )}{" "}
    </div>
  );
};

const generateGrid = (
  array,
  rowsWithCrown,
  columnsWithCrown,
  setRowsWithCrown,
  setColumnsWithCrown,
  colorsWithCrown,
  setColorsWithCrown
) => {
  return array.map((square, idx) => {
    const color = square.split("color ")[1].split(",")[0];
    const row = square.split(", ")[1].split(" ")[1];
    const column = square.split(", ")[2].split(" ")[1];
    // console.log('SHOW ME THE SQUARE:', square.split(", ")[1].split(" ")[1])
    // console.log('SHOW ME THE COLOR STRING:', color)
    // console.log('FDFAS', COLORS[color])
    return (
      <Square
        color={color}
        rowsWithCrown={rowsWithCrown}
        columnsWithCrown={columnsWithCrown}
        setRowsWithCrown={setRowsWithCrown}
        setColumnsWithCrown={setColumnsWithCrown}
        colorsWithCrown={colorsWithCrown}
        setColorsWithCrown={setColorsWithCrown}
        key={idx}
        row={row}
        column={column}
      />
    );
  });
};

const getBoardConfig = (array) => {
  const colorArray = [];
  const lastString = array[array.length - 1].split(", ");
  const row = lastString[1].split(" ")[1];
  const column = lastString[2].split(" ")[1];

  array.map((square) => {
    const color = square.split("color")[1].split(",")[0];
    if (!colorArray.includes(color)) {
      colorArray.push(color);
    }
  });

  return { colorArray, row, column };
};

function App() {
  const [count, setCount] = useState(0);
  const [width, setWidth] = useState(0);
  const [rowsWithCrown, setRowsWithCrown] = useState([]);
  const [columnsWithCrown, setColumnsWithCrown] = useState([]);
  const [colorsWithCrown, setColorsWithCrown] = useState([]);
  const [boardStats, setBoardStats] = useState({});

  useEffect(() => {
    const boardConfig = getBoardConfig(hello);
    // console.log('SHOW ME THE BOARD CONFIG:', boardConfig)
  }, []);

  // console.log('show me all the colors:', getBoardConfig(hello))

  // const width = 35 * 7

  return (
    <>
      {/* <button style={{border: '2px solid red'}} onClick={async () => console.log(await getHTML())}>Steal Board!</button> */}
      <div
        style={{
          display: "grid",
          width: width,
          gridTemplateColumns: "repeat(11, 1fr)",
          gridTemplateRows: "repeat(11, 1fr)",
          // columnGap: '0px',
          // gap: 0
          // rowGap: '0px'
        }}
      >
        {generateGrid(
          hello,
          rowsWithCrown,
          columnsWithCrown,
          setRowsWithCrown,
          setColumnsWithCrown,
          colorsWithCrown,
          setColorsWithCrown
        )}
      </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
