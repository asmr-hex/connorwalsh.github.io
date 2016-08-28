import React, { Component } from 'react'

export default class HeaderText extends Component {
    render() {
	let {text, color, font, size, href} = this.props
	let style = {
	    marginTop: '20px',
	    marginLeft: '15px',
	    color: color || '#ffffff',
	    fontFamily: font || '"Comic Sans MS", cursive, sans-serif',
	    fontSize: size || '100%',
	    fontWeight: 'bold',
	}
	let anchorStyle = {
	    color: 'inherit',
	    textDecoration: 'inherit',
	}
	

	return (
	    <div className='headerText' style={{...style}}>
		<a href={href} style={{...anchorStyle}}> 
		    {text}
		</a>
	    </div>
	)
    }
}
