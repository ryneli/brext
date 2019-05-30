import React, { useState, useEffect } from 'react';
import PdfjsWrapper from './PdfjsWrapper';
import WritingLayer from './WritingLayer';
import Gesture, { SWIPE_DIRECTION } from './Gesture';
import './Page.css';

function Page(props) {
    const pdfjsWrapper = new PdfjsWrapper();
    const [canvas, setCanvas] = useState(null);
    const [sizeAndTransform, setSizeAndTransform] = useState({
        top: props.data.transform.shiftY * props.scale,
        left: props.data.transform.shiftX * props.scale,
        width: props.data.size.width * props.scale,
        height: props.data.size.height * props.scale,
        zIndex: 1,
        alterTop: '0px',
        alterLeft: '0px',
        alterWidth: `100vw`,
        alterHeight: `100vh`,
        alterZIndex: 98,
    });
    const [pageNumber, setPageNumber] = useState(props.data.pageNumber);

    useEffect(() => {
        console.log('Page#componentDidMount');
        pdfjsWrapper.getPageAsImg(props.data.contentUrl, 
            pageNumber).then((canvas) => {
                setCanvas(canvas);
            });
    }, [pageNumber]);

    function onDoubleTap(e) {
        console.log('Page#onDoubleTap %o', e);
        const newSizeAndTransform = {
            top: sizeAndTransform.alterTop,
            left: sizeAndTransform.alterLeft,
            width: sizeAndTransform.alterWidth,
            height: sizeAndTransform.alterHeight,
            zIndex: sizeAndTransform.alterZIndex,
            alterTop: sizeAndTransform.top,
            alterLeft: sizeAndTransform.left,
            alterWidth: sizeAndTransform.width,
            alterHeight: sizeAndTransform.height,
            alterZIndex: sizeAndTransform.zIndex,
        }
        setSizeAndTransform(newSizeAndTransform);
    }

    function onSwipe(direction) {
        console.log('Page#onSwipe %o', direction);
        // TODO: check page number limit
        if (direction === SWIPE_DIRECTION.RIGHT) {
            setPageNumber(pageNumber-1);
        } else if (direction === SWIPE_DIRECTION.LEFT) {
            setPageNumber(pageNumber+1);
        }
    }
    const gesture = new Gesture({onDoubleTap, onSwipe});

    if (canvas) {
        return (
            <div>
                <div style={{
                    position: 'absolute',
                    top: sizeAndTransform.top, 
                    left: sizeAndTransform.left,
                    width: sizeAndTransform.width, 
                    height: sizeAndTransform.height, 
                    zIndex: sizeAndTransform.zIndex,
                    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                    backgroundColor: '#6DB3F2',
                    backgroundImage: `url("${canvas.toDataURL('image/png')}")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center', 
                    backgroundSize: 'contain'}}
                    id={'page' + props.data.pageNumber}
                    onPointerDown={gesture.onPointerDown.bind(gesture)}
                    onPointerMove={gesture.onPointerMove.bind(gesture)}
                    onPointerUp={gesture.onPointerUp.bind(gesture)}>
                    <WritingLayer scale={props.scale}></WritingLayer>
                </div>
            </div>
            
            );
    } else {
        return (<div>loading</div>);
    }
}

export default Page;
