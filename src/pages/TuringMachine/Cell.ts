import Vector2 from "./Vector2.ts";
import Konva from "konva";
import {Palette} from "@mui/material";


class Cell {
    position: Vector2;

    cell: Konva.Group;

    value: string;

    index: number

    constructor(
        position: Vector2,
        value: string,
        palette: Palette,
        cellSize: number,
        index: number = 0
    ) {
        this.position = position;
        this.value = value;
        this.index = index;
        this.cell = new Konva.Group({
            x: this.position.x,
            y: this.position.y,
            width: cellSize,
            height: cellSize
        });

        this.cell.add(new Konva.Rect({
            width: cellSize,
            height: cellSize,
            stroke: palette.onSurface.main,
            strokeWidth: 2
        }));

        this.cell.add(new Konva.Text({
            text: this.value,
            fontFamily: "Roboto",
            fill: palette.onSurface.main,
            fontSize: 30,
            width: cellSize,
            height: cellSize,
            align: "center",
            verticalAlign: "middle",
            fontStyle: "bold"
        }))
    }

    attach(layer: Konva.Layer) {
        layer.add(this.cell);
    }
}


export default Cell;