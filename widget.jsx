var React = require('react');
var ReactDOM = require('react-dom');
var Chart = require('./lib/chart.jsx');

var App = React.createClass({
  render: function () {
    return(
      <div>
        <Chart />
      </div>
    );
  }
});

document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<App />, document.getElementById('main'));
});
