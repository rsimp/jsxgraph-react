import React, { Component } from 'react';

export default class FunctionGraph extends Component {
    //called only before initial render
    componentWillMount(){
        this.functionGraph = this.context.board.create('functiongraph',[this.props.function,-20,20]);
    }

    //called right before child lifecycles, passes context object to all children
    getChildContext() {
        return {functionGraph: this.functionGraph, ...this.context};
    }

    //called only if shouldComponentUpdate returns true, before each render
    //use this function as the true JSXGraph render function
    componentWillUpdate(nextProps, nextState, nextContext){
        if (this.props.function != nextProps.function){
            this.functionGraph.Y = nextProps.function;
            this.functionGraph.updateCurve();
            this.context.board.update();
        }
    }

    //called only if shouldComponentUpdate returns true
    //mostly just use for rendering child content
    render() {
        //render children if JSXGraph element was successfully created
        return (this.functionGraph && this.props.children) ? this.props.children : null;
    }
}

FunctionGraph.contextTypes = {
    board: React.PropTypes.object
};

FunctionGraph.childContextTypes = {
    board: React.PropTypes.object,
    functionGraph: React.PropTypes.object
};
