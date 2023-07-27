import React, { PureComponent } from 'react';
import Plot from 'react-plotly.js';

class PlotComponent extends PureComponent {
  render() {
    // Deconstruct props for readability
    const { data, onHover, plotWidth, plotHeight } = this.props;
    
    return (
      <Plot
        data={[
          {
            x: data.map(point => point.x),
            y: data.map(point => point.y),
            mode: 'markers',
            type: 'scatter',
            marker: {size: 10}
          },
        ]}
        layout={{
          width: plotWidth,
          height: plotHeight,
          hovermode: 'closest',
        }}
        config={{ scrollZoom: true }}
        onHover={onHover}
      />
    );
  }
}

export default PlotComponent;
