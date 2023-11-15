import { useState, useRef } from 'react';
import { Stage, Layer, Line, Text } from 'react-konva';
import { ChromePicker } from 'react-color';
import { css } from '@emotion/react';
import { KonvaEventObject } from 'konva/lib/Node';

interface LinesItem {
  tool: string
  color?: string
  points: number[]
}

export default function Board() {
  const [color, setColor] = useState<string>('#000');
  const [tool, setTool] = useState<string>('pen');
  const [lines, setLines] = useState<LinesItem[]>([]);

  const isDrawing = useRef(false);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>) => {
    isDrawing.current = true;
    const pos = e.target.getStage()?.getPointerPosition() ?? {x: 0, y: 0};

    setLines([...lines, { tool, points: [pos.x , pos.y] }]);
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>) => {
    if (!isDrawing.current) {
      return;
    }

    const stage = e.target.getStage();
    const point = stage?.getPointerPosition() ?? {x: 0, y: 0};
    const lastLine = lines[lines.length - 1];

    lastLine.points = lastLine.points.concat([point.x, point.y]);
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

  /**
   * Style
   */
  const containerStyle = css`
    display: flex;
  `;

  const toolRightStyle = css`
    width: 10%;
  `;

  const toolLeftStyle = css`
    width: 25%
  `;

  const boardStyle = css`
    width: 65%;
  `;

  return (
    <div className="boardContainer" css={containerStyle}>
      <div className="toolRight" css={toolRightStyle}>
        <select
          value={tool}
          onChange={(e) => {
            setTool(e.target.value);
          }}
        >
          <option value="pen">Pen</option>
          <option value="eraser">Eraser</option>
        </select>
      </div>

      <Stage
        className="board"
        css={boardStyle}
        width={700}
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
          <Text text="Just start drawing" x={5} y={30} />
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
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
        <ChromePicker
          color={color}
          onChange={color => handleColorChange(color.hex)}
        />
      </div>
    </div>
  );
}