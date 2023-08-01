import React from 'react';

class DataTable extends React.Component {

  downloadCSV = () => {
    const { data } = this.props;
    let csvContent = "Rank,ID,Name,Annotation\n";

    data.forEach(item => {
      csvContent += `${item[0]},${item[1]},${item[2]},${item[3]}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link); // Required for Firefox
  }

  render() {
    const { data } = this.props;

    return (
      <div>
        <button onClick={this.downloadCSV}>Download CSV</button>
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
      </div>
    );
  }
}

export default DataTable;

