import React, { useState } from 'react';
import styles from './SignIn.module.css';
import logo from "../../assets/logo.png";


const SignIn = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setLoginData({...loginData, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // logikę logowania
        console.log(loginData);
    };

    return (
        <div className="application-container">

            <nav className={styles.topMenu}>
                <img src={logo} className={styles.logo} alt="Akademia Tarnowska Logo"/>
            </nav>
            <div className={styles.applicationFormContainer}>

                <h2>Logowanie</h2>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <div className={styles.formRow}>
                        <label htmlFor="username">Nazwa użytkownika</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={loginData.username}
                            onChange={handleChange}
                            placeholder="Nazwa użytkownika"
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formRow}>
                        <label htmlFor="password">Hasło</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={loginData.password}
                            onChange={handleChange}
                            placeholder="Hasło"
                            className={styles.input}
                        />
                    </div>
                    <div className={styles.formActions}>
                        <button type="submit" className={styles.button}>Zaloguj się</button>
                    </div>
                </form>
            </div>
        </div>
    )
        ;
};
export default SignIn;
