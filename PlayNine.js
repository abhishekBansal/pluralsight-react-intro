var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

const Stars = (props) => {
	return (
  	<div className="col-5">
    	{
      	_.range(props.numberOfStars).map(i =>
        	<i key ={i} className="fa fa-star"/>
      	)
      }
    </div>
  );
}

const Button = (props) => {
	let button;

  switch(props.answerIsCorrect) {
    	case true:
      button =
      <button className="btn btn-sucess" onClick={props.acceptAnswer}>
      <i className="fa fa-check"></i>
      </button>;
      break;

      case false:
      button =
      <button className="btn btn-danger" >
      <i className="fa fa-times"></i>
      </button>;
      break;

      case null:
      button =
        <button className="btn"
        onClick={props.checkAnswer}
        disabled={props.selectedNumbers.length === 0}>=</button>;
      break;
  }

	return (
  	<div className="col-2 text-center">
    	{button}
      <br/> <br/>
      <button className="btn btn-warning btn-sm" onClick={props.redraw} disabled={props.redrawCount == 0}>
      	<i className="fa fa-refresh">{props.redrawCount}</i>
      </button>
    </div>
  );
};

const Answers = (props) => {
	return (
  	<div className="col-5">
      {props.selectedNumbers.map((number, i) =>
      	<span key={i}
        	onClick={() => props.unselectNumber(number)}>
          {number}
        </span>
     	)}
    </div>
  );
}

const DoneFrame = (props) => {
	return (
  	<div className="col-5 center text-center">
      <h3>{props.doneStatus}</h3>
    </div>
  );
}


const Numbers = (props) => {
	const numberClassName = (number) => {
    if(props.usedNumbers.indexOf(number) >= 0) {
    	return 'used';
    }
  	if(props.selectedNumbers.indexOf(number) >= 0) {
    	return 'selected';
    }
  }

	return (
  	<div className="card text-center">
    	<div>
      	{Numbers.list.map((number, i) =>
        	<span key={i} className={numberClassName(number)}
          				onClick={() => props.selectNumber(number)}>
          	{number}
          </span>
        )}
    	</div>
    </div>
  );
}
// we can do this because of lowdash library
Numbers.list = _.range(1, 10);

class Game extends React.Component {
	static randomNumber = () => {
  	return 1 + Math.floor(Math.random() * 9);
  }
	state = {
  	selectedNumbers: [],
    randomNumberOfStars: Game.randomNumber(),
    answerIsCorrect: null,
    usedNumbers: [],
    redraws: 5,
    doneStatus: null
  };

  selectNumber = (clickedNumber) => {
  		if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) {
      	return;
      }

      if (this.state.usedNumbers.indexOf(clickedNumber) >= 0) {
      	return;
      }

      this.setState(prevState => ({
      		answerIsCorrect: null,
          selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
      }));
  };

  unselectNumber = (clickedNumber) => {
  	this.setState(prevState => ({
    	answerIsCorrect: null,
    	selectedNumbers: prevState.selectedNumbers
      													.filter(number => number != clickedNumber)
    }));
  };

  checkAnswer = () => {
  	this.setState(prevState => ({
      answerIsCorrect: prevState.randomNumberOfStars ===
      			prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }));
  };

  acceptAnswer = () => {
  	this.setState(prevState => ({
    	usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      randomNumberOfStars: Game.randomNumber(),
      answerIsCorrect: null
    }), this.updateDoneStatus);
  }

  redraw = () => {
  	if(this.state.redraws === 0) {
    	return;
    }

    this.setState(prevState => ({
        selectedNumbers: [],
        randomNumberOfStars: Game.randomNumber(),
        answerIsCorrect: null,
        redraws: prevState.redraws - 1
      }), this.updateDoneStatus);
  }

  possibleSolutions = ({randomNumberOfStars, usedNumbers}) => {
  	const possibleNumbers = _.range(1, 10).filter(number =>
    															usedNumbers.indexOf(number) === -1);
		return possibleCombinationSum(possibleNumbers, randomNumberOfStars);
  }

  updateDoneStatus = () => {
  	this.setState(prevState => {
    	if(prevState.usedNumbers.length == 9) {
      	return {doneStatus: "You Won, Great!!"};
      }

      if(prevState.redraws == 0 && !this.possibleSolutions(prevState)) {
      	return {doneStatus: "You Loose, Better Luck Next Time!"};
      }
    });
  }

	render () {
  	return (
    	<div className="container">
      	 <h3>Play Nine </h3>
         <hr/>
         <div className="row">
           <Stars numberOfStars={this.state.randomNumberOfStars}/>
           <Button selectedNumbers={this.state.selectedNumbers}
           				 answerIsCorrect={this.state.answerIsCorrect}
                   checkAnswer={this.checkAnswer}
                   acceptAnswer={this.acceptAnswer}
                   redraw={this.redraw}
                   redrawCount={this.state.redrawCount}/>
           <Answers selectedNumbers={this.state.selectedNumbers}
           					unselectNumber={this.unselectNumber}/>
         </div>
         <br />
          {this.state.doneStatus?
          	<DoneFrame doneStatus={this.state.doneStatus}/> :
        		<Numbers selectedNumbers={this.state.selectedNumbers}
         					selectNumber={this.selectNumber}
                  usedNumbers={this.state.usedNumbers}/>
          }
     	</div>
    );
  }
}

class App extends React.Component {
	render () {
  	return (
    	<div>
       <Game />
     	</div>
    );
  }
}

ReactDOM.render(<App />, mountNode);
