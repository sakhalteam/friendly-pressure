import Nav from "./components/Nav";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import Gallery from "./sections/Gallery";
import Pricing from "./sections/Pricing";
import Process from "./sections/Process";
import About from "./sections/About";
import ServiceArea from "./sections/ServiceArea";
import QuoteForm from "./sections/QuoteForm";
import Footer from "./sections/Footer";

export default function App() {
  return (
    <>
      <div className="gradient-bg" />
      <Nav />

      <main id="top">
        <Hero />
        <Services />
        <Gallery />
        <Pricing />
        <Process />
        <About />
        <ServiceArea />
        <QuoteForm />
      </main>

      <Footer />
    </>
  );
}
