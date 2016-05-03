import React, { Component } from 'react';

export default class Integral extends Component {
    //called only before initial render
    componentWillMount(){
        //create first glider
        var X = Number(this.props.leftBound);
        var Y = this.context.functionGraph.Y(X);
        this.leftGlider = this.context.board.create('glider',[X, Y, this.context.functionGraph],{name:'A'});

        //create second glider
        X = Number(this.props.rightBound);
        Y = this.context.functionGraph.Y(X);
        this.rightGlider = this.context.board.create('glider',[X, Y, this.context.functionGraph],{name:'B'});

        //attach leftBoundOnDrag event handler property
        if (this.props.leftBoundOnDrag){
            this.leftGlider.on('drag', function() {
                this.props.leftBoundOnDrag(this.leftGlider);
            }.bind(this));
        }

        //attach rightBoundOnDrag event handler property
        if (this.props.rightBoundOnDrag){
            this.rightGlider.on('drag', function() {
                this.props.rightBoundOnDrag(this.rightGlider);
            }.bind(this));
        }

        //create integral
        this.integral = this.context.board.create('integral',[[() => this.leftGlider.X(), () => this.rightGlider.X()],this.context.functionGraph],{label:{strokeColor:"red"}, fillOpacity:0.2});
    }

    //called only if shouldComponentUpdate returns true, before each render
    //use this function as the true JSXGraph render function
    componentWillUpdate(nextProps, nextState, nextContext){
        if (this.props.leftBound != nextProps.leftBound){
            var leftGliderX = nextProps.leftBound;
            var leftGliderY = this.context.functionGraph.Y(leftGliderX);
            this.leftGlider.moveTo([leftGliderX, leftGliderY]);
        }
        if (this.props.rightBound != nextProps.rightBound){
            var rightGliderX = nextProps.rightBound;
            var rightGliderY = this.context.functionGraph.Y(rightGliderX);
            this.rightGlider.moveTo([rightGliderX, rightGliderY]);
        }
    }

    //called only if shouldComponentUpdate returns true
    //mostly just use for rendering child content, starting their lifecycles
    render() {
        //no children
        return null;
    }
}

Integral.contextTypes = {
    board: React.PropTypes.object,
    functionGraph: React.PropTypes.object
};
