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
    if (this.state.claims.length === 0) {
      return {
        <div>
          <div className="loading text">
            Hold on while we gather your information
          </div>
          <div className="loading-graphic">
      }
    }
    else {
      return {
        <div className="graph-container">
          <div className="progress">
          </div>
          <div className="current">
            <div className="current-text">
              Current Spend<br/>
              $50.00
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
      }

    }
  }
});
