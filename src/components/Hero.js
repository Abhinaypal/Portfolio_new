import React from 'react';
import "./Hero.css";

function Hero(){
    return (
        <div className="hero">
            <div className="left">
                <h1>Abhinay Pal</h1>

                <p>
                    Hello there! I'm Akash, a passionate <br />
                    [Graphic Designer/Web Developer/UI-UX Enthusiast], <br />
                    breathing life into ideas through the magic of design <br />
                    and technology.
                </p>
                <img src="/arrow.png" alt="btn" className="arrow-btn" />
            </div>

            <div className='right'>
                <img src='/hero.png' alt='hero' />
            </div>
            
        </div>
    );
}

export default Hero;