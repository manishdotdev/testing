import Navbar from "../Components/Navbar";
import FAQSection from "../Pages/FAQItem";
import Hero from "../Pages/Hero";
import Integrations from "../Pages/Integrations";
import Portfolio from "../Pages/Portfolio";
import Process from "../Pages/Process";
import Services from "../Pages/Services";
import ValuesSection from "../Pages/ValuesSection";

const Placeholder = ({ label, bg = "#f5f0e8" }) => (
  <section
    id={label.toLowerCase()}
    style={{
      minHeight: "100vh",
      background: bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'DM Mono', monospace",
      fontSize: 11,
      letterSpacing: "0.25em",
      textTransform: "uppercase",
      color: "rgba(26,18,10,0.25)",
    }}
  >
    {label} — coming soon
  </section>
);

const Layout = () => {
  return (
    <div style={styles.shell}>

      <div style={styles.navbarWrapper}>
        <Navbar />
      </div>

      <main style={styles.main}>
        <Hero />
        <Services />
        <Portfolio />
        <Process />
        <ValuesSection />
        <Integrations />
        <FAQSection />
        
      </main>

    </div>
  );
};

const styles = {
  shell: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",         
  },

  navbarWrapper: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,               
  },

  main: {
    // marginTop: "64px",          
    flex: 1,
    overflowY: "auto",          
    overflowX: "hidden",
    height: "calc(100vh - 64px)",
  },
};

export default Layout;