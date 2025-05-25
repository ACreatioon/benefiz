'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Lenis from "lenis";
import { motion, AnimatePresence } from "framer-motion";
import { CardStack } from "@/components/ui/card-stack";
import { cn } from "@/lib/utils";
import { FaInstagram, FaTwitter, FaYoutube, FaFacebookF, FaArrowAltCircleRight, FaArrowAltCircleDown } from 'react-icons/fa';
import { FiCheck } from 'react-icons/fi';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const resetScrollStyles = () => {
      document.body.style.overflow = 'visible';
      document.body.style.overflowX = 'hidden';
      document.body.style.overflowY = 'auto';
      document.body.style.height = 'auto';
      document.body.style.position = 'static';

      document.documentElement.style.overflow = 'visible';
      document.documentElement.style.overflowX = 'hidden';
      document.documentElement.style.overflowY = 'auto';
      document.documentElement.style.height = 'auto';
      document.documentElement.style.position = 'static';
    };

    resetScrollStyles();

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

    if (!isMobile && typeof window !== 'undefined') {
      try {
        const lenis = new Lenis({
          smooth: true,
          lerp: 0.09,
          touchMultiplier: 2,
          wheelMultiplier: 1,
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
          lenis.destroy();
          resetScrollStyles();
        };
      } catch (error) {
        console.log('Lenis not available, using native scroll');
        resetScrollStyles();
      }
    }

    return () => {
      resetScrollStyles();
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="w-full min-h-svh" style={{
      WebkitOverflowScrolling: 'touch',
      overflowX: 'hidden',
      overflowY: 'auto',
    }}>
      <div className="min-h-svh relative">
        <div className="fixed left-1/2 md:w-[50rem] w-[90%] max-w-[20rem] md:max-w-none z-30 top-2 py-2 -translate-x-1/2 text-black bg-white/60 flex items-center justify-between px-4 md:px-8 rounded-xl shadow-xl backdrop-blur-lg">
          <div>
            <h1 className="font-bold text-lg md:text-xl">Benevi<span className="font-light">z</span></h1>
          </div>

          <nav className="md:flex hidden gap-3 items-center text-md">
            <Link href='#home' className="hover:bg-white/80 text-sm font-bold transition-all duration-700 p-2 px-4 rounded-xl">Home</Link>
            <Link href='#about' className="hover:bg-white/80 text-sm font-bold transition-all duration-700 p-2 px-4 rounded-xl">About</Link>
            <Link href='#pictures' className="hover:bg-white/80 text-sm font-bold transition-all duration-700 p-2 px-4 rounded-xl">Pictures</Link>
            <Link href='#priview' className="hover:bg-white/80 text-sm font-bold transition-all duration-700 p-2 px-4 rounded-xl">Preview</Link>
          </nav>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex flex-col gap-1 p-2"
          >
            <span className={`w-5 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-5 h-0.5 bg-black transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>

          <div className="hidden md:block">
            <button className="bg-white/80 font-bold text-sm hover:bg-white/90 transition-all duration-500 border py-2 px-4 rounded-md border-white cursor-pointer">Follow</button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={closeMobileMenu}
              style={{ touchAction: 'none' }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-64 bg-white/95 backdrop-blur-lg z-50 md:hidden shadow-xl"
              style={{ touchAction: 'auto' }}
            >
              <div className="flex flex-col p-6 pt-20">
                <Link
                  href='#home'
                  onClick={closeMobileMenu}
                  className="py-3 px-4 font-bold text-lg hover:bg-black/10 rounded-lg transition-all duration-300"
                >
                  Home
                </Link>
                <Link
                  href='#about'
                  onClick={closeMobileMenu}
                  className="py-3 px-4 font-bold text-lg hover:bg-black/10 rounded-lg transition-all duration-300"
                >
                  About
                </Link>
                <Link
                  href='#pictures'
                  onClick={closeMobileMenu}
                  className="py-3 px-4 font-bold text-lg hover:bg-black/10 rounded-lg transition-all duration-300"
                >
                  Pictures
                </Link>
                <Link
                  href='#priview'
                  onClick={closeMobileMenu}
                  className="py-3 px-4 font-bold text-lg hover:bg-black/10 rounded-lg transition-all duration-300"
                >
                  Preview
                </Link>
                <button className="mt-6 bg-primary-900 text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-800 transition-all duration-300 cursor-pointer">
                  Follow
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <video autoPlay loop muted className="absolute -z-10 top-0 left-0 w-full h-full object-cover">
          <source src="/video/blue-fantasy-river.3840x2160.mp4" type="video/mp4" />
          Browser tidak mendukung tag video.
        </video>

        <div id="home" className="min-h-screen flex items-center justify-center flex-col px-4 md:px-0" style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="md:text-4xl text-2xl text-center font-extrabold max-w-md md:max-w-4xl drop-shadow-2xl text-white leading-[35px] md:leading-[45px]">
            Berbagai Tempat Indah Temukan Spot Foto Kesukaanmu, Dengan Exploras1 Tempat Yang Begitu
            <span className="bg-white/70 px-2 md:px-4 text-primary-950 relative mx-1">
              Memanjakan Mata
              <span className="absolute -top-1 -left-1 rounded-full bg-white/80 w-2 h-2" />
              <span className="absolute -top-1 -right-1 rounded-full bg-white/80 w-2 h-2" />
              <span className="absolute -bottom-1 -left-1 rounded-full bg-white/80 w-2 h-2" />
              <span className="absolute -bottom-1 -right-1 rounded-full bg-white/80 w-2 h-2" />
            </span>
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 p-2 rounded-full font-semibold text-sm cursor-pointer bg-white flex items-center gap-1 hover:bg-gray-100 transition-colors"
          >
            Ikuti Sekarang
            <motion.span
              animate={{ rotate: 0 }}
              whileHover={{ rotate: 90 }}
              className="rounded-full bg-primary-950 p-2 text-white"
            >
              <FaArrowAltCircleRight className="block group-hover:hidden" />
              <FaArrowAltCircleDown className="hidden group-hover:block" />
            </motion.span>
          </motion.button>
        </div>
      </div>

      <div className="min-h-screen bg-stone-50 flex flex-col items-center mt-20 px-4 md:px-0" style={{ position: 'relative', zIndex: 1 }}>
        <h1 className="md:text-6xl text-3xl md:px-1 px-2 text-primary-900 font-bold text-center">Tempat Specialmu Kawan</h1>
        <p className="mt-2 md:max-w-3xl max-w-xl font-semibold text-black/80 md:text-xl text-lg text-center px-2">
          Kenangan terukir indah kawan, kapan lagi kamu berfoto dengan tempat dengan nuansa yang memanjakan mata bersama keluarga dan orang tersayangmu
        </p>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-10 md:px-14 w-full max-w-7xl">
          <div className="w-full overflow-hidden rounded-3xl">
            <img src="/image/three.jpeg" alt="" className="w-full lg:h-[567px] md:h-[400px] h-64 object-cover transition-all duration-700 rounded-3xl hover:scale-110" />
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-full overflow-hidden rounded-3xl">
              <img src="/image/one.jpg" alt="" className="w-full md:h-[275px] h-64 transition-all duration-700 object-cover rounded-3xl hover:scale-110" />
            </div>
            <div className="w-full overflow-hidden rounded-3xl">
              <img src="/image/one.jpg" alt="" className="w-full md:h-[275px] h-64 transition-all duration-700 object-cover rounded-3xl hover:scale-110" />
            </div>
          </div>
          <div className="w-full overflow-hidden rounded-3xl lg:block md:hidden block">
            <img src="/image/three.jpeg" alt="" className="w-full lg:h-[567px] h-64 object-cover transition-all duration-700 rounded-3xl hover:scale-110" />
          </div>
        </div>
      </div>

      <div className="min-h-screen flex items-center flex-col px-4 md:px-0" style={{ position: 'relative', zIndex: 1 }}>
        <div id="about" className="min-h-24 w-full"></div>
        <h1 className="md:text-6xl text-3xl text-primary-900 font-bold text-center mb-10">Apa Tujuan Kami ?..</h1>
        <div className="max-w-6xl w-full">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-0">
            {[
              {
                title: 'Memberdayakan Generasi Muda',
                desc: 'Kami berkomitmen untuk memberikan akses edukasi dan keterampilan masa depan kepada generasi muda.'
              },
              {
                title: 'Mendorong Kreativitas Bebas',
                desc: 'Kami menciptakan ruang untuk mengekspresikan ide-ide kreatif tanpa batasan.'
              },
              {
                title: 'Membangun Komunitas Inklusif',
                desc: 'Kami ingin menciptakan lingkungan yang saling mendukung tanpa memandang latar belakang.'
              },
              {
                title: 'Menghubungkan Lewat Teknologi',
                desc: 'Teknologi menjadi jembatan kami dalam mempererat koneksi antar individu dan komunitas.'
              },
              {
                title: 'Menyebarkan Inspirasi Positif',
                desc: 'Kami percaya bahwa energi positif dapat ditularkan melalui konten yang berdampak.'
              },
              {
                title: 'Menjadi Ruang Tumbuh Bersama',
                desc: 'Beneviz hadir sebagai tempat berkembangnya potensi, ide, dan kolaborasi lintas batas.'
              }
            ].map((item, index) => (
              <div
                key={index}
                className="max-w-full p-4 border-l border-t border-r md:border-b-0 border-b border-black/10 flex flex-col md:last:border-r md:nth-child(3n+1):border-l md:nth-child(3n):border-r"
              >
                <h1 className="text-primary-900 font-bold text-xl">{index + 1}</h1>
                <h1 className="text-black font-bold text-xl md:text-2xl">{item.title}</h1>
                <p className="font-semibold text-black/80 my-3 md:my-5 text-sm md:text-base">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div id="pictures" className="relative min-h-screen px-4 md:px-0" style={{ position: 'relative', zIndex: 1 }}>
        <div className="min-h-24 w-full"></div>
        <div className="md:absolute hidden top-50 min-h-60 bg-primary-900 w-full -z-1"></div>
        <div className="md:text-6xl text-3xl font-bold text-primary-900 md:mb-15 text-center px-4">Fitur Unggulan Kami</div>

        <div className="flex flex-col lg:flex-row md:px-40 px-4 md:mt-30 mt-10 gap-5 max-w-10xl mx-auto">
          {[
            {
              title: 'Alat Visual Kreatif',
              desc: 'Wujudkan ide-ide hebatmu dengan alat desain canggih yang mudah digunakan dan penuh presisi.',
              features: ['Kualitas tinggi & tajam', 'Antarmuka intuitif', 'Template siap pakai', 'Ekspor cepat & fleksibel']
            },
            {
              title: 'Kolaborasi Tanpa Batas',
              desc: 'Bekerja bersama tim dalam waktu nyata untuk mempercepat proses dan hasil yang maksimal.',
              features: ['Sinkronisasi langsung', 'Berbagi antar tim', 'Fitur komentar & ulasan', 'Kontrol akses aman']
            },
            {
              title: 'Performa Maksimal',
              desc: 'Didesain dengan performa tinggi agar tetap ringan, cepat, dan stabil di berbagai perangkat.',
              features: ['Waktu muat cepat', 'Akses cloud 24/7', 'Dukungan lintas perangkat', 'Pengalaman tanpa hambatan']
            }
          ].map((item, index) => (
            <div key={index} className="bg-primary-100 shadow-md rounded-xl p-4 w-full lg:max-w-sm">
              <h1 className="text-2xl font-bold">{item.title}</h1>
              <p className="text-md font-semibold mt-4">{item.desc}</p>
              <div className="flex flex-col sm:flex-row sm:gap-10 gap-4 items-start sm:items-center mt-2">
                {[0, 1].map(col => (
                  <div key={col} className="mt-2 flex flex-col gap-1">
                    {item.features.slice(col * 2, col * 2 + 2).map((feature, fIndex) => (
                      <div key={fIndex} className="flex gap-1 items-center">
                        <span className="bg-primary-900 p-1 rounded-full text-white">
                          <FiCheck className="text-xs" />
                        </span>
                        <p className="text-sm font-medium">{feature}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="px-4 md:px-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.2 }}
            className="relative z-10 mt-20 rounded-3xl border border-primary-200 bg-primary-100 p-4 shadow-md"
          >
            <div className="w-full overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700">
              <video autoPlay loop muted className="aspect-[16/9] h-auto w-full object-cover">
                <source src="/video/blue-fantasy-river.3840x2160.mp4" type="video/mp4" />
                Browser tidak mendukung tag video.
              </video>
            </div>
          </motion.div>
        </div>
      </div>

      <div id="priview" className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-15 px-4 md:px-38 w-full min-h-80 bg-primary-200 md:mt-50 mt-20 mb-20 py-10 lg:py-0">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-primary-900 mb-4">Energi dan Semangat Kami</h1>
          <p className="text-lg md:text-3xl">energi dan semngat kami adalah komentar dan saran dari kalian serta testimoni yang jujur</p>
        </div>
        <div className="flex items-center justify-center w-full lg:w-auto">
          <CardStack items={CARDS} />
        </div>
      </div>

      <div className="min-h-screen bg-stone-50 md:py-20 py-10 px-4 md:px-0">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-900 mb-4">Tempat Rekomendasi Kami</h1>
            <p className="text-lg md:text-xl text-black/80 max-w-3xl mx-auto">
              temukan tempat tempat indah yang sudah banyak di jelajahi dengan keindahan powerfull
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                name: "Pulai Imajinasi",
                kota: "Kota Fiktiv",
                image: "/image/one.jpg"
              },
              {
                name: "Gunung Sahara",
                kota: "kota fiktiv",
                image: "/image/three.jpeg"
              },
              {
                name: "Chilla Arts",
                kota: "Kota Fiktiv",
                image: "/image/one.jpg"
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-all duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold text-white">{member.name}</h3>
                    <p className="text-primary-200">{member.kota}</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex space-x-4">
                    <a href="#" className="text-primary-900 hover:text-primary-700">
                      <FaTwitter size={18} />
                    </a>
                    <a href="#" className="text-primary-900 hover:text-primary-700">
                      <FaInstagram size={18} />
                    </a>
                    <a href="#" className="text-primary-900 hover:text-primary-700">
                      <FaYoutube size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 bg-primary-100 rounded-3xl p-10 md:p-16">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-6">Siap Mengubah Pengalaman Anda??</h2>
                <p className="text-lg text-black/80 mb-8">
                  Bergabunglah dengan ribuan pengguna yang puas yang telah menemukan tempat yang sempurna untuk kebutuhan fotografi mereka.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-primary-900 hover:bg-primary-800 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300">
                    Get Started Now
                  </button>
                  <button className="border-2 border-primary-900 text-primary-900 hover:bg-primary-900/10 font-bold py-3 px-8 rounded-lg transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-white p-4 rounded-xl shadow-md">
                    <div className="text-primary-900 text-2xl font-bold mb-2">{item * 500}+</div>
                    <div className="text-black/70 text-sm">Happy {item === 1 ? 'Users' : item === 2 ? 'Locations' : item === 3 ? 'Photos' : 'Reviews'}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-primary-900 text-white pt-20 pb-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Benevi<span className="font-light">z</span></h2>
              <p className="text-primary-200">
                Temukan tempat indah untuk spot foto favoritmu dengan eksplorasi yang memanjakan mata.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-primary-300 transition-colors">
                  <FaInstagram size={20} />
                </a>
                <a href="#" className="text-white hover:text-primary-300 transition-colors">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="text-white hover:text-primary-300 transition-colors">
                  <FaYoutube size={20} />
                </a>
                <a href="#" className="text-white hover:text-primary-300 transition-colors">
                  <FaFacebookF size={20} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="text-primary-200 hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="text-primary-200 hover:text-white transition-colors">About</a></li>
                <li><a href="#pictures" className="text-primary-200 hover:text-white transition-colors">Pictures</a></li>
                <li><a href="#priview" className="text-primary-200 hover:text-white transition-colors">Preview</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-primary-200">
                <li>hello@beneviz.com</li>
                <li>+62 123 4567 890</li>
                <li>Jakarta, Indonesia</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-primary-200 mb-4">Subscribe untuk update terbaru</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-lg focus:outline-none text-primary-900 w-full"
                />
              </form>
            </div>
          </div>

          <div className="border-t border-primary-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-300 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Benevi<span className="font-light">z</span>. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-primary-300 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-primary-300 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-primary-300 hover:text-white text-sm transition-colors">Cookies Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const Highlight = ({ children, className }) => {
  return (
    <span className={cn("font-bold bg-emerald-700/[0.2] text-emerald-500 px-1 py-0.5", className)}>
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Manu Arora",
    designation: "Senior Software Engineer",
    content: (
      <p>
        These cards are amazing, <Highlight>I want to use them</Highlight> in my
        project. Framer motion is a godsend ngl tbh fam 🙏
      </p>
    ),
  },
  {
    id: 1,
    name: "Elon Musk",
    designation: "Senior Shitposter",
    content: (
      <p>
        I dont like this Twitter thing,{" "}
        <Highlight>deleting it right away</Highlight> because yolo. Instead, I
        would like to call it <Highlight>X.com</Highlight> so that it can easily
        be confused with adult sites.
      </p>
    ),
  },
  {
    id: 2,
    name: "Tyler Durden",
    designation: "Manager Project Mayhem",
    content: (
      <p>
        The first rule of
        <Highlight>Fight Club</Highlight> is that you do not talk about fight
        club. The second rule of
        <Highlight>Fight club</Highlight> is that you DO NOT TALK about fight
        club.
      </p>
    ),
  },
];
