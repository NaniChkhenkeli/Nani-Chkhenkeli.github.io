
import MainLayout from "@/layouts/MainLayout";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ProjectsCarousel from "@/components/ProjectsCarousel";
import Contact from "@/components/Contact";


const Index = () => {
  return (
    <MainLayout>

      <Hero />
      <About />
      <ProjectsCarousel />
      <Contact />
    </MainLayout>
  );
};

export default Index;
