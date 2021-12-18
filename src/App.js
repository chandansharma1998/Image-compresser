import './App.css';
import { useState } from 'react';
import imageCompression from 'browser-image-compression';

function App() {
  const [origImg, setOrigImg] = useState('');
  const [origImgUrl, setOrigImgUrl] = useState('');
  const [compressedImg, setCompressedImg] = useState('');
  const [compressedImgUrl, setCompressedImgUrl] = useState('');

  const [fileName, setFileName] = useState('');

  const handleImageUpload = (e) => {
    //console.log(e.target.files[0]);
    const image = e.target.files[0];
    setFileName(image.name);
    setOrigImg(image);
    setOrigImgUrl(URL.createObjectURL(image));
  };

  const handleCompressImg = async (e) => {
    e.preventDefault();

    if (origImg / 2048 <= 0.5) {
      alert('Upload bigger image');
      return;
    }

    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };

    try {
      const compressed = await imageCompression(origImg, options);

      setCompressedImg(compressed);
      setCompressedImgUrl(URL.createObjectURL(compressed));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="heading">React Image Compresser</div>
      <input
        className="upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      <div className="body">
        <div className="left">
          {origImg && (
            <>
              <img className="origPic" src={origImgUrl}></img>
            </>
          )}
          {origImg && (
            <>
              <button onClick={handleCompressImg}>Compress</button>
            </>
          )}
        </div>

        <div className="right">
          {compressedImg && (
            <>
              <img className="origPic" src={compressedImgUrl}></img>
            </>
          )}
          {compressedImg && (
            <>
              <button>
                <a href={compressedImgUrl} download={fileName}>
                  Download
                </a>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
