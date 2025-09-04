import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { formBtn1 } from '../../utils/CustomClass';
import { List, X } from '@phosphor-icons/react';
import { useSelector } from 'react-redux';
import { LoginCurve, Profile } from 'iconsax-reactjs';
import { formatRole } from '../../helper/Helper';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const HomeNavbar = () => {
    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Profile', path: '/profile' },
    ];

    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [card, setCard] = useState(true)
    const login = useSelector(state => state.user.isLogged)
    const user = useSelector(state => state.user.userDetails)
    const navigate = useNavigate();
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const shouldShowShadow = currentScrollPos > 400
            setIsScrolled(shouldShowShadow);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (login) {
            setIsMenuOpen(false);
        }
    }, [login])

    const logout = () => {
        setCard(!card)
        localStorage.removeItem('persist:root')
        window.location.href = '/';
    }

    useGSAP(() => {
        gsap.from(".navbar", {
            y: -80,
            opacity: 0,
            ease: "power1.inOut",
            duration: 1.2
        })
    }, [])


    return (
        <>
            <nav className={`navbar fixed top-0 left-0 z-[900] bg-white w-full right-0 transition-colors duration-500 ${isScrolled ? "bg-white/20  shadow-md text-black backdrop-blur-lg p-3 md:p-3.5" : "p-3 md:p-3.5"}`}>
                <div className={`flex items-center justify-between z-50 transition-all duration-500  container mx-auto  px-4 md:px-8 xl:px-0`} >
                    <button onClick={() => { navigate('/'), window.scrollTo(0, 0, { behavior: 'smooth' }) }} className="flex items-center gap-2 transition-all duration-500">
                        <img loading="lazy" src={logo} alt="logo" className={`h-10 ${isScrolled && "transition-all duration-500"} sm:h-12 md:h-14 `} />
                        {/* <h2 className={`font-tbLex font-bold  text-3xl text-black transition-all duration-700 delay-200 capitalize ${isScrolled ? "text-black" : "text-white"}`}>Ha<span className="text-primary">Max</span></h2> */}
                    </button>

                    <div className="hidden lg:flex items-center gap-4 lg:gap-8">
                        {navLinks.filter(link => link.name !== 'Profile').map((link, i) => (
                            <NavLink
                                key={i}
                                to={link.path}
                                onClick={() => {
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                    setIsMenuOpen(false);
                                }}
                                className={({ isActive }) => `group font-tbPop text-base font-medium flex flex-col gap-0.5 ${isScrolled ? "text-black" : "text-black"
                                    }`}
                            >
                                {({ isActive }) => (
                                    <>
                                        {link.name}
                                        <div className={`${isScrolled ? "bg-black" : "bg-black"
                                            } h-0.5 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                            }`} />
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </div>

                    {!login ? <div className="hidden lg:flex items-center gap-4">
                        <button className={`${formBtn1}  ${isScrolled ? "border border-transparent" : "bg-gradient-to-tl to-transparent from-transparent !bg-transparent border border-black"}`} onClick={() => navigate('/login')} >Login</button>
                        <button className={`${formBtn1}  ${isScrolled ? "border border-transparent" : "bg-gradient-to-tl to-transparent from-transparent !bg-transparent border border-black"}`} onClick={() => navigate('/register')} >Register</button>
                    </div> :
                        <div className={`hidden lg:flex items-center gap-4 ${isScrolled ? "text-black" : "text-black"}`} onClick={() => setCard(!card)}>
                            {/* <input
                            type="text"
                            placeholder="Search..."
                            className={`${isScrolled ? "outline-none py-2.5 px-4 text-base font-tbLex text-black rounded-lg bg-transparent border-[1.2px]  border-slate-600 w-[18rem]" : "outline-none py-2.5 px-4 text-base font-tbLex text-white rounded-lg bg-transparent border-[1.2px]  border-slate-300 w-[18rem]"} `}
                        /> */}
                            <img
                                alt="profile image"
                                src={user?.user?.profilePicture || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                                className="size-12 rounded-full border-2 border-black bg-slate1 cursor-pointer"
                            />
                        </div>}

                    <div className="flex items-center gap-3 lg:hidden">
                        <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className={`h-6 w-6 cursor-pointer  `} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <List size={30} color={!isScrolled ? "black" : "black"} weight='bold' />
                        </svg>
                    </div>

                    <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col lg:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                        <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
                            <X size={30} color="black" weight='bold' />
                        </button>

                        <div className="justify-center flex flex-col items-center gap-4">
                            {navLinks.map((link, i) => (
                                <NavLink
                                    key={i}
                                    to={link.path}
                                    onClick={() => {
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                        setIsMenuOpen(false);
                                    }}
                                    className={({ isActive }) => `group font-tbPop text-xl font-medium flex flex-col gap-0.5 text-black
                                    }`}
                                >
                                    {({ isActive }) => (
                                        <>
                                            {link.name}
                                            <div className={`bg-black h-0.5 transition-all text-black duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'
                                                }`} />
                                        </>
                                    )}
                                </NavLink>
                            ))}
                            {login && <button className={`${formBtn1} !bg-red-500 lg:hidden `} onClick={logout} >Logout</button>}
                        </div>

                        {!login && <div className="flex flex-col lg:flex items-center gap-4">
                            <button className={`${formBtn1}`} onClick={() => navigate('/login')} >Login</button>
                            <button className={`${formBtn1}`} onClick={() => navigate('/register')} >Register</button>
                        </div>}
                    </div>
                </div>
            </nav>

            {/* ============= profile seacation ========= */}
            <ProfileSection card={card} setCard={setCard} logout={logout} />
        </>

    );
}



const ProfileSection = ({ card, setCard, logout }) => {
    const user = useSelector(state => state.user.userDetails)
    return (
        <div className={`${card ? "-top-96 right-0 opacity-0" : "top-36 lg:right-[1.5rem] xl:right-[6.5rem] opacity-100"} bg-white/90 backdrop-blur-[3px]  transition-all ease-in-out duration-700 fixed   z-[100] rounded-xl hidden lg:block `}>
            <div className='absolute -top-2 right-6 bg-white z-20 h-4 w-4 rotate-45 rounded-sm' />
            <div
                className="z-20 items-center  text-start transition-opacity duration-100 border-none bg-white/90 backdrop-blur-[3px] text-lg  focus:outline-none w-screen sm:w-[11rem] py-3 rounded-xl shadow-xl"
                role="menu"
                aria-labelledby="user-profile-button"
                aria-orientation="vertical"
            >
                <ul className="focus:outline-none">
                    <div className="max-h-[300px] overflow-y-auto">
                        <div className="flex items-center flex-col  justify-center">
                            <h3 className='text-sm md:text-sm font-tbPop font-medium text-black'>{formatRole(user?.user?.role == "primary" ? "Primary Actor" : user?.user?.role == "secondary" ? "Secondary Actor" : user?.user?.role == "castingTeam" ? "Casting Team" : "Production Team")}</h3>
                            <span className='w-full h-0.5 rounded-full bg-primary inline-block my-2' />
                        </div>
                        <li role="menuitem" className="focus:outline-none">
                            <NavLink to={"/profile"} onClick={() => setCard(!card)}
                                className="cursor-pointer text-sm text-ld hover:text-primary focus:bg-hover focus:outline-none px-4 py-2 flex justify-between items-center bg-hover group/link w-full"
                            >
                                <div className="flex items-center w-full">
                                    <div className="h-8 w-8 flex-shrink-0 rounded-md flex justify-center items-center bg-lightprimary">
                                        <Profile size={25} className='group-hover/link:text-primary' variant='TwoTone' />
                                    </div>
                                    <div className="ps-2 flex justify-between w-full">
                                        <div className="w-3/4 -space-y-0.5">
                                            <h5 className="mb-1 text-sm font-tbLex group-hover/link:text-primary">My Profile</h5>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        </li>
                        <li role="menuitem" className="focus:outline-none">
                            <NavLink onClick={logout}
                                className="cursor-pointer text-sm text-ld hover:text-red-500 focus:bg-hover focus:outline-none px-4 py-2 flex justify-between items-center bg-hover group/link w-full"
                            >
                                <div className="flex items-center w-full">
                                    <div className="h-8 w-8 flex-shrink-0 rounded-md flex justify-center items-center bg-lightprimary">
                                        <LoginCurve size={25} className='group-hover/link:text-red-500' variant='TwoTone' />
                                    </div>
                                    <div className="ps-2 flex justify-between w-full">
                                        <div className="w-3/4 -space-y-0.5">
                                            <h5 className="mb-1 text-sm font-tbLex group-hover/link:text-red-500">Logout</h5>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                        </li>
                    </div>
                </ul>
            </div>

        </div>
    )
}

export default HomeNavbar
