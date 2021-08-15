import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import axiosInstance from '../utils/axios';
import LinearProgressWithLabel from './ProgressScreen';

function FileUploadScreen() {
    const [file, setFile] = useState('');
    const [isHidden, setIsHidden]=useState(true);
    const [progress, setProgress] = useState(0);
    const handleUpload = async () => {
            setProgress(0);
            setIsHidden(false)
            const formData = new FormData();
            formData.append("file", file);
            formData.append('name','mahadev')
            console.log(formData.getAll('name'))
            await axiosInstance.post("/upload_file", formData
                
            ).then((res)=>{
                console.log(res.data)
            }).catch((err)=>{
                console.log(err)
            })
    }
    return (
        <div style={{ margin: 50 }}>
            <input type="file" name="file" id="" onChange={(event) => { setFile(event.target.files[0]) }} />
            <Button color='primary' onClick={handleUpload} variant='contained' >Upload</Button>
            {isHidden ? "" : <LinearProgressWithLabel value={progress} />}
        </div>
    )
}

export default FileUploadScreen;
