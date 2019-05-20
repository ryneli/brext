import React, { useState, useEffect } from 'react';
import PdfjsWrapper from './PdfjsWrapper';
import WritingLayer from './WritingLayer';
import Gesture from './Gesture';
import './Page.css';

function Page(props) {
    const pdfjsWrapper = new PdfjsWrapper();
    const [canvas, setCanvas] = useState(null);

    useEffect(() => {
        console.log('Page#componentDidMount');
        pdfjsWrapper.getPageAsImg(props.data.contentUrl, 
            props.data.pageNumber).then((canvas) => {
                setCanvas(canvas);
            });
    }, []);

    function onDoubleTap(e) {
        console.log('Page#onDoubleTap %o', e);
    }
    const gesture = new Gesture({onDoubleTap});

    
    if (canvas) {
        return (
            <div style={{
                position: 'absolute',
                top: props.data.transform.shiftY * props.scale, 
                left: props.data.transform.shiftX * props.scale,
                width: props.data.size.width * props.scale, 
                height: props.data.size.height * props.scale, 
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                backgroundImage: `url("${canvas.toDataURL('image/png')}")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center', 
                backgroundSize: 'contain'}}
                id={'page' + props.data.pageNumber}
                onPointerDown={gesture.onPointerDown.bind(gesture)}
                onPointerMove={gesture.onPointerMove.bind(gesture)}
                onPointerUp={gesture.onPointerUp.bind(gesture)}>
                <WritingLayer scale={props.scale}></WritingLayer>
            </div>
            );
    } else {
        return (<div>loading</div>);
    }
}

export default Page;
