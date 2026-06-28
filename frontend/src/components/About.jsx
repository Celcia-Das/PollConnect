function About() {
  return (
    <section
      style={{
        background: "#e3c7e5",
        color: "black",
        padding: "80px 20px",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          color: "#3c0650",
          fontSize: "40px",
          marginBottom: "20px",
        }}
      >
        About PollConnect
      </h2>

      <p
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          fontSize: "18px",
          lineHeight: "1.8",
        }}
      >
        PollConnect is a modern polling platform that enables administrators
        to create interactive polls, share them using QR codes, and monitor
        live responses through an analytics dashboard. It is designed to be
        fast, responsive, and easy to use on both desktop and mobile devices.
      </p>
    </section>
  );
}

export default About;