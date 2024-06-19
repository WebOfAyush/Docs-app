import React from 'react';
import './card.css';
import { FaRegFileAlt } from 'react-icons/fa';
import { IoIosClose, IoIosDownload } from 'react-icons/io';
import { motion } from 'framer-motion';

function Card({ file, reference, index, array }) {
  function handleClose(i) {
    let copy = [...array.data];
    copy.splice(i, 1);
    array.setdata(copy);
  }

  function handleDownload() {
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  const formatSize = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    } else if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    } else {
      return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
    }
  };

  return (
    <motion.div drag dragConstraints={reference} whileDrag={{ scale: 1.2 }} className="card">
      <div className="main-card">
        <FaRegFileAlt className="file" />
        <p className="desc">{file.name}</p>
        <div className="footer">
          <div className="detail">
            <h5 className="size">{formatSize(file.size)}</h5>
            <IoIosClose className="close" onClick={() => handleClose(index)} />
          </div>
          <div className="download" onClick={handleDownload}>
            <h1>Download</h1>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Card;
