import React, { Component, PureComponent } from 'react';
import Plot from 'react-plotly.js';
import AppContext from '../AppContext';
import _ from 'lodash'; // import lodash

class PlotComponent extends PureComponent {
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
        showlegend: false,  // Add this line
      }
    };
  }

  handleHover = _.debounce((event) => {
    if (event.points && event.points.length > 0) {
      const originalIndex = event.points[0].customdata; // Use the original index here
      this.props.onHover(event, originalIndex); // Pass the original index to the parent using onHover prop
    }
  }, 300);  
  
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
    const { data } = this.props;
    const { selectedDomains } = this.context; // Get selectedDomains from context
    const { layout } = this.state;

    // Add an originalIndex property to each point
    const indexedData = data.map((point, index) => ({ ...point, originalIndex: index }));

    // Separate the selected points and the non-selected points
    const selectedPoints = indexedData.filter((_, index) => selectedDomains.includes(index));
    const nonSelectedPoints = indexedData.filter((_, index) => !selectedDomains.includes(index));

    return (
        <Plot
        data={[
            // First trace: non-selected points, in black
            {
              x: nonSelectedPoints.map(point => point.t_sne[0]),
              y: nonSelectedPoints.map(point => point.t_sne[1]),
              mode: 'markers',
              type: 'scattergl',
              marker: {size: 5, color: 'black', opacity: 0.2},
              customdata: nonSelectedPoints.map(point => point.originalIndex) // Use the original indices here
            },
            // Second trace: selected points, in red
            {
              x: selectedPoints.map(point => point.t_sne[0]),
              y: selectedPoints.map(point => point.t_sne[1]),
              mode: 'markers',
              type: 'scattergl',
              marker: {size: 8, color: 'red', opacity: 0.50},
              customdata: selectedPoints.map(point => point.originalIndex) // Use the original indices here
            }
        ]}
        layout={layout}
        config={{ displayModeBar: true, scrollZoom: true }} // Make the modebar always visible
        onHover={this.handleHover} // Here, we're passing handleHover as the onHover prop
        onRelayout={this.handleRelayout}
        onClick={this.props.onClick}
        />
    );
  }  
}  

export default PlotComponent;

