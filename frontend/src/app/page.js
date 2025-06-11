// app/page.js
import HeroSection from '@/components/HeroSection';
import CourseSelector from '@/components/CourseSelector';
import CompilerSection from '@/components/CompilerSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import MobileAppSection from '@/components/MobileAppSection';
import FooterSection from '@/components/FooterSection';

export default function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <CourseSelector />
      <CompilerSection />
      <WhyChooseUs />
      <MobileAppSection />
      <FooterSection />
    </main>
  );
}
