//parent component, renders board and controls and connects the two
var GameOfLife = React.createClass({
    //default board and control state
    getInitialState: function(){
        return {};
    },
    render: function(){
        var style = {
            height: "100%",
            width: "100%"
        };
        return <div style={style}>
            <Board height="75" width="75" interval="250" play="true" borderSize="0"/>
            <Controls />
            </div>;
    }
});
//contains cells and game logic, accepts game parameters as props
//props include: height={int}, width={int}, play={bool}, interval={float}, borderSize={int}
var Board = React.createClass({
    getInitialState: function() {
        //todo: break status out of array and into main state for quicker speed
        var status = [];
        var size = Number(this.props.height) * Number(this.props.width);
        for (var i = 0; i < size; i++){
            status.push(Math.random() > .9);
        }
        if (this.props.play === "true") {
            //setInterval(this.update, this.props.interval);
        }
        return {width: +this.props.height, height: +this.props.height, status: status, size: size};
    },
    //increments the game of life
    update: function(){
        console.log("running update!");
        //new game of life board status
        var newStatus = [];
        //loops though previous game board and pushes the status of cells to the new board one at a time
        this.state.status.forEach(function(alive, i, status){
            var neighbors = 0;
            //determine if cell is on the top, left, right, or bottom of grid
            var top = this.state.width - i > 0;
            var left = i % this.state.width === 0;
            var right = i % this.state.width === this.state.width - 1;
            var bottom = this.state.size - i < this.state.width + 1;
            /*console.log("cell " + i + " has properties:"
                + "\n   top = " + top
                + "\n   left = " + left
                + "\n   right = " + right
                + "\n   bottom = " + bottom);*/
                //check surrounding cells from top left clockwise and increment neighbors if alive
                if (!top && !left && status[i - this.state.width - 1]){
                    neighbors++;
                }
                if (!top && status[i - this.state.width]){
                    neighbors++;
                }
                if (!top && !right && status[i - this.state.width + 1]){
                    neighbors++;
                }
                if (!right && status[i + 1]){
                    neighbors++;
                }
                if (!right && !bottom && status[i + this.state.width + 1]){
                    neighbors++;
                }
                if (!bottom && status[i + this.state.width]){
                    neighbors++;
                }
                if (!bottom && !left && status[i + this.state.width - 1]){
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
        console.log("click!");
        this.state.status[cell] = !this.state.status[cell];
        this.setState({status: this.state.status});
    },
    render: function(){
        //setTimeout(this.update, this.props.interval);
        var cells = [];
        var cellHeight = 100/this.state.height + "%";
        var cellWidth = 100/this.state.width + "%";
        for (var i = 0; i < this.state.height * this.state.width; i++) {
            cells.push(
                <Cell
                    status={this.state.status[i] ? "alive" : "dead"}
                    height={cellHeight}
                    width={cellWidth}
                    key={i}
                    index={i}
                    borderSize={this.props.borderSize}
                    handleClick={this.editCell}
                />
            )
        }
        var style = {
            width: "100%",
            height: "70%",
            fontSize: "0px",
            boxSizing: "border-box",
            borderTop: this.props.borderSize + "px solid black",
            borderRight: this.props.borderSize + "px solid black",
            backgroundColor: "black"
        };
        return <div style={style}>{cells}</div>;
    }
});
var Cell = React.createClass({
    handleClick: function(){
        console.log("click1");
        this.props.handleClick(this.props.index);
    },
    render: function(){
        var style = {
            backgroundColor: this.props.status === "alive" ? "white" : "black",
            height: this.props.height,
            width: this.props.width,
            display: "inline-block",
            boxSizing: "border-box",
            borderLeft: this.props.borderSize + "px solid black",
            borderBottom: this.props.borderSize + "px solid black",
        };
        return <div style={style} onClick={this.handleClick}/>
    }
});
var Controls = React.createClass({
    render: function(){
        return <div>controls go here</div>
    }
});
window.onload = function(){
    ReactDOM.render(
    <GameOfLife />,
    document.getElementById("container")
    );
};