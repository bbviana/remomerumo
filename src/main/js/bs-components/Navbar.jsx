import React, { PropTypes, Component } from 'react'

const Navbar = ({children}) =>
    <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
            <div className="navbar-header">
                <a className="navbar-brand" href="#">
                    {children}
                </a>
            </div>
        </div>
    </nav>


export default Navbar
