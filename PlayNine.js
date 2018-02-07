// repl link
// https://jscomplete.com/repl/?j=Sk_HibkIG
const Stars = (props) => {
	const numberOfStars = 1 + Math.floor(Math.random() * 9);

	return (
  	<div className="col-5">
    	{
      	_.range(numberOfStars).map(i =>
        	<i key ={i} className="fa fa-star"/>
      	)
      }
    </div>
  );
}

const Button = (props) => {
	return (
  	<div className="col-2">
    	<button>=</button>
    </div>
  );
}

const Answers = (props) => {
	return (
  	<div className="col-5">
      {props.selectedNumbers.map((number, i) =>
      	<span key={i}>{number}</span>
     	)}
    </div>
  );
}

const Numbers = (props) => {
	const numberClassName = (number) => {
  	if(props.selectedNumbers.indexOf(number) >= 0) {
    	return 'selected';
    }
  }
	return (
  	<div className="card text-center">
    	<div>
      	{
        Numbers.list.map((number, i) =>
        	<span key={i} className={numberClassName(number)}>{number}</span>)
        }
    	</div>
    </div>
  );
}
// we can do this because of lowdash library
Numbers.list = _.range(1, 10);

class Game extends React.Component {
	state = {
  	selectedNumbers: [5, 7]
  };

	render () {
  	return (
    	<div className="container">
      	 <h3>Play Nine </h3>
         <hr/>
         <div className="row">
           <Stars/>
           <Button/>
           <Answers selectedNumbers={this.state.selectedNumbers}/>
         </div>
         <br />
         <Numbers selectedNumbers={this.state.selectedNumbers}/>
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
//////////////////////////////////////////  CSS
.mountNode {
  color: #333;
}

.fa-star {
	margin: 0.5em;
  font-size: 24px;
}

span {
	display: inline-block;
  margin: 0.5em;
  text-align: center;
  background-color: #ccc;
  width: 24px;
  border-radius: 50%;
  cursor: pointer;
}

.selected {
	background-color: #eee;
  color: #ddd;
  cursor: not-allowed;
}

.used {
	background-color: #aaddaa;
  color: #99bb99;
  cursor: not-allowed;
}
