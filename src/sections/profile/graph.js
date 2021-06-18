import React,{useEffect,useState} from 'react';
import './userProfile.css'
import axios from 'axios'
// === include 'setup' then 'config' above ===
import {Line,Bar} from 'react-chartjs-2'
const Graph = () => {
    const [chartData, setChartData] = useState({});
    const [employeeSalary, setEmployeeSalary] = useState([]);
    const [employeeAge, setEmployeeAge] = useState([]);

    const chart = () => {
        let empSal = [];
        let empAge = [];
        axios
            .get("http://dummy.restapiexample.com/api/v1/employees")
            .then(res => {
                console.log(res);
                for (const dataObj of res.data.data) {
                    empSal.push(parseInt(dataObj.employee_salary));
                    empAge.push(parseInt(dataObj.employee_age));
                }
                setChartData({
                    labels: ['SUN','MON','TUE','WEN','THUR','FRI','SAT'],
                    datasets: [
                        {

                            data: empSal,
                            backgroundColor: ["#18FF00"],
                            borderWidth: 2

                        }

                    ]
                });
            })
            .catch(err => {
                console.log(err);
            });
        console.log(empSal, empAge);
    };

    useEffect(() => {
        chart();
    }, []);
    return (
        <div className="graph">
            <div>

            </div>
        </div>
    );
};

export default Graph;