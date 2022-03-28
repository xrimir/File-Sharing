import React, {useRef} from 'react';
import axios from 'axios';
import './ShareFile.scss';
function ShareFile({ file }) {
    let pRef = useRef(null)
    const handleFileUpload = () => {
        let formdata = new FormData();
        formdata.append('file', file.current)
        axios({
            method: 'post',
            url: 'http://127.0.0.1:3000/upload/',
            headers: {
                'Content-type': 'multipart/form-data'
            },
            data: formdata
        }).then((res) => {
            pRef.current.textContent = `http://localhost:3000/show/${res['data']['message']}`
        })
    }
    return (
        <div className="share_container">
            <span>{file.current.name}</span>
            <span>{file.current.size}</span>
            <span>{file.current.type}</span>
            <button className="share_btn"onClick={handleFileUpload}>SHARE</button>
            <p ref={pRef}></p>
        </div>
    );
}

export default ShareFile;