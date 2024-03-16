import React from 'react';
import styles from './ScholarshipForm.module.css';
const PersonalInformation = ({ formik, handleNext }) => {

    return (
        <div className="personal-info-container">
            {formik.touched.firstName && formik.errors.firstName && (
                <div className={styles.errorMessage}>{formik.errors.firstName}</div>
            )}
            <div className={styles.formRow}>
                <label htmlFor="firstName" className={styles.label}>Imię:</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    placeholder="Wpisz swoje imię"
                    className={styles.input}
                    onBlur={formik.handleBlur}

                />

            </div>
            {formik.touched.lastName && formik.errors.lastName && (
                <div className={styles.errorMessage}>{formik.errors.lastName}</div>
            )}
            <div className={styles.formRow}>
                <label htmlFor="lastName" className={styles.label}>Nazwisko:</label>
                <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    placeholder="Wpisz swoje nazwisko"
                    className={styles.input}
                    onBlur={formik.handleBlur}

                />

            </div>
            {formik.touched.pesel && formik.errors.pesel && (
                <div className={styles.errorMessage}>{formik.errors.pesel}</div>
            )}
            <div className={styles.formRow}>
                <label htmlFor="pesel" className={styles.label}>Pesel:</label>
                <input
                    id="pesel"
                    name="pesel"
                    value={formik.values.pesel}
                    onChange={formik.handleChange}
                    placeholder="Wpisz swój numer pesel"
                    className={styles.input}
                    onBlur={formik.handleBlur}


                />

            </div>
            {formik.touched.albumNumber && formik.errors.albumNumber&& (
                <div className={styles.errorMessage}>{formik.errors.albumNumber}</div>
            )}
            <div className={styles.formRow}>
                <label htmlFor="albumNumber" className={styles.label}>Numer albumu:</label>
                <input
                    id="albumNumber"
                    name="albumNumber"
                    value={formik.values.albumNumber}
                    onChange={formik.handleChange}
                    placeholder="Wpisz swój numer numer albumu"
                    className={styles.input}
                    onBlur={formik.handleBlur}


                />

            </div>
            {formik.touched.email && formik.errors.email && (
                <div className={styles.errorMessage}>{formik.errors.email}</div>
            )}
            <div className={styles.formRow}>
                <label htmlFor="email" className={styles.label}>Adres email:</label>
                <input
                    id="email"

                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder="Wpisz swój numer adres email"
                    className={styles.input}
                    onBlur={formik.handleBlur}


                />

            </div>
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className={styles.errorMessage}>{formik.errors.phoneNumber}</div>
            )}
            <div className={styles.formRow}>
                <label htmlFor="phoneNumber" className={styles.label}>Numer telefonu:</label>
                <input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    placeholder="Wpisz swój numer numer telefonu"
                    className={styles.input}
                    onBlur={formik.handleBlur}


                />

            </div>
            {formik.touched.address && formik.errors.address && (
                <div className={styles.errorMessage}>{formik.errors.address}</div>
            )}
            <div className={styles.formRow}>
                <label htmlFor="address" className={styles.label}>Adres:</label>
                <input
                    id="address"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    placeholder="Wpisz swój numer adres zamieszkania"
                    className={styles.input}
                    onBlur={formik.handleBlur}


                />

            </div>

            <button type="button" onClick={handleNext} className={styles.buttonSubmit} disabled={formik.isSubmitting}>
                Dalej
            </button>
              </div>
    );
};

export default PersonalInformation;
