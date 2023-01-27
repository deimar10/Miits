import React from 'react';
import {useLocation} from 'react-router-dom';
import './EnterpriseSidebar.css';
import {Link} from 'react-router-dom';
import {IoIosSettings} from 'react-icons/io';
import {AiFillPlusCircle} from 'react-icons/ai';

function EnterpriseSidebar({theme}: any) {

    const enterpriseLoginInfo = useLocation();

    return (
        <div className="enterpriseSidebar-container" style={{
            backgroundColor: theme ? '#212121' : '#F1F0F0',
            border: theme ? '1px solid #cccccc' : '1px solid #cccccc'
        }}>
            <div className="sidebar-links-container">
                <Link id="link" to={`/enterprise/management/${enterpriseLoginInfo.state}`}>Kuva pakkumisi
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
