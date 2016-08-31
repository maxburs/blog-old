var GameOfLife = React.createClass({
    displayName: "GameOfLife",

    getInitialState: function () {
        console.log("test");
        return {};
    },
    render: function () {
        console.log("test2");
        return React.createElement(
            "div",
            null,
            React.createElement(Board, { height: "50", width: "50" }),
            "test"
        );
    }
});
var Board = React.createClass({
    displayName: "Board",

    getInitialState: function () {
        var status = [];
        var size = Number(this.props.height) * Number(this.props.width);
        for (var i = 0; i < size; i++) {
            status.push(Math.rand > .6);
        }
        return { "width": Number(this.props.height), "height": Number(this.props.height) };
    },
    render: function () {
        console.log("state: ", this.state);
        return React.createElement(
            "div",
            null,
            "height: ",
            this.props.height,
            " width: ",
            this.props.width,
            React.createElement(Cell, { status: "alive" })
        );
    }
});
var Cell = React.createClass({
    displayName: "Cell",

    render: function () {
        return React.createElement("div", { className: "cell " + this.props.status });
    }
});
window.onload = function () {
    ReactDOM.render(React.createElement(GameOfLife, null), document.getElementById("container"));
};
//# sourceMappingURL=game-of-life.js.map
