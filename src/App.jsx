import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import COLORS from "./colors";
import hello, {
  secondNewOne,
  got3Minutes,
  mamoudou,
  marmoush,
  sad,
  ramadandayone,
  secondDayOfRamadan,
  squirtlespawn,
  holyGrail,
  luBdayNight,
  piDay,
  piSymbol,
  easyOneIShouldHaveGot,
  miamiOpen,
  daDaySquirtleWasBorn,
  firstDayInPMac
} from "./mock";
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
  arrayOfCoordinates,
  setArrayOfCoordinates,
  coloredChessBoard,
}) => {
  const [displayStateOfSquare, setDisplayStateOfSquare] = useState({
    isXShowing: false,
    isCrownShowing: false,
  });
  // const [diagonalErrorWasSet, setDiagonalErrorWasSet] = useState(false);

  const colorToLeft = coloredChessBoard?.[row]?.[column - 1];
  const colorToRight = coloredChessBoard?.[row]?.[column + 1];
  const colorAbove = coloredChessBoard?.[row - 1]?.[column];
  const colorBelow = coloredChessBoard?.[row + 1]?.[column];
  const isDifferentColor = (colorOfSquare, neighbor) => {
    if (!neighbor) {
      return false;
    }
    return colorOfSquare !== neighbor;
  };

  const calculateDiagonals = (row, column) => {
    const rowAbove = row - 1;
    const rowBelow = row + 1;

    const columnToTheLeft = column - 1;
    const columnToTheRight = column + 1;

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
      const removingCrownFromDiagonals = arrayOfCoordinates.filter(
        (coors) => coors.row !== row && coors.column !== column
      );

      setRowsWithCrown(removingCrownFromRow);
      setColumnsWithCrown(removingCrownFromColumn);
      setColorsWithCrown(removingCrownFromColors);
      setArrayOfCoordinates(removingCrownFromDiagonals);
    }

    // There is already an X so set a Crown
    if (
      displayStateOfSquare.isXShowing &&
      !displayStateOfSquare.isCrownShowing
    ) {
      // setDisplayStateOfSquare({
      //   isXShowing: false,
      //   isCrownShowing: true,
      // });
      if (rowsWithCrown.includes(row)) {
        window.alert("ROW ERROR!");
        // location.reload();
        setDisplayStateOfSquare({
          isXShowing: false,
          isCrownShowing: false,
        });
        return;
      }
      if (columnsWithCrown.includes(column)) {
        window.alert("COLUMN ERROR!");
        setDisplayStateOfSquare({
          isXShowing: false,
          isCrownShowing: false,
        });
        // location.reload();
        return;
      }
      if (colorsWithCrown.includes(color)) {
        window.alert("COLOR ERROR!");
        setDisplayStateOfSquare({
          isXShowing: false,
          isCrownShowing: false,
        });
        // location.reload();
        return;
      }

      // console.log("show me these:", calculateDiagonals(row, column)[0]);
      // console.log("show me these:", calculateDiagonals(row, column)[1]);
      // console.log("show me these:", calculateDiagonals(row, column)[2]);
      // console.log("show me these:", calculateDiagonals(row, column)[3]);
      // console.log("show me total:", arrayOfCoordinates);

      // console.log(
      //   "hello:",
      //   arrayOfCoordinates.some(
      //     (coor) =>
      //       coor.row === calculateDiagonals(row, column)[0].row &&
      //       coor.column === calculateDiagonals(row, column).column
      //   )
      // );

      // console.log(
      //   "what is this incorrect condition:",
      //   calculateDiagonals(row, column).column
      // );

      if (
        arrayOfCoordinates.some(
          (coor) =>
            coor.row === calculateDiagonals(row, column)[0].row &&
            coor.column === calculateDiagonals(row, column)[0].column
        ) ||
        arrayOfCoordinates.some(
          (coor) =>
            coor.row === calculateDiagonals(row, column)[1].row &&
            coor.column === calculateDiagonals(row, column)[1].column
        ) ||
        arrayOfCoordinates.some(
          (coor) =>
            coor.row === calculateDiagonals(row, column)[2].row &&
            coor.column === calculateDiagonals(row, column)[2].column
        ) ||
        arrayOfCoordinates.some(
          (coor) =>
            coor.row === calculateDiagonals(row, column)[3].row &&
            coor.column === calculateDiagonals(row, column)[3].column
        )
      ) {
        window.alert("DIAGONAL ERROR!");
        setDisplayStateOfSquare({
          isXShowing: false,
          isCrownShowing: false,
        });
        // setDiagonalErrorWasSet(true);
        // location.reload();
        return;
      }

      // Check for diagonal errors
      // calculateDiagonals(row, column).forEach((square) => {
      //   if (
      //     arrayOfCoordinates.some(
      //       (coor) => coor.row === square.row && coor.column === square.column
      //     )
      //   ) {
      //     window.alert("DIAGONAL ERROR!");
      //     setDiagonalErrorWasSet(true);
      //     // location.reload();
      //     return;
      //   }
      // });
      // console.log("SET DIAG ERROR:", diagonalErrorWasSet);
      // if (diagonalErrorWasSet) {
      //   setDiagonalErrorWasSet(false);
      //   return;
      // }
      setDisplayStateOfSquare({
        isXShowing: false,
        isCrownShowing: true,
      });
      setRowsWithCrown([...rowsWithCrown, row]);
      setColumnsWithCrown([...columnsWithCrown, column]);
      setColorsWithCrown([...colorsWithCrown, color]);
      setArrayOfCoordinates([...arrayOfCoordinates, { row, column }]);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        style={{
          height: "35px",
          width: "35px",
          position: "relative",
          backgroundColor: COLORS[color],
          border: "0.5px solid black",
        }}
      >
        {displayStateOfSquare.isXShowing && <FontAwesomeIcon icon={faX} />}
        {displayStateOfSquare.isCrownShowing && (
          <FontAwesomeIcon icon={faCrown} />
        )}
        {isDifferentColor(color, colorToRight) && (
          <div
            style={{
              borderRight: "1px solid black",
              height: "35px",
              position: "absolute",
              right: 0,
              top: 0,
            }}
          ></div>
        )}
        {isDifferentColor(color, colorAbove) && (
          <div
            style={{
              borderTop: "1px solid black",
              width: "35px",
              position: "absolute",
              top: 0,
            }}
          ></div>
        )}
        {isDifferentColor(color, colorBelow) && (
          <div
            style={{
              borderBottom: "1px solid black",
              width: "35px",
              position: "absolute",
              bottom: 0,
            }}
          ></div>
        )}
        {isDifferentColor(color, colorToLeft) && (
          <div
            style={{
              borderLeft: "1px solid black",
              height: "35px",
              position: "absolute",
              left: 0,
              top: 0,
            }}
          ></div>
        )}
      </div>
    </>
  );
};

const generateGrid = (
  array,
  rowsWithCrown,
  columnsWithCrown,
  setRowsWithCrown,
  setColumnsWithCrown,
  colorsWithCrown,
  setColorsWithCrown,
  arrayOfCoordinates,
  setArrayOfCoordinates,
  coloredChessBoard
) => {
  return array.map((square, idx) => {
    const color = square.split("color ")[1].split(",")[0];
    const row = parseInt(square.split(", ")[1].split(" ")[1]);
    const column = parseInt(square.split(", ")[2].split(" ")[1]);
    return (
      <Square
        color={color}
        rowsWithCrown={rowsWithCrown}
        columnsWithCrown={columnsWithCrown}
        setRowsWithCrown={setRowsWithCrown}
        setColumnsWithCrown={setColumnsWithCrown}
        colorsWithCrown={colorsWithCrown}
        setColorsWithCrown={setColorsWithCrown}
        arrayOfCoordinates={arrayOfCoordinates}
        setArrayOfCoordinates={setArrayOfCoordinates}
        key={idx}
        row={row}
        column={column}
        coloredChessBoard={coloredChessBoard}
      />
    );
  });
};

const futari = (array) => {
  const updatedBoardWithRowsAndColumns = {};

  // console.log('show me the array:', array)

  array.forEach((square) => {
    const row = square.split(", ")[1].split(" ")[1];
    const column = square.split(", ")[2].split(" ")[1];
    const color = square.split("color ")[1].split(",")[0];
    updatedBoardWithRowsAndColumns[row] = {
      ...updatedBoardWithRowsAndColumns[row],
      [column]: color,
    };
  });

  return updatedBoardWithRowsAndColumns;
};

const getBoardConfig = (array) => {
  const colorArray = [];
  const lastString = array[array.length - 1].split(", ");
  const rows = parseInt(lastString[1].split(" ")[1]);
  const columns = parseInt(lastString[2].split(" ")[1]);

  // const updatedBoardWithRowsAndColumns = {}

  // // console.log('show me the array:', array)

  // array.forEach((square) => {
  //   const row = square.split(", ")[1].split(" ")[1]
  //   const column = square.split(", ")[2].split(" ")[1]
  //   const color = square.split("color")[1].split(",")[0]
  //   updatedBoardWithRowsAndColumns[row] = {
  //     ...updatedBoardWithRowsAndColumns[row],
  //     [column]: color
  //   }
  // })

  array.forEach((square) => {
    const color = square.split("color")[1].split(",")[0];
    if (!colorArray.includes(color)) {
      colorArray.push(color);
    }
  });

  return { colorArray, rows, columns };
};

function App() {
  const [count, setCount] = useState(0);
  const [boardConfig, setBoardConfig] = useState({
    rows: 0,
    columns: 0,
    colorArray: [],
  });
  const [coloredChessBoard, setColoredChessBoard] = useState({});
  const [rowsWithCrown, setRowsWithCrown] = useState([]);
  const [columnsWithCrown, setColumnsWithCrown] = useState([]);
  const [colorsWithCrown, setColorsWithCrown] = useState([]);
  const [arrayOfCoordinates, setArrayOfCoordinates] = useState([]);

  // determines if solution has been reached
  useEffect(() => {
    if (
      rowsWithCrown.length === boardConfig.rows &&
      columnsWithCrown.length === boardConfig.columns &&
      colorsWithCrown.length === boardConfig.colorArray.length &&
      boardConfig.rows !== 0
    ) {
      window.alert("YOU WIN!!!!");
    }
  }, [rowsWithCrown]);

  useEffect(() => {
    // const boardConfig = getBoardConfig(hello);
    const boardConfig = getBoardConfig(firstDayInPMac);
    setColoredChessBoard(futari(firstDayInPMac));
    setBoardConfig(boardConfig);
  }, []);

  // console.log('SHOW ME THE COLORED CHESS BOARD:', coloredChessBoard)

  return (
    <>
      <div
        style={{
          display: "grid",
          width: 0, // width of 0 makes it so you don't need to calculate width by squares
          gridTemplateColumns: `repeat(${boardConfig.columns}, 1fr)`,
          gridTemplateRows: `repeat${boardConfig.rows}, 1f)r`,
        }}
      >
        {generateGrid(
          // hello,
          // secondNewOne,
          // got3Minutes,
          // mamoudou,
          // marmoush,
          // sad,
          // ramadandayone,
          // secondDayOfRamadan,
          // squirtlespawn,
          // holyGrail,
          // luBdayNight,
          // piDay,
          // piSymbol,
          // easyOneIShouldHaveGot,
          // miamiOpen,
          // daDaySquirtleWasBorn,
          firstDayInPMac,
          rowsWithCrown,
          columnsWithCrown,
          setRowsWithCrown,
          setColumnsWithCrown,
          colorsWithCrown,
          setColorsWithCrown,
          arrayOfCoordinates,
          setArrayOfCoordinates,
          coloredChessBoard
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
        <button onClick={() => console.log(arrayOfCoordinates)}>
          SHOW ME LIST
        </button>
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

const test = {
  rows: {
    1: {
      1: "red",
      2: "lavender",
      3: "green",
    },
    2: {
      1: "purple",
      2: "red",
    },
  },
};

// Square(row, column)

// TOP: same column one row above
// BOTTOM: same column one row below
// LEFT: same row one column less
// RIGHT: same row one column more
