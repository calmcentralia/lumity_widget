var React = require('react');
var ApiUtil = require('./api_util');

var Chart = React.createClass({

  getInitialState: function() {
    return {
      claims: []
      contribution: 0
    };
  },

  componentDidMount: function() {
    var that = this;
    var contribution = 0;
    var unique = {};
    ApiUtil.getRxClaims(function(claims) {
      claims.forEach(function(claim) {
        if(typeof(unique[claim.description+claim.filledDate]) == "undefined") {
          unique[claim.description+claim.filledDate] = true;
          contribution += claim.amountMemberPaid;
        }
      }
      that.setState({ claims: claims, contribution: contribution});
    });
  },

  render: function() {
    var leftToGo = 1000 - this.state.contribution;
    if(leftToGo < 0) {
      leftToGo = 0
    }
    var progressStyle = {
      width: (this.state.contribution / 6350) * 100 + "%",
      opacity: 1
    }

    var currentStyle = {
      left: "calc(" this.state.contribution + "% - 39px)";
    }
    if (this.state.claims.length === 0) {
      return {
        <div>
          <div className="loading-text">
            Hold on while we gather your information
          </div>
          <div className="loader">
          </div>
        </div>
      }
    }
    else {
      return {
        <div className="chart-component">
          <div className="headline">
          You have ${leftToGo} to spend before you reach your Deductible
          </div>
          <div className="graph-container">
            <div className="progress" style={progressStyle}>
            </div>
            <div className="current" style={currentStyle}>
              <div className="current-text">
                Current Spend<br/>
                ${this.state.contribution}
              </div>
              <div className="current-arrow">
              </div>
            </div>
            <div className="deductible">
              <div className="deductible-arrow">
              </div>
              <div className="deductible-text">
                Annual Deductible <br/>
                Set By Insurer <br/>
                $1,000
              </div>
            </div>
            <div className="max">
              <div className="max-arrow">
              </div>
              <div className="max-text">
                Out-of-Pocket <br/>
                Maximum <br/>
                $6,350
              </div>
            </div>
          </div>
        </div>
      }

    }
  }
});

module.exports = Chart;
