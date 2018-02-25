import React, { Component } from 'react';
import FaBars from 'react-icons/lib/fa/bars'

class Menu extends Component {
    render() {
        return (
            <div className="menu">
                <h1 className="menu-button"><FaBars /></h1>
            </div>
        );
    }
}

export default Menu;
