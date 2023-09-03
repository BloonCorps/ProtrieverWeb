import React, { useState, useEffect, useContext } from 'react';
import './MenuLayout.css';
import DropdownMenu from './DropdownMenu';
import AppContext from '../AppContext';

const backend = process.env.REACT_BACKEND_DOMAIN;

const MenuLayout = () => {
  const { selectedDomains, onSelectDomain, updateSelectedDomains } = useContext(AppContext);
  const [functionalDomains, setFunctionalDomains] = useState([]);
  const [motifs, setMotifs] = useState([]);

  const [activeTab, setActiveTab] = useState('Functional Domains');
  const [selectedRange, setSelectedRange] = useState(null);
  const [checkedDomains, setCheckedDomains] = useState({});
  const [checkedMotifs, setCheckedMotifs] = useState({});

  useEffect(() => {
    fetch('http://${domain}.org:8000/api/domains_list/')
      .then(response => response.json())
      .then(data => {
        if (data.domains) {
          setFunctionalDomains(data.domains);
        }
        if (data.motifs) {
          setMotifs(data.motifs);
        }
      })
      .catch(err => {
        console.error('Error fetching data: ', err);
      });
  }, []);

  const handleSelect = (range) => {
    setSelectedRange(range);
  };

  const filterByRange = (item) => {
    if (!selectedRange) return true;
    const [start, end] = selectedRange.split('-');
    if (selectedRange === '#') return !item[0].match(/[a-z]/i);
    return item[0].toUpperCase() >= start && item[0].toUpperCase() <= end;
  };

  const handleCheckboxChange = async (event, type) => {
    const item = event.target.value;
    if (event.target.checked) {
      await onSelectDomain(item);
      if (type === 'domain') {
        setCheckedDomains(prevState => ({...prevState, [item]: true}));
      } else if (type === 'motif') {
        setCheckedMotifs(prevState => ({...prevState, [item]: true}));
      }
    } else {
      const response = await fetch(`http://${backend}.org:8000/api/domains/?name=${item}`);
      const result = await response.json();
      const indices = result.indices;

      if (Array.isArray(indices)) {
        const updatedDomains = selectedDomains.filter(index => !indices.includes(index));
        updateSelectedDomains(updatedDomains);
      }

      if (type === 'domain') {
        setCheckedDomains(prevState => ({...prevState, [item]: false}));
      } else if (type === 'motif') {
        setCheckedMotifs(prevState => ({...prevState, [item]: false}));
      }
    }
  };

  return (
    <div className="menu-layout">
      <div className="tabs">
        <button 
          className={activeTab === 'Functional Domains' ? 'active' : ''} 
          onClick={() => setActiveTab('Functional Domains')}
        >
          Domains
        </button>
        <button 
          className={activeTab === 'Motifs' ? 'active' : ''} 
          onClick={() => setActiveTab('Motifs')}
        >
          Motifs
        </button>
      </div>
      <div className="content-container">
        {activeTab === 'Functional Domains' && 
          <div className="checkboxes">
            <div className="dropdown-container">
              <DropdownMenu onSelect={handleSelect} />
            </div>
            {functionalDomains.filter(filterByRange).map((domain, index) => (
              <div key={index} className="checkbox-container">
                <input 
                  type="checkbox" 
                  id={`domain-${index}`} 
                  value={domain}
                  checked={checkedDomains[domain] || false}
                  onChange={(event) => handleCheckboxChange(event, 'domain')} 
                />
                <label htmlFor={`domain-${index}`}>{domain}</label>
              </div>
            ))}
          </div>
        }
        {activeTab === 'Motifs' && 
          <div className="checkboxes">
            <div className="dropdown-container">
              <DropdownMenu onSelect={handleSelect} /> 
            </div>
            {motifs.filter(filterByRange).map((motif, index) => (
              <div key={index} className="checkbox-container">
                <input 
                  type="checkbox" 
                  id={`motif-${index}`} 
                  value={motif}
                  checked={checkedMotifs[motif] || false}
                  onChange={(event) => handleCheckboxChange(event, 'motif')} 
                />
                <label htmlFor={`motif-${index}`}>{motif}</label>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default MenuLayout;







