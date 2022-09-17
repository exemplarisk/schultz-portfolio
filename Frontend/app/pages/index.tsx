import type { NextPage } from 'next'
import About from '../components/about/About';
import Nav from '../components/nav/Nav';
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer';
import Contact from '../components/contact/Contact';
import Experience from '../components/experience/Experience';
import Portfolio from '../components/portfolio/Portfolio';
import Services from '../components/services/Services';
import Story from '../components/story/Story';

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <Nav/>
      <About />
      <Experience />
      <Services />
      <Portfolio />
      <Story />
      <Contact />
      <Footer />
    </>
  );
}

export default Home
