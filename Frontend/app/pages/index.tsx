import type { NextPage } from 'next'
import About from '../components/about/About';
import Nav from '../components/nav/Nav';
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer';
import Contact from '../components/contact/Contact';
import SkillSection from '../components/skills/SkillSection';
import Portfolio from '../components/portfolio/Portfolio';
import Services from '../components/services/Services';
import Story from '../components/story/Story';
import Head from 'next/head';
import PartyParticles from '../components/particles/PartyParticles';



const Home: NextPage = () => {
  return (
    <>
      <Head>
        <link rel="js icon" href="/jslogo.png" />
        <title>Jonatan Schultz</title>
        <meta
          name="description"
          content="Jonatan Schultz — development leadership and digital delivery."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Jonatan Schultz" />
        <meta
          name="keywords"
          content="development, leadership, change management, digitalisation, portfolio"
        />
        <meta name="language" content="en" />
      </Head>
      <Header />
      <Nav />
      <About />
      <SkillSection />
      <Services />
      <Portfolio />
      <Story />
      <Contact />
      <Footer />
      <PartyParticles />
    </>
  );
}

export default Home
