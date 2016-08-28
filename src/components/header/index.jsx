import React, { Component } from 'react'
import './index.css'
import Logo from '../logo/index'
import HeaderText from './headerText/index'

export default class Header extends Component {
    render() {
	return (
	    <div className='header'>
		<Logo height={170} width={170}/>
		<HeaderText text={"GARBAGE"}
			    color={"#ec95bc"}
			    font={"Arial, Helvetica, sans-serif"}
			    size={"160%"}
			    href={"www.google.com"}
		/>
		<HeaderText text={"CODE"}
			    color={"#5cb2fb"}
			    font={"Arial, Helvetica, sans-serif"}
			    size={"160%"}
			    href={"www.github.com/connorwalsh"}
		/>
		<HeaderText text={"LIFE SUX"}
			    color={"#f9f895"}
			    font={"Arial, Helvetica, sans-serif"}
			    size={"160%"}
			    href={"www.google.com"}
		/>
	    </div>
	)
    }
}