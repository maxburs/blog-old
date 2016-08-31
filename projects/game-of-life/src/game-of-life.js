var GameOfLife = React.createClass({
    getInitialState: function(){
        console.log("test");
        return {};
    },
    render: function(){
        console.log("test2");
        return <div><Board height="50" width="50"/>test</div>;
    }
});
var Board = React.createClass({
    getInitialState: function() {
        var status = [];
        var size = Number(this.props.height) * Number(this.props.width);
        for (var i = 0; i < size; i++){
            status.push(Math.rand > .6);
        }
        return {"width": Number(this.props.height), "height": Number(this.props.height)};
    },
    render: function(){
        console.log("state: ", this.state);
        return <div>height: {this.props.height} width: {this.props.width}
            <Cell status="alive" />
            </div>;
    }
});
var Cell = React.createClass({
    render: function(){
        return <div className={"cell " + this.props.status} />
    }
});
window.onload = function(){
    ReactDOM.render(
    <GameOfLife />,
    document.getElementById("container")
    );
};