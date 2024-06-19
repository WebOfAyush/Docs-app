import React, { useRef, useState } from 'react';
import Card from './card.jsx';
import './foreground.css';
import { IoIosAdd } from 'react-icons/io';

function Foreground() {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setdata] = useState([]);
  const ref = useRef(null);

  const handleAdd = () => {
    setIsOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const file = formData.get('file');
    const fileSize = file.size;
    let sizeFormatted;
    if (fileSize < 1024) {
      sizeFormatted = `${fileSize} B`;
    } else if (fileSize < 1024 * 1024) {
      sizeFormatted = `${(fileSize / 1024).toFixed(2)} KB`;
    } else if (fileSize < 1024 * 1024 * 1024) {
      sizeFormatted = `${(fileSize / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      sizeFormatted = `${(fileSize / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
    setdata([...data, { file, size: sizeFormatted }]);
    setIsOpen(false);
    form.reset();
  };

  return (
    <div ref={ref} className="foreground">
      <div className="add-button">
        <button onClick={handleAdd} className="input-button"><IoIosAdd/></button>
      </div>
      {isOpen && (
        <div className="form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="fileInput" className="label-file">Add File:</label>
            <input id="fileInput" name="file" type="file" className="input-file" />
            <input type="submit" className="input-submit" value="Submit" />
          </form>
        </div>
      )}

      {data.map((item, index) => {
        return <Card file={item.file} reference={ref} key={index} index={index} array={{ data, setdata }} />;
      })}
    </div>
  );
}

export default Foreground;
