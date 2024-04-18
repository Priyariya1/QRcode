import { useState } from 'react'
import './App.css'

function App() {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState("https://portfolio-master-self.vercel.app/");
  const [qrSize, setQrSize] = useState("150")

  async function generateQR() {
    setLoading(true);
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
      setImg(url);
    } catch (error) {
      console.error("Error generating QR code", error);
    }
    finally {
    setLoading(false);
    }
  }

  function downloadQR() { 
    fetch(img)
      .then((response)=>response.blob())
      .then((blob)=>{
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link)
        link.click();
        document.body.removeChild(link)
      })
  }
  return (
    <div className='app-container'>
      <h1>QR CODE GENERATOR</h1>
      {loading && <p>Please wait...</p>}
      {img && <img src={img} alt='QR Code' className='qr-code-image' />}
      <div>
        <lable htmlFor="dataInput" className="input-lable">
          Data for QR code:
        </lable>
        <input type='text' value={qrData}  id='dataInput' placeholder='Enter data for QR code' onChange={(e)=> setQrData(e.target.value)} />
        <lable htmlFor="sizeInput" className="input-lable">
          Image size (e.g., 150):
        </lable>
        <input type='text' value={qrSize} onChange={(e)=> setQrSize(e.target.value)}  id='sizeInput' placeholder='Enter image size' />
        <button className='generate-button' disabled={loading} onClick={generateQR}>
          Generate QR code</button>
        <button className='download-button' onClick={downloadQR}>Download QR code</button>
      </div>
      <p className='footer'>Designed by 
      <a href=''> Priya</a></p>
    </div>
  )
}


export default App
