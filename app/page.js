'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Plus, Search, Bell, ChevronDown, Menu, X } from 'lucide-react'
import { MovieCarousel } from '@/app/components/movie-carousel'
import { ThemeToggle } from '@/app/components/theme-toggle'

const featuredMovie = {
  title: "Inception",
  description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  backgroundImage: "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
  year: "2023", 
  duration: "84",
  rating: "4/5"
};


const categories = [
  { 
    title: "Trending Now", 
    movies: Array(10).fill({ 
      title: "Movie Title",
      year: "2023", 
      duration: "84",
      rating: "4/5",
      image: "https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg" 
    }) 
  },
  { 
    title: "Top Rated", 
    movies: Array(10).fill({ 
      title: "Movie Title", 
      year: "2023", 
      duration: "84",
      rating: "4/5",
      image: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg" 
    }) 
  },
  { 
    title: "New Releases", 
    movies: Array(10).fill({ 
      title: "Movie Title", 
      year: "2023", 
      duration: "84",
      rating: "4/5",
      image: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg" 
    }) 
  },
  { 
    title: "Action Movies", 
    movies: Array(10).fill({ 
      title: "Movie Title", 
      year: "2023", 
      duration: "84",
      rating: "4/5",
      image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg" 
    }) 
  },
]

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const currentTheme = localStorage.getItem('theme');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="min-h-screen text-white">
      <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${isScrolled ? 'backdrop-blur-xl bg-black/10' : ''}`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold">MovieFlix</Link>
            <nav className="hidden md:flex space-x-4">
              <Link href="/" className="hover:text-primary">Home</Link>
              <Link href="/tv-shows" className="hover:text-primary">TV Shows</Link>
              <Link href="/movies" className="hover:text-primary">Movies</Link>
              <Link href="/new" className="hover:text-primary">New & Popular</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <form className="relative hidden md:block">
              <input
                type="search"
                placeholder="Search..."
                className="py-1 px-3 w-64 rounded-full bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            </form>
            <Bell className="cursor-pointer hidden md:block" size={24} />
            <div className="hidden md:flex items-center space-x-2 cursor-pointer">
              <Image src="/placeholder.svg?height=32&width=32" alt="User" width={32} height={32} className="rounded-full" />
              <ChevronDown size={16} />
            </div>
            <ThemeToggle />
            
            {/* Hamburger menu for mobile */}
            <button onClick={toggleMenu} className="md:hidden block text-white">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {menuOpen && (
          <div className={`md:hidden fixed ml-32 ${isScrolled ? 'backdrop-blur-lg bg-black ml-40': 'backdrop-blur-lg bg-white/10'} h-[40vh] w-[50vw] p-4 space-y-4 flex flex-col justify-center rounded-2xl`}>
            <Link href="/" className="block text-white text-lg hover:text-primary">Home</Link>
            <Link href="/tv-shows" className="block text-white text-lg hover:text-primary">TV Shows</Link>
            <Link href="/movies" className="block text-white text-lg hover:text-primary">Movies</Link>
            <Link href="/new" className="block text-white text-lg hover:text-primary">New & Popular</Link>
          </div>
        )}
      </header>

      <main>
        {/* Hero Banner */}
        <section className="relative md:h-[80vh] h-[60vh] flex items-center">
          <Image src={featuredMovie.backgroundImage} alt={featuredMovie.title} layout="fill" objectFit="cover" className="brightness-50" />
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-5xl font-bold mb-4">{featuredMovie.title}</h1>
            <p className="text-lg max-w-xl mb-6">{featuredMovie.description}</p>
            <div className="flex space-x-4">
              <button className="bg-primary text-primary-foreground py-2 px-6 rounded-full flex items-center space-x-2 hover:bg-primary/90 transition-colors">
                <Play size={20} />
                <span>Play</span>
              </button>
              <button className="bg-secondary text-secondary-foreground py-2 px-6 rounded-full flex items-center space-x-2 hover:bg-secondary/90 transition-colors">
                <Plus size={20} />
                <span>My List</span>
              </button>
            </div>
          </div>
        </section>

        {/* Movie Categories */}
        <section className={`py-12 md:px-20 px-2 ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`}>
          <div className="container mx-auto px-4">
            {categories.map((category, index) => (
              <MovieCarousel key={index} title={category.title} movies={category.movies} />
            ))}
          </div>
        </section>
      </main>

      <footer className={`bg-muted py-8 ${currentTheme === 'dark' ? 'text-white' : 'text-black'}`}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:underline">About Us</Link></li>
                <li><Link href="/careers" className="hover:underline">Careers</Link></li>
                <li><Link href="/press" className="hover:underline">Press</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><Link href="/help" className="hover:underline">Help Center</Link></li>
                <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="hover:underline">Cookie Preferences</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-foreground hover:text-primary">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-foreground hover:text-primary">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-foreground hover:text-primary">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-muted-foreground pt-8 text-center text-sm">
            <p>&copy; 2024 MovieFlix. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
