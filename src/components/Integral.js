import React, {Component, PropTypes} from 'react'
import {throttle} from 'core-decorators'

export default class Integral extends Component {
    //called only before initial render, use to create JSXGraph elements
    componentWillMount() {
        //create left glider
        var X = Number(this.props.leftBound);
        var Y = this.context.functionGraph.Y(X);
        this.leftGlider = this.context.board.create('glider', [X, Y, this.context.functionGraph], {name: 'A'});

        //attach leftBoundOnDrag event handler property
        if (this.props.leftBoundOnDrag) {
            this.leftGlider.on('drag', this._onLeftDrag.bind(this));
        }

        //create right glider
        X = Number(this.props.rightBound);
        Y = this.context.functionGraph.Y(X);
        this.rightGlider = this.context.board.create('glider', [X, Y, this.context.functionGraph], {name: 'B'});

        //attach rightBoundOnDrag event handler property
        if (this.props.rightBoundOnDrag) {
            this.rightGlider.on('drag', this._onRightDrag.bind(this));
        }


        //create integral
        this.integral = this.context.board.create('integral', [[() => this.leftGlider.X(), () => this.rightGlider.X()], this.context.functionGraph], {
            label: {strokeColor: "red"},
            fillOpacity: 0.2
        });
    }

    @throttle(50, {trailing: true, leading: true})
    _onLeftDrag() {
        if (this.props.leftBoundOnDrag) {
            this.props.leftBoundOnDrag(this.leftGlider);
        }
    }

    @throttle(50, {trailing: true, leading: true})
    _onRightDrag() {
        if (this.props.rightBoundOnDrag) {
            this.props.rightBoundOnDrag(this.rightGlider);
        }
    }

    _syncGlider() {
        this._onLeftDrag()
        this._onRightDrag()
    }

    //called only if shouldComponentUpdate returns true, before each render
    //use to update JSXGraph elements when props or state changes
    componentWillUpdate(nextProps, nextState, nextContext) {
        if (this.props.leftBound != nextProps.leftBound) {
            var leftGliderX = nextProps.leftBound;
            var leftGliderY = this.context.functionGraph.Y(leftGliderX);
            this.leftGlider.moveTo([leftGliderX, leftGliderY]);
        }
        if (this.props.rightBound != nextProps.rightBound) {
            var rightGliderX = nextProps.rightBound;
            var rightGliderY = this.context.functionGraph.Y(rightGliderX);
            this.rightGlider.moveTo([rightGliderX, rightGliderY]);
        }
        this._syncGlider();
    }

    //called only if shouldComponentUpdate returns true
    //use to render any child elements
    render() {
        //no children
        return null;
    }
}
Integral.displayName = 'Integral'
Integral.propTypes = {
    rightBoundOnDrag: PropTypes.func,
    leftBoundOnDrag: PropTypes.func,
    leftBound: PropTypes.number.isRequired,
    rightBound: PropTypes.number.isRequired
}
Integral.defaultProps = {}
Integral.contextTypes = {
    board: React.PropTypes.object,
    functionGraph: React.PropTypes.object
};
