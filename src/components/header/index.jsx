import React, { Component } from 'react'
import './index.css'
import Logo from '../logo/index'
import HeaderText from './headerText/index'
import dunnamoSpeaks from 'img/dunnamoSpeaks.gif'

export default class Header extends Component {
  render() {
    const size = {
      height: 300,
      width: 300,
    }
    const background = {
      bagroundImage: `url(${dunnamoSpeaks})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
    }
    return (
      <div>
        <Image source={{uri: 'img/dunnamoSpeaks.gif'}}/>
      </div>
    )
  }
}

  // <div className='dunnamoo' style={{...background, ...size}}/>

// <div className='header'>
//     <Logo height={170} width={170}/>
//     <HeaderText text={"{GARBAGE}"}
//     	    color={"#ec95bc"}
//     	    font={"Arial, Helvetica, sans-serif"}
//     	    size={"160%"}
//     	    href={"http://www.google.com"}
//     />
//     <HeaderText text={"{CODE}"}
//     	    color={"#5cb2fb"}
//     	    font={"Arial, Helvetica, sans-serif"}
//     	    size={"160%"}
//     	    href={"http://www.github.com/connorwalsh"}
//     />
//     <HeaderText text={"{LIFE SUX}"}
//     	    color={"#f9f895"}
//     	    font={"Arial, Helvetica, sans-serif"}
//     	    size={"160%"}
//     	    href={"http://www.google.com"}
//     />
// </div>
