import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Pages/Home";
import Contact from "./Pages/ContactUs";
import About from "./Pages/About";
import Services from "./Pages/Servicespage";
import Blog from "./Pages/Blogpage";
import TermsAndConditions from "./Pages/TermsAndConditions"
import PrivacyPolicy from "./Pages/PrivacyPolicy"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>

          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;