import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/shop.png";
import { FaSearch } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaUser } from "react-icons/fa";


const options = {
  burgerColorHover: "#be101b",
  logo,
  logoWidth: "5vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#be101b",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#be101b",
  link1Margin: "1vmax",
  
  searchIcon:true,
  SearchIconElement:FaSearch,  
  SearchIconUrl:"/search",
  searchIconSize:"2vmax",
  searchIconTransition: 0.5,
  searchIconAnimationTime:2,
  searchIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColorHover: "#eb4034",
  searchIconMargin:"1vmax",

  profileIcon:true,
  ProfileIconElement:FaUser,
  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  profileIconSize:"2vmax",
  profileIconMargin:"1vmax",
  
  cartIcon:true,
  cartIconMargin:"1vmax",
  CartIconElement: FaShoppingBag,
  cartIconUrl:"/cart",
  cartIconColor: "rgba(35, 35, 35,0.8)",  
  cartIconColorHover: "#eb4034",
  cartIconSize:"2vmax",
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;