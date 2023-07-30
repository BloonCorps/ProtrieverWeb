import React from 'react';

class DataTable extends React.Component {
  render() {
    const { data } = this.props;

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>ID</th>
            <th>Name</th>
            <th>Annotation</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
              <td>{row[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default DataTable;

