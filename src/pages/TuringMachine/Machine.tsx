import { FC, useEffect, useRef } from "react"
import useSyles from "./Styles"
import { Box, useTheme } from "@mui/material";
import Konva from "konva";
import Vector2 from "./Vector2";

const cellSize = 50;
var Width = 0;
var Height = 0;
var stage = undefined;




class Field {
    layer: Konva.Layer;

    position: Vector2;

    constructor(layer: Konva.Layer, position: Vector2) {
        this.layer = layer;
        this.position = position;
    }
}


const Main = (palette: any) => {
    return () => {
        var container = document.getElementById("container");
        Width = container?.clientWidth || 0;
        Height = container?.clientHeight || 0;

        stage = new Konva.Stage({
            container: "container",
            width: Width,
            height: Height
        });

        var position = new Vector2(0, 0);
        var layer = new Konva.Layer(position);
        stage.add(layer);
        
        
        

        

        // var rect1 = new Konva.Rect({
        //     x: 0,
        //     y: 0,
        //     width: Width,
        //     height: Height,
        //     fill: palette.primaryContainer.main,
        //     name: 'rect',
        // });


        // var rect2 = new Konva.Rect({
        //     x: 0,
        //     y: 0,
        //     width: Width,
        //     height: Height,
        //     fill: palette.secondaryContainer.dark,
        //     name: 'rect',
        // });
        // first_layer.add(rect1);
        // second_layer.add(rect2);

        
        // rect1.on("click", () => {
        //     let tween1 = new Konva.Tween({
        //         node: first_layer,
        //         duration: 0.5,
        //         easing: Konva.Easings.EaseInOut,

        //         y: first_layer.getPosition().y - Height,
        //     });
        //     tween1.play();

        //     let tween2 = new Konva.Tween({
        //         node: second_layer,
        //         duration: 0.5,
        //         easing: Konva.Easings.EaseInOut,

        //         y: second_layer.getPosition().y - Height,
        //     });
        //     tween2.play();
        // });

                
        // rect2.on("click", () => {
        //     let tween1 = new Konva.Tween({
        //         node: first_layer,
        //         duration: 0.5,
        //         easing: Konva.Easings.EaseInOut,

        //         y: first_layer.getPosition().y + Height,
        //     });
        //     tween1.play();

        //     let tween2 = new Konva.Tween({
        //         node: second_layer,
        //         duration: 0.5,
        //         easing: Konva.Easings.EaseInOut,

        //         y: second_layer.getPosition().y + Height,
        //     });
        //     tween2.play();
        // });
    }
}


const Machine: FC = () => {
    const palette = useTheme().palette;
    const styles: any = useSyles().machine;

    useEffect(Main(palette), []);

    return <Box id="container" sx={styles.root}>

    </Box>
}

export default Machine
