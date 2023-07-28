import React, { useState } from 'react';
import './ProteinPage.css';

const ProteinPage = ({proteinData}) => {
  const [visibleColumns, setVisibleColumns] = useState(['rank', 'id', 'name', 'annotation']);  // initially, all columns are visible

  const toggleColumn = columnName => {
    if (visibleColumns.includes(columnName)) {
      setVisibleColumns(visibleColumns.filter(column => column !== columnName));
    } else {
      setVisibleColumns([...visibleColumns, columnName]);
    }
  };

  return (
    <div>
      <div className="checkbox-group">
        <label>
          <input type="checkbox" checked={visibleColumns.includes('rank')} onChange={() => toggleColumn('rank')} />
          Rank
        </label>
        <label>
          <input type="checkbox" checked={visibleColumns.includes('id')} onChange={() => toggleColumn('id')} />
          ID
        </label>
        <label>
          <input type="checkbox" checked={visibleColumns.includes('name')} onChange={() => toggleColumn('name')} />
          Name
        </label>
        <label>
          <input type="checkbox" checked={visibleColumns.includes('annotation')} onChange={() => toggleColumn('annotation')} />
          Annotation
        </label>
      </div>
      
      <div className='protein-table'>
          <div className='table-row'>
            {visibleColumns.includes('rank') && <div className='table-cell'>{proteinData.rank}</div>}
            {visibleColumns.includes('id') && <div className='table-cell'>{proteinData.id}</div>}
            {visibleColumns.includes('name') && <div className='table-cell'>{proteinData.name}</div>}
            {visibleColumns.includes('annotation') && <div className='table-cell'>{proteinData.annotation}</div>}
          </div>
      </div>
    </div>
  );
};

export default ProteinPage;

