import React from 'react'
import './Header.css'
const Header = () => {
  return (
    <section className="h-wrapper">
      <div className="flexCenter innerWidth h-container">
        
        <h1>Weather App</h1>
        <div className="flexCenter h-menu">
            <a href="">Home</a>
            <a href="">News</a>
            <a href="">weather</a>
            <a href="">About</a>
            <a href="">Contact us</a>
            <button className='button'> 
                <a href="">Login</a>
            </button>
        </div>
      </div>
       
    </section>
  )
}

export default Header