import React from 'react'
import { Layout } from '@/components/layout/Layout'
import { About } from '@/components/about/About'
import { Destinations } from '@/components/destinations/Destinations'
import { ExperiencePackages } from '@/components/experience-packages/ExperiencePackages'
import { WyChooseUs } from '@/components/wy-choose-us/WyChooseUs'
import { Fleet } from '@/components/fleet/Fleet'
import { FAQ } from '@/components/faq/FAQ'
import { Footer } from '@/components/footer/Footer'

const Home = () => {
  return (
    <div>
        <Layout />
        <About />
        <Destinations />
        <ExperiencePackages />
        <WyChooseUs />
        <Fleet />
        <FAQ />
        <Footer />
    </div>
  )
}

export default Home