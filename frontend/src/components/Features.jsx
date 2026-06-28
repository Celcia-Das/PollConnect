import "../styles/landing.css";

function Features() {
  return (
    <section className="features">
      <h2>Why Choose PollConnect?</h2>

      <div className="feature-container">

        <div className="feature-card">
          <h3>📱 Mobile Friendly</h3>
          <p>
            Users can vote easily from any smartphone or tablet.
          </p>
        </div>

        <div className="feature-card">
          <h3>📊 Live Analytics</h3>
          <p>
            Watch results update instantly with interactive charts.
          </p>
        </div>

        <div className="feature-card">
          <h3>🔒 Secure Admin</h3>
          <p>
            Administrators can safely manage polls and responses.
          </p>
        </div>

        <div className="feature-card">
          <h3>⚡ QR Code Sharing</h3>
          <p>
            Generate QR codes and let participants join instantly.
          </p>
        </div>

      </div>
    </section>
  );
}

export default Features;