import { PageTransition } from "@/components/page-transition"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Categories } from "@/components/categories"
import { ProductSlider } from "@/components/product-slider"
import { Products } from "@/components/products"
import { About } from "@/components/about"
import { Gallery } from "@/components/gallery"
import { InstagramFeed } from "@/components/instagram-feed"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"

export default function Page() {
  return (
    <>
      <PageTransition />
      <Navbar />
      <CartDrawer />
      <main>
        <Hero />
        <Categories />
        <ProductSlider />
        <Products />
        <About />
        <Gallery />
        <InstagramFeed />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
