// Status.js
import React, {useEffect, useState} from 'react';
import styles from './Status.module.css';
import TopMenu from "../TopMenu/TopMenu";
import axios from "axios";
import {useAuth} from "../../../hooks/useAuth";
import {useNavigate} from "react-router-dom";

/*const scholarshipData = [
    { date: '2023-01-01', type: 'socjalne', status: 'Odrzucone', id: 1 },
    { date: '2023-02-15', type: 'rektorskie', status: 'Zaakceptowane', id: 2 },
];*/

const Status = () => {
    const [scholarshipData, setScholarshipData]=useState([]);
    const navigate = useNavigate(); // Używamy useNavigate tutaj

    useAuth();

    useEffect(() => {
        axios.get('http://localhost:3000/api/applications') // Zastąp 'localhost:3000' rzeczywistym adresem Twojego serwera backendowego
            .then(response => {
                setScholarshipData(response.data);
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
                        <th className={styles.th}>Data</th>
                        <th className={styles.th}>Rodzaj Stypendium</th>
                        <th className={styles.th}>Status</th>
                        <th className={styles.th}>Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {scholarshipData.map((item) => (
                        <tr key={item.id}>
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
