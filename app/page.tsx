import Hero from '@/components/Hero'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Tools from '@/components/Tools'
import Contact from '@/components/Contact'
import Certificates from '@/components/Certificates'
import Achievements from '@/components/Achievements'

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <Certificates />
      <Achievements />
      <Tools />
      <Contact />
    </>
  )
}
