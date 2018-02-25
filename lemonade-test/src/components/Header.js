import React, { Component } from 'react';
import Menu from './Menu';
import FaRefresh from 'react-icons/lib/io/ios-refresh-empty'


class Header extends Component {
    render() {
        return (
            <div className="header">
                <Menu />
                <h2 className="header-title">Lemonade</h2>
                <h2 className="header-reload"><FaRefresh /></h2>
            </div>
        );
    }
}

export default Header;
