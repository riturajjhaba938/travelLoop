import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate();

    // Setup global styles for icons only for this page component
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            .material-symbols-outlined {
                font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            }
            .icon-fill {
                font-variation-settings: 'FILL' 1;
            }
            .landing-page-body {
                background-color: #ffffff;
                color: #484848;
                font-family: 'Be Vietnam Pro', sans-serif;
                -webkit-font-smoothing: antialiased;
            }
        `;
        document.head.appendChild(style);
        document.body.classList.add('landing-page-body');
        return () => {
            document.head.removeChild(style);
            document.body.classList.remove('landing-page-body');
        };
    }, []);

    const handleActionClick = () => {
        navigate('/login');
    };

    return (
        <div className="bg-surface-container-lowest text-brand-text font-body-md antialiased pt-20">
            {/* TopNavBar */}
            <nav className="fixed top-0 w-full z-50 bg-surface dark:bg-on-background shadow-sm h-20 transition-all duration-300">
                <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-full max-w-container-max mx-auto">
                    {/* Logo */}
                    <Link className="flex items-center hover:opacity-80 transition-opacity" to="/">
                        <img
                            src="/logo-vertical.png"
                            alt="TravelLoop"
                            className="h-14 w-auto object-contain"
                        />
                    </Link>
                    {/* Trailing Actions */}
                    <div className="flex items-center gap-6">
                        <Link className="text-brand-text font-label-md hover:text-brand-primary transition-colors" to="/login">
                            Log In
                        </Link>
                        <button 
                            onClick={() => navigate('/register')}
                            className="bg-brand-primary hover:bg-red-500 text-white font-label-md px-6 py-2.5 rounded-full shadow-soft hover:shadow-hover transition-all duration-300">
                            Sign Up
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative w-full h-[819px] min-h-[600px] flex items-center justify-center pt-20" 
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfz7lWI3AvzQ9mWPjMXBl-BM0hvx9E7Fbakrk1vqU2nlFAaMescv7wkkemiNytnh5wqM4rSXUTLN48SIJthReBINVpBOgtI6kwb6yrJ5HIf1KUSncRsmPk0hkicQ_cqEE-Z5noDUfdaXYC74OY5hT4WeLhiha5TGlkGIY89999Ai_426VNrqPB4wcMmUYC2REQQuddFUF_GDBFe2fX7a78spyPDMjqNJUanXK_gAhPcDoyh5f8KQWQ0cZkSJ5KxWPkvg8sx40AbQ')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                {/* Dark Overlay for text legibility */}
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto flex flex-col items-center">
                    <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
                        Discover your next great adventure.
                    </h1>
                    <p className="font-body-lg text-lg md:text-xl text-white/90 mb-10 max-w-2xl drop-shadow-md">
                        Curated experiences designed for the modern explorer. We blend luxury concierge service with authentic, breathtaking destinations.
                    </p>
                    <button onClick={handleActionClick} className="bg-brand-primary hover:bg-red-500 text-white font-label-md px-8 py-4 rounded-2xl shadow-floating hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        Start Planning
                    </button>
                </div>
                {/* Search Overlay */}
                <div className="absolute -bottom-8 left-0 w-full flex justify-center px-4">
                    <div className="w-full max-w-3xl bg-surface-container-lowest rounded-2xl shadow-floating p-2 flex flex-col md:flex-row items-center gap-2 cursor-pointer hover:shadow-xl transition-shadow" onClick={handleActionClick}>
                        <div className="flex-1 flex items-center bg-brand-surface rounded-xl px-4 py-3 border border-transparent focus-within:border-brand-text transition-colors w-full">
                            <span className="material-symbols-outlined text-brand-primary mr-3">location_on</span>
                            <div className="flex flex-col w-full text-left">
                                <label className="text-[10px] font-bold text-brand-text uppercase tracking-wider mb-1 cursor-pointer">Location</label>
                                <input readOnly className="bg-transparent border-none p-0 focus:ring-0 text-sm text-brand-text placeholder-brand-muted w-full cursor-pointer outline-none" placeholder="Where are you going?" type="text" />
                            </div>
                        </div>
                        <div className="hidden md:block w-[1px] h-10 bg-brand-border"></div>
                        <div className="flex-1 flex items-center bg-brand-surface rounded-xl px-4 py-3 border border-transparent focus-within:border-brand-text transition-colors w-full">
                            <span className="material-symbols-outlined text-brand-primary mr-3">calendar_today</span>
                            <div className="flex flex-col w-full text-left">
                                <label className="text-[10px] font-bold text-brand-text uppercase tracking-wider mb-1 cursor-pointer">Dates</label>
                                <input readOnly className="bg-transparent border-none p-0 focus:ring-0 text-sm text-brand-text placeholder-brand-muted w-full cursor-pointer outline-none" placeholder="Add dates" type="text" />
                            </div>
                        </div>
                        <button className="w-full md:w-auto bg-brand-primary text-white rounded-xl p-4 flex items-center justify-center hover:bg-red-500 transition-colors shadow-soft">
                            <span className="material-symbols-outlined">search</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-xl mt-12">
                {/* Featured Collections */}
                <section className="mb-xl">
                    <h2 className="font-headline-lg text-headline-lg text-brand-text mb-2">Curated Collections</h2>
                    <p className="font-body-md text-body-md text-brand-muted mb-lg">Handpicked experiences for every type of traveler.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter h-[500px]">
                        {/* Collection Card 1 */}
                        <div onClick={handleActionClick} className="relative group rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 cursor-pointer h-full">
                            <img alt="" className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgkNuARR6K2SxE6PVlZ6Gg4cTEnd4Tgsx3YL4-FTwKThhaXoTOFHZNbtbDSJf-uy0iicMbkbcw2Cz_nIiA8s0_28PW2-9QRcP1iaIduC4IMEqVADY6FyMgrlNTZ27YSk7jkMGD3bYLGigqqgsBTGE6R5E1BI6jcCuzmTX81jFQj8sX4aWu8LghvFAzQCdbrIpVGO5wRaDWNUl-FmfqtQxdXW7XdIb9-PZOpI2BBx0lNFFnSMGj62k67-lEvYYq_qRwePA6GtJEbQ" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-wider mb-3">Trending</span>
                                <h3 className="font-serif text-3xl text-white mb-2">Coastal Retreats</h3>
                                <p className="text-white/80 text-sm line-clamp-2">Discover hidden beaches and luxury seaside villas perfect for your next getaway.</p>
                            </div>
                        </div>
                        {/* Collection Card 2 */}
                        <div onClick={handleActionClick} className="relative group rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 cursor-pointer h-full">
                            <img alt="" className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYBUlsXNjJSkl44cx1Bmz1Br65jefHvcJAtB09MKS040gHkKarA_9VfIlCh5Uk-vT9Is3dEeFcu6AKi-Fi2HWZe9HItyEGoMthRpW0VwgrL-vzSeA1jQv219kxU0pb33QdKUViusuXiskn9SNgBZ14Wru9rHcXtPrcslqrikQz9wRW3zx7RZjdek5ES1dI9ub5E1Cl1cvv6TDJI7sTELSHf4AvPB8pkyRoOuuLCeV9HipjHdxj1qC-vc7KXnTLBdLpvlxO55kA-w" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <h3 className="font-serif text-3xl text-white mb-2">Alpine Escapes</h3>
                                <p className="text-white/80 text-sm line-clamp-2">Breathe in the mountain air with curated chalets and breathtaking hiking trails.</p>
                            </div>
                        </div>
                        {/* Collection Card 3 */}
                        <div onClick={handleActionClick} className="relative group rounded-2xl overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300 cursor-pointer h-full">
                            <img alt="" className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3AQKaMcs_ucQM1_xwYMyodozvVyeIl2pksa7pr1IqVRCW1i-XJPU9UzpG5LT2WDJECrPc_FvDq3x7LyaQxBcKtG1mB2pCeuPInx3vUikACz6_XbE_EUWtoGAxm8YS0P6vny1XqfLXKuCiu49HZPIHuiJwTIQ6DeHXCQS_oCy3s5JmC8O92Wfda0Loiw9bdmL16quWvUiwq8ls655FmoDtPDTPg3IPEHDTeRVkfLn-ju--ulL1vJvgXJqfJnrNLji65f9CENJVDA" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <h3 className="font-serif text-3xl text-white mb-2">Urban Explorations</h3>
                                <p className="text-white/80 text-sm line-clamp-2">Immerse yourself in culture, cuisine, and nightlife in the world's most vibrant cities.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Popular Destinations */}
                <section className="mb-xl">
                    <div className="flex justify-between items-end mb-lg">
                        <div>
                            <h2 className="font-headline-lg text-headline-lg text-brand-text mb-2">Popular Destinations</h2>
                            <p className="font-body-md text-body-md text-brand-muted">Places our community loves right now.</p>
                        </div>
                        <button onClick={handleActionClick} className="hidden md:flex items-center text-brand-text font-label-md hover:text-brand-primary transition-colors">
                            View all <span className="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Destination 1 */}
                        <div onClick={handleActionClick} className="group bg-surface-container-lowest rounded-2xl shadow-soft hover:shadow-hover transition-all duration-300 overflow-hidden cursor-pointer flex flex-col">
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzGGdYz53KioHmYfUU4_Mb3H4liNcX8_Lwsw84xIXFQJQpY-PxowxsyhuVoVKoRknHtkLvenb3jqvkWyRVzv8EfuzkSgI22AlrzP1mi_0_gu-7z-uE1iKK2qHXfHZ0o-xhcGcZXrox4nNpflwmE_Uz3fbhpJ8i77mUfbcR__gxtITRp28-s4Pg6eJKTUGzaxLRq1zU3Pp7dUdxIOjMEysWr82SCDy17L2C4LCneuLObTN3TSooxSqPr9g6l_acS9thAvXd_fG7gQ" />
                                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                                    <span className="material-symbols-outlined text-brand-text text-sm icon-fill">favorite</span>
                                </button>
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-headline-md text-lg text-brand-text line-clamp-1">Amalfi Coast, Italy</h4>
                                    <div className="flex items-center gap-1 text-sm">
                                        <span className="material-symbols-outlined text-brand-primary text-xs icon-fill">star</span>
                                        <span className="font-bold text-brand-text">4.9</span>
                                    </div>
                                </div>
                                <p className="font-body-sm text-body-sm text-brand-muted mb-4">Stunning coastal views</p>
                                <div className="mt-auto">
                                    <span className="font-bold text-brand-text text-lg">$320</span>
                                    <span className="font-body-sm text-brand-muted">/ night</span>
                                </div>
                            </div>
                        </div>
                        {/* Destination 2 */}
                        <div onClick={handleActionClick} className="group bg-surface-container-lowest rounded-2xl shadow-soft hover:shadow-hover transition-all duration-300 overflow-hidden cursor-pointer flex flex-col">
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO0zqpFS4icBxOJs9Nfo08pGQhcQlo7xC63qjfpWSL7zHqE3Y53EZgK4eyUDG1B3dbPVS9hLlWtXU9QNLyHaxehcuxZuqyoP-tUXnlQXl9N3fr7LzNeyNK6tFTHxGGsux12vbLwdKzBZ0TQTMFp-zhwoFFQSpL_4Yl_BJOGXEdLeNMj9gAHXnOj7Yx-vtJQ5IgMGIKDHHtMSpxrllPaf5Tipv8TiSN_Gldp4aETrZE2RaIAGp1Awl3m4QEnYIo_xemMF5KAa7A0w" />
                                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                                    <span className="material-symbols-outlined text-brand-text text-sm">favorite</span>
                                </button>
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-headline-md text-lg text-brand-text line-clamp-1">Kyoto, Japan</h4>
                                    <div className="flex items-center gap-1 text-sm">
                                        <span className="material-symbols-outlined text-brand-primary text-xs icon-fill">star</span>
                                        <span className="font-bold text-brand-text">4.95</span>
                                    </div>
                                </div>
                                <p className="font-body-sm text-body-sm text-brand-muted mb-4">Historical temples & gardens</p>
                                <div className="mt-auto">
                                    <span className="font-bold text-brand-text text-lg">$180</span>
                                    <span className="font-body-sm text-brand-muted">/ night</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleActionClick} className="mt-6 md:hidden w-full py-3 rounded-2xl border border-brand-text text-brand-text font-label-md hover:bg-brand-surface transition-colors">
                        View all destinations
                    </button>
                </section>
            </main>

            {/* Footer */}
            <footer className="w-full bg-slate-100 dark:bg-slate-900 py-lg px-margin-mobile md:px-margin-desktop mt-xl">
                <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="mb-4 md:mb-0">
                        <img
                            src="/logo-vertical.png"
                            alt="TravelLoop"
                            className="h-10 w-auto object-contain"
                        />
                    </div>
                    <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                        <Link className="text-slate-600 dark:text-slate-400 font-label-sm text-label-sm hover:text-primary dark:hover:text-primary-fixed transition-colors" to="/">Privacy Policy</Link>
                        <Link className="text-slate-600 dark:text-slate-400 font-label-sm text-label-sm hover:text-primary dark:hover:text-primary-fixed transition-colors" to="/">Terms of Service</Link>
                        <Link className="text-slate-600 dark:text-slate-400 font-label-sm text-label-sm hover:text-primary dark:hover:text-primary-fixed transition-colors" to="/">Support</Link>
                        <Link className="text-slate-600 dark:text-slate-400 font-label-sm text-label-sm hover:text-primary dark:hover:text-primary-fixed transition-colors" to="/">Contact Us</Link>
                    </div>
                    <div className="text-slate-500 dark:text-slate-400 font-body-sm text-body-sm mt-4 md:mt-0 text-center md:text-right">
                        © 2024 travelLoop. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
}
