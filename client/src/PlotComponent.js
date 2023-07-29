import React, { PureComponent } from 'react';
import Plot from 'react-plotly.js';

class PlotComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      layout: {
        width: props.plotWidth,
        height: props.plotHeight,
        hovermode: 'closest',
        dragmode: 'pan',
        autosize: true,
      }
    };
  }

  componentDidMount() {
    this.setState({
      layout: {
        ...this.state.layout,
        margin: {
          l: this.props.plotWidth * 0.06, // Left margin
          r: this.props.plotWidth * 0.06, // Right margin
          b: this.props.plotHeight * 0.06, // Bottom margin
          t: this.props.plotHeight * 0.06, // Top margin
          pad: 10 // Padding
        }
      }
    });
  }

  handleRelayout = (layoutChange) => {
    this.setState((prevState) => ({
      layout: {
        ...prevState.layout,
        ...layoutChange,
      },
    }));
  };

  render() {
    const { data, onHover } = this.props;
    const { layout } = this.state;

    return (
      <Plot
        data={[
          {
            x: data.map(point => point.t_sne[0]),
            y: data.map(point => point.t_sne[1]),
            mode: 'markers',
            type: 'scattergl',
            marker: {size: 5, color: 'black', opacity: 0.2} 
          }
        ]}
        layout={layout}
        config={{ displayModeBar: true, scrollZoom: true }} // Make the modebar always visible
        onHover={onHover}
        onRelayout={this.handleRelayout}
        onClick = {this.props.onClick}
      />
    );
  }
}

export default PlotComponent;


