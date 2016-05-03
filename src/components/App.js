import React, { Component } from 'react';
import JXGBoard from './JXGBoard';
import FunctionGraph from './FunctionGraph';
import Integral from './Integral';
import Antiderivative from './Antiderivative';
import * as mathutil from '../utils/mathutil';
import nerdamer from 'nerdamer';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.defaultEquationText = "x^2 + 4x + 4";
        var func = nerdamer(this.defaultEquationText).buildFunction();

        this.state = {
            leftBound: -2,
            rightBound: 1,
            function: func,
            antiderivative: mathutil.createAntiderivative(func),
        };

        this.leftBoundOnDrag = this.leftBoundOnDrag.bind(this);
        this.rightBoundOnDrag = this.rightBoundOnDrag.bind(this);
        this.updateEquation = this.updateEquation.bind(this);
    }

    leftBoundOnDrag(glider){
        this.setState({leftBound: glider.X()});
    }

    rightBoundOnDrag(glider){
        this.setState({rightBound: glider.X()});
    }

    updateEquation(){
        var func =  nerdamer(this.refs.equation.value).buildFunction();

        this.setState({
            function: func,
            antiderivative: mathutil.createAntiderivative(func)
        });
    }

    render() {
        return (
            <div>
                <JXGBoard>
                    <FunctionGraph function={this.state.antiderivative}>
                        <Antiderivative leftBound={this.state.leftBound} rightBound={this.state.rightBound}
                                        leftBoundOnDrag={this.leftBoundOnDrag} rightBoundOnDrag={this.rightBoundOnDrag}/>
                    </FunctionGraph>
                </JXGBoard>

                <JXGBoard style={{marginTop: 20}}>
                    <FunctionGraph function={this.state.function}>
                        <Integral leftBound={this.state.leftBound} rightBound={this.state.rightBound}
                                  leftBoundOnDrag={this.leftBoundOnDrag} rightBoundOnDrag={this.rightBoundOnDrag}/>
                    </FunctionGraph>
                </JXGBoard>

                <div style={{marginTop:5}}>
                    <span style={{marginLeft:5}}>f(x)= </span>
                    <input type="text" defaultValue={this.defaultEquationText} ref="equation"/>
                    <input type="button" onClick={this.updateEquation} value="Update" style={{marginLeft:5}}/>
                </div>
            </div>
        );
    }
}