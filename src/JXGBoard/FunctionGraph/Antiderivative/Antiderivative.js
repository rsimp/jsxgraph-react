import React, { Component, PropTypes } from 'react';

export class Antiderivative extends Component {
    //called only before initial render, use to create JSXGraph elements
    componentWillMount(){
        //create first glider
        var X = Number(this.props.leftBound);
        var Y = this.context.functionGraph.Y(X);
        this.leftGlider = this.context.board.create('glider',[X, Y, this.context.functionGraph],{name:'A'});

        //create line for first glider
        this.context.board.create('line',
            [this.leftGlider, () => [this.leftGlider.X()+1, this.leftGlider.Y()]],
            {
                straightFirst:true, straightLast:true,
                strokeWidth:1, strokeColor:"red",
                dash:1
            });

        //attach leftBoundOnDrag event handler property
        if (this.props.leftBoundOnDrag){
            this.leftGlider.on('drag', function() {
                this.props.leftBoundOnDrag(this.leftGlider);
            }.bind(this));
        }


        //create second glider
        X = Number(this.props.rightBound);
        Y = this.context.functionGraph.Y(X);
        this.rightGlider = this.context.board.create('glider',[X, Y, this.context.functionGraph],{name:'B'});

        //create line for second glider
        this.context.board.create('line',
            [ this.rightGlider, () => [this.rightGlider.X()+1, this.rightGlider.Y()] ],
            {
                straightFirst:true, straightLast:true,
                strokeWidth:1, strokeColor:"red",
                dash:1
            });

        //attach rightBoundOnDrag event handler property
        if (this.props.rightBoundOnDrag){
            this.rightGlider.on('drag', function() {
                this.props.rightBoundOnDrag(this.rightGlider);
            }.bind(this));
        }


        //create y delta line on board2
        var delta_line = this.context.board.create('line',
            [
                () => {
                    var XOffset = (this.rightGlider.X() >= this.leftGlider.X()) ? .3 : -.3;
                    return [ this.rightGlider.X() + XOffset, this.leftGlider.Y()];
                },
                () => {
                    var XOffset = (this.rightGlider.X() >= this.leftGlider.X()) ? .3 : -.3;
                    return [this.rightGlider.X() + XOffset, this.rightGlider.Y()];
                }
            ],
            {
                straightFirst:false, straightLast:false,
                strokeWidth:1,
                strokeColor:"red",
                firstArrow:false, lastArrow:true,
                dash:2
            });

        //create label for y delta line
        var delta_line_label_point = this.context.board.create('text',
            [
                () => {
                    var XOffset = (this.rightGlider.X() >= this.leftGlider.X()) ? .4 : -.2;
                    return this.rightGlider.X() + XOffset;
                },
                () => this.leftGlider.Y() + (this.rightGlider.Y()-this.leftGlider.Y())/2,
                () => "Δy = " + (this.rightGlider.Y()-this.leftGlider.Y()).toFixed(4)
            ],
            {fontSize:20, strokeColor:"red"});
    }

    //called only if shouldComponentUpdate returns true, before each render
    //use to update JSXGraph elements when props or state changes
    componentWillUpdate(nextProps, nextState, nextContext){
        if (this.props.leftBound != nextProtestps.leftBound){
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
    //use to render any child elements
    render() {
        //no children
        return null;
    }
}

Antiderivative.dipslayName = 'Antiderivative';
Antiderivative.propTypes = {
    leftBound:  PropTypes.number.required,
    rightBound: PropTypes.number.required,
    leftBoundOnDrag:    PropTypes.func,
    rightBoundOnDrag:   PropTypes.func
}

Antiderivative.contextTypes = {
    board: React.PropTypes.object,
    functionGraph: React.PropTypes.object
};