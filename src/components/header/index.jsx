import React, { Component } from 'react'
import './index.css'
import Logo from '../logo/index'
import HeaderText from './headerText/index'

export default class Header extends Component {
  render() {
    return (
      <div className='header'>
        <h1>UNDER CONSTRUCTION :(</h1>
	<Logo height={170} width={170}/>
	<HeaderText text={"{OLD SITE}"}
		    color={"#ec95bc"}
		    font={"Arial, Helvetica, sans-serif"}
		    size={"160%"}
		    href={"https://github.com/connorwalsh/connorwalsh.github.io/tree/master/old"}
		    />
	<HeaderText text={"{CODE}"}
		    color={"#5cb2fb"}
		    font={"Arial, Helvetica, sans-serif"}
		    size={"160%"}
		    href={"http://www.github.com/connorwalsh"}
		    />
      </div>
    )
  }
}
