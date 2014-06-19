/**
 * @jsx React.DOM
 */
(function() {

    var keyCodes = {
        left: 37,
        right: 39
    };

    var Marquee = React.createClass({
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
                <MarqueeShow shows={this.state.shows} />
            );
        }
    });

    var MarqueeShow = React.createClass({

        render: function() {
            var show = this.props.shows.map(function( show, i ) {
                return (
                    <div className={i == 0 ? "show" : "show is-hidden"} key={i}>
                        <div className="show-meta">
                            <span>{show.date.month} {show.date.day}</span>, <time className="show-meta">{show.time}</time>
                        </div>
                        <h1 dangerouslySetInnerHTML={{__html: show.title}} />
                        <h2 dangerouslySetInnerHTML={{__html: show.location}} />
                    </div>
                )
            });
            return (
                <div className="show-cont">
                    {show}
                </div>
            )
        }
    });

    React.renderComponent(
        <Marquee source="/data/data.json" />,
        document.getElementById('container')
    );
})();
