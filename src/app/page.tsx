import SmoothScroll from "@/components/fx/SmoothScroll";
import Preloader from "@/components/fx/Preloader";
import Cursor from "@/components/fx/Cursor";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import BrandStory from "@/components/sections/BrandStory";
import Collection from "@/components/sections/Collection";
import ScentNotes from "@/components/sections/ScentNotes";
import WhyUs from "@/components/sections/WhyUs";
import Lifestyle from "@/components/sections/Lifestyle";
import Testimonials from "@/components/sections/Testimonials";
import Comparison from "@/components/sections/Comparison";
import Instagram from "@/components/sections/Instagram";
import FAQ from "@/components/sections/FAQ";
import Newsletter from "@/components/sections/Newsletter";
import Footer from "@/components/sections/Footer";
import CartDrawer from "@/components/shop/CartDrawer";
import QuickView from "@/components/shop/QuickView";
import ExitIntent from "@/components/shop/ExitIntent";
import RecentlyViewed from "@/components/shop/RecentlyViewed";

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <Cursor />
      <Header />
      <main>
        <Hero />
        <BrandStory />
        <Collection />
        <ScentNotes />
        <WhyUs />
        <Lifestyle />
        <Testimonials />
        <Comparison />
        <Instagram />
        <FAQ />
        <Newsletter />
        <RecentlyViewed />
      </main>
      <Footer />
      <CartDrawer />
      <QuickView />
      <ExitIntent />
    </SmoothScroll>
  );
}
