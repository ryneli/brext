import React, { Component } from 'react';
import PdfjsWrapper from './PdfjsWrapper';
import WritingLayer from './WritingLayer';
import './Page.css';

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canvas: null,
            pdfjsWrapper: new PdfjsWrapper(),
        }
    }
    /**
     * componentDidMount is invoked after first rendering and before any setState
     */
    componentDidMount() {
        console.log('Page#componentDidMount');
        this.loadPage();
    }

    /**
     * From https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#invoking-external-callbacks.
     * 
     * it is unsafe to use componentWillUpdate for this purpose in async mode, because the external 
     * callback might get called multiple times for a single update. Instead, the componentDidUpdate 
     * lifecycle should be used since it is guaranteed to be invoked only once per update.
     * 
     * componentDidUpdate is invoked right after rendering.
     */
    componentDidUpdate() {
        console.log('Page#componentDidUpdate');
    }


    componentWillUnmount() {
        console.log('Page#componentWillUnmount');
    }

    /**
     * This is unsafe too. It may be called multiple times.
     */
    componentWillReceiveProps() {
        console.log('Page#componentWillReceiveProps');
    }

    loadPage() {
        this.state.pdfjsWrapper.getPageAsImg(this.props.data.contentUrl, 
            this.props.data.pageNumber).then((canvas) => {
                this.setState({canvas: canvas});
            });
    }

    render() {
        console.log('Page#useEffect %o', JSON.stringify(this.props.data));
        if (this.state.canvas) {
            return (
                <div style={{
                    position: 'absolute',
                    top: this.props.data.transform.shiftY * this.props.scale, 
                    left: this.props.data.transform.shiftX * this.props.scale,
                    width: this.props.data.size.width * this.props.scale, 
                    height: this.props.data.size.height * this.props.scale, 
                    borderColor: 'black',
                    borderStyle: 'dashed',
                    borderWidth: '2px',
                    backgroundImage: `url("${this.state.canvas.toDataURL('image/png')}")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center', 
                    backgroundSize: 'contain'}}
                    id={'page' + this.props.data.pageNumber}>
                    <WritingLayer></WritingLayer>
                </div>
                );
        } else {
            return (<div>loading</div>);
        }
        
    }
}

export default Page;
