//parent component, renders board and controls and connects the two
var GameOfLife = React.createClass({
    //default board and control state
    getInitialState: function(){
        return {
            height: 25,
            width: 25,
            interval: 500,
            pause: false,
            boardKey: 0,
            percentLife: 0.3
        };
    },
    //handles changes from input
    handleChange: function(event){
        var newState = {};
        
        if (event.target.name === "interval") {
            //interval is set in second and needs to be converted to milliseconds
            newState[event.target.name] = event.target.value * 1000;
        }
        else if (event.target.name === "pause") {
            newState.pause = event.target.checked;
        }
        else if (event.target.name === "randomize") {
            newState.empty = false;
            this.resetBoard();
        }
        else if (event.target.name === "clear"){
            newState.empty = true;
            this.resetBoard();
        }
        else if (event.target.name === "width"){
            newState.width = event.target.value;
            this.resetBoard();
        }
        else if (event.target.name === "height"){
            newState.height = event.target.value;
            this.resetBoard();
        }
        else if (event.target.name === "percentLife"){
            newState.percentLife = event.target.value;
        }
        this.setState(newState);
    },
    resetBoard: function(){
        this.setState({boardKey: this.state.boardKey + 1});
    },
    render: function(){
        var style = {
            height: "100%",
            width: "100%"
        };
        return <div style={style}>
            <div
                style={{height: "70%", width: "100%"}}
                
                >
                <FixedRatio
                    childComponents={(
                        <Board
                            height={this.state.height}
                            width={this.state.width}
                            interval={this.state.interval}
                            pause={this.state.pause}
                            percentLife={this.state.percentLife}
                            empty={this.state.empty}
                            key={this.state.boardKey}
                        />
                    )}
                    ratio={this.state.width/this.state.height}
                />
            </div>
            <Controls
                handleChange={this.handleChange}
                height={this.state.height}
                width={this.state.width}
                interval={this.state.interval}
                pause={this.state.pause}
                percentLife={this.state.percentLife}
                />
            </div>;
    }
});
//contains cells and game logic, accepts game parameters as props
//props include: height={int}, width={int}, play={bool}, interval={float}, borderSize={int}
var Board = React.createClass({
    getInitialState: function() {
        //set inital board update rate if game is not paused
        var interval = undefined;
        if (this.props.pause === false) {
            interval = window.setInterval(this.update, this.props.interval);
        }

        var initialCellValues = [];
        var size = this.props.height * this.props.width;
        for (var i=0; i < size; i++){
            if (!this.props.empty){
                initialCellValues.push(Math.random() < this.props.percentLife);
            }
            else {
                initialCellValues.push(false);
            }
        }

        return {status: initialCellValues, interval: interval};
    },
    //runs when prop(s) are updated
    componentWillReceiveProps: function(nextProps){
        window.clearInterval(this.state.interval);
        var newState = {};

        //if the new state isn't paused then once again set the interval
        if (nextProps.pause === false){
            newState.interval = window.setInterval(this.update, nextProps.interval);;
        }

        this.setState(newState);
    },
    //increments the game of life
    update: function(){
        //new game of life board status
        var newStatus = [];
        //loops though previous game board and pushes the status of cells to the new board one at a time
        this.state.status.forEach(function(alive, i, status){
            var neighbors = 0;
            //determine if cell is on the top, left, right, or bottom of grid
            var top = this.props.width - i > 0;
            var left = i % this.props.width === 0;
            var right = i % this.props.width === this.props.width - 1;
            var bottom = (this.props.height * this.props.width) - i < this.props.width + 1;
            /*console.log("cell " + i + " has properties:"
                + "\n   top = " + top
                + "\n   left = " + left
                + "\n   right = " + right
                + "\n   bottom = " + bottom);*/
                //check surrounding cells from top left clockwise and increment neighbors if alive
                if (!top && !left && status[i - this.props.width - 1]){
                    neighbors++;
                }
                if (!top && status[i - this.props.width]){
                    neighbors++;
                }
                if (!top && !right && status[i - this.props.width + 1]){
                    neighbors++;
                }
                if (!right && status[i + 1]){
                    neighbors++;
                }
                if (!right && !bottom && status[i + this.props.width + 1]){
                    neighbors++;
                }
                if (!bottom && status[i + this.props.width]){
                    neighbors++;
                }
                if (!bottom && !left && status[i + this.props.width - 1]){
                    neighbors++;
                }
                if (!left && status[i - 1]){
                    neighbors++;
                }
                //console.log("cell " + i + " has " + neighbors + " neighbors");
                /*
                RULES:
                +  Any live cell with fewer than two live neighbours dies, as if caused by under-population.
                +  Any live cell with two or three live neighbours lives on to the next generation.
                +  Any live cell with more than three live neighbours dies, as if by over-population.
                +  Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                following code executes rules
                */
                if (neighbors < 2){
                    newStatus.push(false);
                }
                else if (neighbors === 2){
                    if (alive){
                        newStatus.push(true);
                    }
                    else {
                        newStatus.push(false);
                    }
                }
                else if (neighbors === 3){
                    newStatus.push(true);
                }
                else {
                    newStatus.push(false);
                }
        }, this);
        this.setState({status: newStatus});
    },
    editCell: function(cell){
        this.state.status[cell] = !this.state.status[cell];
        this.setState({status: this.state.status});
    },
    componentWillUnmount: function(){
        window.clearInterval(this.state.interval);
    },
    render: function(){
        var cells = [];
        var cellHeight = 100/this.props.height + "%";
        var cellWidth = 100/this.props.width + "%";
        for (var i = 0; i < this.props.height * this.props.width; i++) {
            cells.push(
                <Cell
                    status={this.state.status[i] ? "alive" : "dead"}
                    height={cellHeight}
                    width={cellWidth}
                    key={i}
                    index={i}
                    handleClick={this.editCell}
                />
            )
        }
        var style={
            height: "100%",
            width: "100%",
            fontSize: "0px",
            cursor: "pointer"
        };
        return <div style={style}>{cells}</div>;
    }
});
//Creates a div of a given ratio (width/hight) as large as it can in the given context and then renders whatever is passed as the prop "childComponents" and it's children". Has a 200ms resize timeout for performance.
//props: include: ratio={width/height}, childComponents={compoenents to be rendered as children}
var FixedRatio = React.createClass({
    getInitialState: function(){
        return {style: {visibility: "hidden"}, domNode: undefined}
    },
    componentDidMount: function(){
        this.remeasure();
        window.addEventListener("resize", this.remeasure);
    },
    componentWillUnmount: function(){
        window.removeEventListener("resize", this.remeasure);
    },
    remeasure: function(){
        //timeout code so that we don't remeasure for every step while the window is being resized
        window.clearTimeout(this.state.remeasureTimeout);
        var remeasureTimeout = window.setTimeout(run.bind(this), 200);
        this.setState({remeasureTimeout: remeasureTimeout})
        function run(){
            //if the context ratio is wider than the target ratio
            if (this.state.domNode.offsetWidth / this.state.domNode.offsetHeight > this.props.ratio) {
                this.setState({style: {
                    height: this.state.domNode.offsetHeight + "px",
                    width: (this.state.domNode.offsetHeight * this.props.ratio) + "px",
                    margin: "auto"
                }});
            }
            else {
                this.setState({style: {
                    height: (this.state.domNode.offsetWidth / this.props.ratio) + "px",
                    width: this.state.domNode.offsetWidth,
                    paddingTop: (this.state.domNode.offsetHeight - this.state.domNode.offsetWidth / this.props.ratio) / 2
                }});
            }
        }
    },
    //if the ratio prop changes then remeasure, this is not in the "render" fuction because we do not want to remeaure when the childComponents prop changes
    componentWillReceiveProps: function(newProps){
        if (newProps.ratio !== this.props.ratio){
            console.log("working...");
            this.remeasure();
        }
    },
    updateDOMRef: function(node){
        this.setState({domNode: node});
    },
    render: function(){
        //returns a div that we will use to measure the space we have and a <div> that we will size depending on the ratio given
        return <div
                    style={{height: "100%", width: "100%"}}
                    ref={this.updateDOMRef}
                >
            <div style={this.state.style}>
                {this.props.childComponents}
            </div>
        </div>
    }
});
var Cell = React.createClass({
    //lets Board know that cell has been clicked and gives it the cell index so it knows were the click was
    handleClick: function(){
        this.props.handleClick(this.props.index);
    },
    render: function(){
        var style = {
            backgroundColor: this.props.status === "alive" ? "white" : "black",
            height: this.props.height,
            width: this.props.width,
            display: "inline-block",
        };
        return <div style={style} onClick={this.handleClick}/>
    }
});
var Controls = React.createClass({
    render: function(){
        var inputWrapStyle = {
            display: "inline-block",
            padding: "10px"
        };
        return <div style={{
                            position: "relative",
                            height: "30%",
                            fontSize: "16px",
                            overflow: "scroll"
                        }}>
            <div style={inputWrapStyle}>
                <label
                    style={{verticalAlign: "middle"}}>Refresh Delay (seconds)</label>
                <input
                    onChange={this.props.handleChange}
                    style={{verticalAlign: "middle"}}
                    type="range"
                    value={this.props.interval / 1000}
                    name="interval"
                    min="0.1"
                    max="2"
                    step="0.1"/>
                <input
                    name="interval"
                    onChange={this.props.handleChange}
                    style={{
                        verticalAlign: "middle",
                        width: "2em"
                    }}
                    type="text"
                    value={this.props.interval / 1000}
                    />
            </div>
            <div style={inputWrapStyle}>
                <label style={{verticalAlign: "middle"}}
                    >Pause</label>
                <input
                    type="checkbox"
                    style={{verticalAlign: "middle"}}
                    onChange={this.props.handleChange}
                    checked={this.props.pause}
                    name="pause"
                    />
            </div>
            <div style={inputWrapStyle}>
                <input
                    type="button"
                    onClick={this.props.handleChange}
                    name="randomize"
                    value="randomize"
                    />
            </div>
            <div style={inputWrapStyle}>
                <label
                    style={{verticalAlign: "middle"}}>Life Odds</label>
                <input
                    onChange={this.props.handleChange}
                    style={{verticalAlign: "middle"}}
                    type="range"
                    defaultValue={this.props.percentLife}
                    name="percentLife"
                    min="0"
                    max="1"
                    step="0.01"/>
                <span>{this.props.percentLife}</span>
            </div>
            <div style={inputWrapStyle}>
                <input
                    type="button"
                    onClick={this.props.handleChange}
                    name="clear"
                    value="clear"
                    />
            </div>
            <div style={inputWrapStyle}>
                <span>Width:</span>
                <input
                    type="number"
                    onChange={this.props.handleChange}
                    name="width"
                    defaultValue={this.props.width}
                    />
            </div>
            <div style={inputWrapStyle}>
                <span>Height:</span>
                <input
                    type="number"
                    onChange={this.props.handleChange}
                    name="height"
                    defaultValue={this.props.height}
                    />
            </div>
            <a
                style={{
                    margin: "auto",
                    display: "block",
                    textAlign: "center",
                    overflow: "hidden"}}
                href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
                target="_blank" >
                https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
            </a>
        </div>
    }
});
window.onload = function(){
    ReactDOM.render(
    <GameOfLife />,
    document.getElementById("container")
    );
};