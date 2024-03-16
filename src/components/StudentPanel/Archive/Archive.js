// Status.js
import React from 'react';
import styles from './Archive.module.css';
import TopMenu from "../TopMenu/TopMenu";

const scholarshipData = [
    { date: '2023-01-01', type: 'socjalne', status: 'Odrzucone', id: 1 },
    { date: '2023-02-15', type: 'rektorskie', status: 'Zaakceptowane', id: 2 },
    // Dodaj więcej danych tutaj
];

const Archive = () => {
/*podpięcie details
  const history = useHistory();
    const viewDetails = (id) => {
        history.push(`/archive/${id}`);
    };*/
    return (

        <div className="application-container">
            <TopMenu/>
            <div className={styles.archiveContainer}>
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
                        <td className={styles.td}>{item.date}</td>
                        <td className={styles.td}>{item.type}</td>
                        <td className={styles.td}>{item.status}</td>
                        <td className={styles.td}>
                            <button className={styles.button}
                                    onClick={() => alert(`Wybrano stypendium ${item.id}`)}>Zobacz
                            </button>
{/*
                            <button className={styles.button} onClick={() => viewDetails(item.id)}>Zobacz</button>
*/}

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default Archive;
