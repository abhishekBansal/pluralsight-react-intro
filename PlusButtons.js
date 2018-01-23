// Write JavaScript here and press Ctrl+Enter to execute
class Button extends React.Component {
 render () {
 	return (
   <button onClick={() => this.props.onClickFunction(this.props.incrementAmount)}>
   +{this.props.incrementAmount}
   </button>
  )
 }
}

const Result = (props) => {
	return (
  	<div>{props.counter}</div>
  )
}

class App extends React.Component {

	state = {counter: 1};

  incrementCounter = (incrementAmount) => {
    this.setState((prevState) => ({
        counter: prevState.counter + incrementAmount
    }));
  }

	render () {
		return (
    	<div>
      <Button incrementAmount = {1} onClickFunction = {this.incrementCounter}/>
      <Button incrementAmount = {5} onClickFunction = {this.incrementCounter}/>
      <Button incrementAmount = {10} onClickFunction = {this.incrementCounter}/>
      <Button incrementAmount = {100} onClickFunction = {this.incrementCounter}/>
      <Result counter={this.state.counter}/>
      </div>
    )
	}
}

ReactDOM.render(<App/>, mountNode)
