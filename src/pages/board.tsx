import { useState, useRef } from 'react';
import { Stage, Layer, Line, } from 'react-konva';
import { SketchPicker  } from 'react-color';
import { css } from '@emotion/react';
import { KonvaEventObject } from 'konva/lib/Node';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faEraser, faArrowRotateRight, faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';

interface Point {
  x: number
  y: number
}

interface LinesItem {
  tool: string
  color?: string
  points: Point[]
}

export default function Board() {
  const [color, setColor] = useState<string>('#000');
  const [tool, setTool] = useState<string>('pen');
  const [lines, setLines] = useState<LinesItem[]>([]);
  const [history, setHistory] = useState<LinesItem[][]>([]);

  const isDrawing = useRef(false);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>) => {
    isDrawing.current = true;
    const pos = e.target.getStage()?.getPointerPosition() ?? {x: 0, y: 0};

    setLines([...lines, { tool, points: [{x: pos.x , y: pos.y}] }]);
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>) => {
    if (!isDrawing.current) {
      return;
    }

    const stage = e.target.getStage();
    const point = stage?.getPointerPosition() ?? {x: 0, y: 0};
    const lastLine = lines[lines.length - 1];

    lastLine.points.push({ x: point.x, y: point.y });
    lastLine.color = color;

    lines.splice(lines.length - 1, 1, lastLine);

    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const handleUndo = () => {
    if (!lines.length) {
      return;
    }

    const lastLine = lines[lines.length - 1];
    const newLines = lines.slice(0, lines.length - 1);

    setHistory([...history, [lastLine]]);

    setLines(newLines);
  };

  const handleRedo = () => {
    if (!history.length) {
      return;
    }

    const lastLine = history[history.length - 1];
    const newLines = lines.concat(lastLine);
    const newHistory = history.slice(0, history.length - 1);

    setLines(newLines);
    setHistory(newHistory);
  };

  /**
   * Style
   */
  const containerStyle = css`
    display: flex;
  `;

  const toolRightStyle = css`
    width: 10%;
    display: flex;
    flex-direction: column;
    gap: 10px;
  `;

  const toolLeftStyle = css`
    width: 25%
    display: flex;
    flex-direction: column;
    gap: 10px;
  `;

  const boardStyle = css`
    width: 65%;
  `;

  return (
    <div className="boardContainer" css={containerStyle}>
      <div className="toolRight" css={toolRightStyle}>
        <FontAwesomeIcon
          icon={faPen}
          size={'xl'}
          onClick={() => setTool('pen')}
        />
        <FontAwesomeIcon
          icon={faEraser}
          size={'xl'}
          onClick={() => setTool('eraser')}
        />
        <FontAwesomeIcon
          icon={faArrowRotateLeft}
          size={'xl'}
          onClick={handleUndo}
        />
        <FontAwesomeIcon
          icon={faArrowRotateRight}
          size={'xl'}
          onClick={handleRedo}
        />
      </div>

      <Stage
        className="board"
        css={boardStyle}
        width={580}
        height={500}
        // width={window.innerWidth}
        // height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <Layer>
          {/* <Text text="Just start drawing" x={5} y={30} /> */}
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points.map((point) => [point.x, point.y]).flat()}
              stroke={line.color}
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="miter"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </Stage>

      <div className="toolLeft" css={toolLeftStyle}>
        <SketchPicker
          color={color}
          onChange={color => handleColorChange(color.hex)}
        />
        <div>size</div>
        <div>opacity</div>
        <div>stabilizer</div>
        <div>shape</div>
      </div>
    </div>
  );
}