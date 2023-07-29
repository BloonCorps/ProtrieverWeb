import React, { useState, useContext } from 'react';
import './MenuLayout.css';
import DropdownMenu from './DropdownMenu';
import AppContext from './AppContext';

const MenuLayout = () => {
  const { selectedDomains, onSelectDomain } = useContext(AppContext); // Moved inside the component
  const functionalDomains = ["PDZ Domain"]
  const motifs = ['ITIM', 'Immunoreceptor Tyrosine-based Activation Motif', 'Zinc Finger', 'Activation Loop', 'Beta-Strand'];

  const [activeTab, setActiveTab] = useState('Functional Domains');
  const [selectedRange, setSelectedRange] = useState(null);  

  const handleSelect = (range) => {
    setSelectedRange(range);
  };

  const filterByRange = (item) => {
    if (!selectedRange) return true;

    const [start, end] = selectedRange.split('-');

    if (selectedRange === '#') return !item[0].match(/[a-z]/i);

    return item[0].toUpperCase() >= start && item[0].toUpperCase() <= end;
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
                <input type="checkbox" id={`domain-${index}`} />
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
                        <input type="checkbox" id={`motif-${index}`} />
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




