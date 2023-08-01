import React, { useState } from 'react';
import './DropdownMenu.css';

const DropdownMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const alphabetRanges = [
    'A-B', 'C-D', 'E-F', 'G-I', 'J-L', 'M-O', 
    'P-R', 'S-U', 'V-X', 'Y-Z', '#'
  ];

  const handleClick = (range) => {
    props.onSelect(range);
    setIsOpen(!isOpen); 
  }

  return (
    <div className="dropdown" style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <button className="btn btn-warning dropdown-toggle" style={{ marginBottom: '8px', marginTop: "-8px" }} onClick={() => setIsOpen(!isOpen)}>
            Select Range
        </button>
        {isOpen &&
            <ul className="dropdown-menu" style={{
                position: 'absolute',
                display: 'block',
            }}>
                {alphabetRanges.map((range, index) => (
                    <li className="dropdown-item" key={index}>
                        <a
                            href="#!"
                            onClick={(event) => {
                                event.preventDefault();
                                handleClick(range);
                            }}
                        >
                            {range}
                        </a>
                    </li>
                ))}
            </ul>
        }
    </div>
    );
}

export default DropdownMenu;
