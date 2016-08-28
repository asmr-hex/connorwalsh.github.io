import React, { Component } from 'react'
import lambda from 'img/lambda.png'


export default class Logo extends Component {
    render() {
	let {height, width} = this.props
	let size = {
	    height: height || 100,
	    width: width || 100,
	}
	let background = {
	    backgroundImage: `url(${lambda})`,
	    backgroundSize: 'contain',
	    backgroundPosition: 'center center',
	    backgroundRepeat: 'no-repeat',
	}

	return (
	    <div style={{...background, ...size}}/>
	)
    }
}
