import "./QRCodePage.css";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import API_URL from "../config/api";

function QRCodePage() {
  const { id } = useParams();

 const pollURL = `${window.location.origin}/poll/${id}`;
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pollURL);
      alert("✅ Link copied!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="qr-page">

      <div className="qr-card">

        <span className="qr-badge">
          Share Poll
        </span>

        <h1>QR Code</h1>

        <p className="qr-subtitle">
          Scan this QR code or share the link below so participants can vote.
        </p>

        <div className="qr-box">
          <QRCode value={pollURL} size={230} />
        </div>

        <div className="qr-link">
          {pollURL}
        </div>

        <div className="qr-buttons">

          <button
            className="copy-btn"
            onClick={copyLink}
          >
            📋 Copy Link
          </button>

          <a
            href={pollURL}
            target="_blank"
            rel="noreferrer"
            className="open-btn"
          >
            🌐 Open Poll
          </a>

        </div>

      </div>

    </div>
  );
}

export default QRCodePage;