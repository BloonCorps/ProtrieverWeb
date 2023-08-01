import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import AppContext from '../AppContext';

class PlotComponent extends Component {
  static contextType = AppContext;

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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.context.selectedDomains !== snapshot) {
      this.forceUpdate();
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    return this.context.selectedDomains;
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
    console.log('Rendering PlotComponent'); // Let's log every render of PlotComponent

    const { data, onHover } = this.props;
    const { selectedDomains } = this.context; // Get selectedDomains from context
    const { layout } = this.state;

    const colors = data.map((point, index) => selectedDomains.includes(index) ? 'red' : 'black');
    console.log('Selected Domains in plot component:', selectedDomains); // Add this line
      
    return (
        <Plot
        data={[
            {
            x: data.map(point => point.t_sne[0]),
            y: data.map(point => point.t_sne[1]),
            mode: 'markers',
            type: 'scattergl',
            marker: {size: 5, color: colors, opacity: 0.2} 
            }
        ]}
        layout={layout}
        config={{ displayModeBar: true, scrollZoom: true }} // Make the modebar always visible
        onHover={onHover}
        onRelayout={this.handleRelayout}
        onClick={this.props.onClick}
        />
    );
  }
}

export default PlotComponent;

