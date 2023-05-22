import React, { useRef } from 'react'
import {Container, Row, Col} from "reactstrap"
import {AiFillPhone, AiOutlineLogin, AiOutlineUser, AiFillCar, AiOutlineFieldTime, AiOutlineSearch, AiOutlineMenu} from "react-icons/ai"
import {HiOutlineLocationMarker} from "react-icons/hi"
import {Link, NavLink} from "react-router-dom"
import "../../styles/header.css"

const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/tutors",
    display: "Tutors",
  },
  {
    path: "/cars",
    display: "Renting cars",
  },
  {
    path: "/blogs",
    display: "Blog",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/earn-with-us",
    display: "Earn with us",
  },
  {
    path: "/join-us",
    display: "Join us",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {  
  const menuRef = useRef(null)
  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

  return (
    <header className='header'>
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className='header__top__left'>
                <span>Need Help ?</span>
                <span className='header__top__help'>
                  <AiFillPhone size={20}/>
                  +1-202-555-0149
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6">
              <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                <Link to="/signin" onClick={window.Location.href = "/signin"} className='d-flex align-items-center gap-1'>
                  <AiOutlineLogin color='black' size={21}/>
                  <span>Login</span>
                </Link>
                <Link to="/signup" onClick={window.Location.href = "/signup"} className='d-flex align-items-center gap-1'>
                  <AiOutlineUser color='black' size={21}/>
                  <span>Register</span>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className='header__middle'>
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className='d-flex align-items-center gap-2'>
                    <AiFillCar size={35}/>
                    <span>CarCoach</span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <HiOutlineLocationMarker size={35} color='#000d6b'/>
                <div className='header__location__content'>
                  <h4>Egypt</h4>
                  <h6>Cairo, El-Sheikh Zayed</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <AiOutlineFieldTime size={35} color='#000d6b'/>
                <div className='header__location__content'>
                  <h4>Sunday to Thursday</h4>
                  <h6>7am - 10pm</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className="header__btn btn ">
                <Link to="/contact">
                  <AiFillPhone size={18} />
                  <span>Request a call</span>
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="main__navbar">
        <Container>
        <div className="navigation__wrapper d-flex align-items-center justify-content-between">
          <AiOutlineMenu size={25} color='#ffff' className='mobile__menu' onClick={toggleMenu}/>

          <div className='navigation' ref={menuRef} onClick={toggleMenu}>
            <div className="menu">
              {navLinks.map((link, index)=>(
                <NavLink to={link.path} key={index} className={(navClass) =>
                  navClass.isActive ? "nav__active nav__item" : "nav__item"
                }>{link.display}</NavLink>
              ))}
            </div>
          </div>

            <div className="nav__right">
              <div className="search__box">
                <input type="text" placeholder="Search" />
                <AiOutlineSearch size={25} className='search__icon'/>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>

  )
}

export default Header