import React, { Component, PropTypes } from 'react';

export class FunctionGraph extends Component {
    //called only before initial render, use to create JSXGraph elements
    componentWillMount(){
        this.functionGraph = this.context.board.create('functiongraph',[this.props.function,-20,20]);
    }

    //called right before child lifecycles, passes context object to all children
    getChildContext() {
        return {functionGraph: this.functionGraph, ...this.context};
    }

    //called only if shouldComponentUpdate returns true, before each render
    //use to update JSXGraph elements when props or state changes
    componentWillUpdate(nextProps, nextState, nextContext){
        if (this.props.function != nextProps.function){
            this.functionGraph.Y = nextProps.function;
            this.functionGraph.updateCurve();
            this.context.board.update();
        }
    }

    //called only if shouldComponentUpdate returns true
    //use to render any child elements
    render() {
        return this.props.children || null;
    }
}
FunctionGraph.propTypes = {
    //May consider renaming this
    'function': PropTypes.function
}
FunctionGraph.contextTypes = {
    board: React.PropTypes.object
};

FunctionGraph.childContextTypes = {
    board: React.PropTypes.object,
    functionGraph: React.PropTypes.object
};
