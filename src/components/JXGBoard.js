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
        this.setState({
            board: JXG.JSXGraph.initBoard(this.id, {boundingbox:[-3,10,3,-3],axis:true})
        });
    }

    //called only if shouldComponentUpdate returns true
    //mostly just use for rendering child content and the JSXGraph board div
    render() {
        var style = _.assign(this.defaultStyle, this.props.style || {});
        var content = this.state.board ? this.props.children : null;

        return (
            <div id={this.id} className="jxgbox" style={style}>
                {content}
            </div>
        );
    }
}

JXGBoard.childContextTypes = {
    board: React.PropTypes.object
};

