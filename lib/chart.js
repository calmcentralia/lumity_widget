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
        
      }
    }
  }


});
