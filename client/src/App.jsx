import React, { useState, useRef } from 'react';
import ShareFile from './ShareFile';
import './App.scss';

function App() {
  const [shareFile, setShareFile] = useState(false)
  const [activeDragClass, setActiveDragClass] = useState(false)
  const [dragSpanContent, setDragSpanContent] = useState('Drag & Drop')
  const fileRef = useRef(null);
  const inputFile = useRef(null);
  const handleFileRef = (e) => {
    fileRef.current = inputFile.current.files[0]
    setShareFile(true)
  }
  const handleBrowseClick = () => {
    inputFile.current.click()
  }
  const handleDragOver = (e) => {
    e.preventDefault()
    setDragSpanContent('Release to upload')
    setActiveDragClass(true)
  }

  const handleDragLeave = (e) => {
    setDragSpanContent('Drag & Drop')
    setActiveDragClass(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    fileRef.current = e.dataTransfer.files[0]
    setShareFile(true)
  }
  
  return (
    <div className="drag_component_container">
      <h3 className="drag_title">Upload your file:</h3>
        <div className={`drag_component ${activeDragClass ? "active" : ""}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      {shareFile ?
        <ShareFile file={fileRef} /> : (
          <>
              <span className="drag_main_text">{dragSpanContent}</span>
              <span className="drag_main_text">or <span className='drag_browse_btn' onClick={handleBrowseClick}>browse</span></span>
              <input type="file" className="drag_input_file" onChange={handleFileRef} ref={inputFile} hidden />
              <span className="drag_supports">Supports: Everything</span>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
