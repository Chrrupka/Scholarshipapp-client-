// Status.js
import React, {useEffect, useState} from 'react';
import styles from './Status.module.css';
import TopMenu from "../TopMenu/TopMenu";
import axios from "axios";
import {useAuth} from "../../../hooks/useAuth";
import {useNavigate} from "react-router-dom";


const Status = () => {
    const [scholarshipData, setScholarshipData]=useState([]);
    const navigate = useNavigate(); // Używamy useNavigate tutaj

    useAuth();

    useEffect(() => {
        axios.get('http://localhost:3000/api/applications') // Zastąp 'localhost:3000' rzeczywistym adresem Twojego serwera backendowego
            .then(response => {
                const filteredData = response.data.filter(item => item.status !== 'Odrzucony' && item.status !== 'Zaakceptowany');
                setScholarshipData(filteredData);
            })
            .catch(error => {
                console.error("There was an error fetching the scholarship data:", error);
            });
    }, []);
    const handleViewDetails = (id) => {
        navigate(`/details/${id}`); // Użyj ścieżki zgodnej z konfiguracją Twojego routingu
    };

    return (

        <div className="application-container">
            <TopMenu/>
            <div className={styles.statusContainer}>
                <h2>Archiwum Stypendiów</h2>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th className={styles.th}>Id stypendium</th>
                        <th className={styles.th}>Data</th>
                        <th className={styles.th}>Rodzaj</th>
                        <th className={styles.th}>Status</th>
                        <th className={styles.th}>Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {scholarshipData.map((item) => (
                        <tr key={item.id}>
                            <td className={styles.td}>{item.id}</td>
                            <td className={styles.td}>{new Date(item.createdAt).toLocaleDateString()}</td>                             <td className={styles.td}>{item.type}</td>
                            <td className={styles.td}>{item.status}</td>
                            <td className={styles.td}>
                                <button className={styles.button}
                                        onClick={() => handleViewDetails(item.id)}>Zobacz
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Status;
