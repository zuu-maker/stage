import React,{useEffect,useState} from 'react';
import './userProfile.css'
import axios from 'axios'
// === include 'setup' then 'config' above ===
import ProgressBar from 'react-bootstrap/ProgressBar'
import {useUser} from "../../contexts/userContext";
import Bar from "../../components/bar";
import {useAuth} from "../../contexts/authContext";
function Graph({props})  {
    const {user} = useAuth();

    return (
        <div className="graph p-4">
            <div className={`d-flex text-light`}>
                <h4>Winning ratio</h4>
                <span className={`ml-auto`}>$ {user.balance}</span>

            </div>
            <div className={` d-flex `}>
                <Bar value={60} day={'MON'}/>
                <Bar value={60} day={'TUE'}/>
                <Bar value={60} day={'WED'}/>
                <Bar value={60} day={'THUR'}/>
                <Bar value={60} day={'FRI'}/>
                <Bar value={60} day={'SAT'}/>
                <Bar value={60} day={'SUN'}/>

            </div>

        </div>
    );
};

export default Graph;