import FAQSection from "../Pages/FAQItem";
import Hero from "../Pages/Hero";
import Integrations from "../Pages/Integrations";
import Portfolio from "../Pages/Portfolio";
import Process from "../Pages/Process";
import Services from "../Pages/Services";
import ValuesSection from "../Pages/ValuesSection";

const Home = () => {
  return (
    <>
      <Hero />
      <Services />
      <Portfolio />
      <Process />
      <ValuesSection />
      <Integrations />
      <FAQSection />
    </>
  );
};

export default Home;