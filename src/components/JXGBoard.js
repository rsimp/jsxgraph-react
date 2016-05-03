import React, { Component } from 'react';
import * as _ from 'lodash';

export default class JXGBoard extends Component {
    constructor(props) {
        super(props);
        this.id = _.uniqueId("board-");
        this.state = {board: null};
        this.defaultStyle = {width:500, height:500};
    }

    //called right before child lifecycles, passes context object to all children
    getChildContext() {
        return {board: this.state.board};
    }

    //called only after initial render
    componentDidMount(){
        //now that div exists, create new JSXGraph board with it
        this.setState({
            board: JXG.JSXGraph.initBoard(this.id, {boundingbox:[-3,10,3,-3],axis:true})
        });
    }

    //called only if shouldComponentUpdate returns true
    //for rendering the JSXGraph board div and any child elements
    render() {
        var style = _.assign(this.defaultStyle, this.props.style || {});
        var children = this.state.board ? this.props.children : null; //only pass in children if board exists

        return (
            <div id={this.id} className="jxgbox" style={style}>
                {children}
            </div>
        );
    }
}

JXGBoard.childContextTypes = {
    board: React.PropTypes.object
};

