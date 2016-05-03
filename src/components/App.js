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
        this.state = {
            leftBound: -2,
            rightBound: 1,
            function: nerdamer("x^2 + 4x + 4").buildFunction()
        };
        this.antiderivativeFunc = mathutil.createAntiderivative(this.state.function);

        this.leftBoundOnDrag = this.leftBoundOnDrag.bind(this);
        this.rightBoundOnDrag = this.rightBoundOnDrag.bind(this);
        this.updateEquation = this.updateEquation.bind(this);
    }
aqz
    leftBoundOnDrag(glider){
        this.setState({leftBound: glider.X()});
    }

    rightBoundOnDrag(glider){
        this.setState({rightBound: glider.X()});
    }

    updateEquation(){
        console.log(this.refs.equation.value);
        var func =  nerdamer(this.refs.equation.value).buildFunction();
        this.antiderivativeFunc =  mathutil.createAntiderivative(func);
        this.setState({function: func});
    }

    render() {
        return (
            <div>
                <JXGBoard>
                    <FunctionGraph function={this.antiderivativeFunc}>
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
                    <input type="text" defaultValue="x^2 + 4x + 4" ref="equation"/>
                    <input type="button" onClick={this.updateEquation} value="Update" style={{marginLeft:5}}/>
                </div>
            </div>
        );
    }
}