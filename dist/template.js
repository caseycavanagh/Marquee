/** @jsx React.DOM */
/**
 * @jsx React.DOM
 */
(function() {

    var keyCodes = {
        left: 37,
        right: 39
    };

    var Marquee = React.createClass({displayName: 'Marquee',
        getInitialState: function() {
            return {
                shows: []
            }
        },

        componentDidMount: function() {
            var self = this;
            $.get(this.props.source, function(result) {
                self.setState({
                    shows: result
                })
            });
        },

        render: function() {
            var self = this;
            var defaultValue;
            return  (
                MarqueeShow( {shows:this.state.shows} )
            );
        }
    });

    var MarqueeShow = React.createClass({displayName: 'MarqueeShow',

        render: function() {
            var self = this;
            var show = this.props.shows.map(function( show, i ) {
                return (
                    React.DOM.div( {className:i == self.props.shows.length - 1 ? "show" : "show is-hidden", key:i}, 
                        React.DOM.div( {className:"show-meta"}, 
                            React.DOM.span(null, show.date.month, " ", show.date.day),", ", React.DOM.time( {className:"show-meta"}, show.time)
                        ),
                        React.DOM.h1( {dangerouslySetInnerHTML:{__html: show.title}} ),
                        React.DOM.h2( {dangerouslySetInnerHTML:{__html: show.location}} )
                    )
                )
            });
            return (
                React.DOM.div( {className:"show-cont"}, 
                    show
                )
            )
        }
    });

    React.renderComponent(
        Marquee( {source:"/data/data.json"} ),
        document.getElementById('container')
    );
})();
