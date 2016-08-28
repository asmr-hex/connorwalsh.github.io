import React, { Component } from 'react'
import './root.css'
import Header from '../header/index'
import lambda from 'img/lambda.png'
import Favicon from 'react-favicon'

export default class Root extends Component {
    render() {
	return (
	    <div className='root'>
		<Favicon url={lambda}/>
		<Header/>
	    </div>
	)
    }
}
