import React from 'react';
import './EnterpriseSidebar.css';
import {Link} from 'react-router-dom';
import {IoIosSettings} from 'react-icons/io';
import {AiFillPlusCircle} from 'react-icons/ai';

function EnterpriseSidebar({theme}: any) {
    return (
        <div className="enterpriseSidebar-container" style={{backgroundColor: theme ? '#212121' : '#F1F0F0'}}>
            <div className="sidebar-links-container">
                <Link id="link" to={""}>Kuva pakkumisi
                    <IoIosSettings id="setting-icon" />
                </Link>
                <Link id="link" to={""}>Loo pakkumine
                    <AiFillPlusCircle id="sidebar-plus-icon" />
                </Link>
            </div>
        </div>
    );
}

export default EnterpriseSidebar;