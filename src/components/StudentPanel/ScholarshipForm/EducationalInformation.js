import React from 'react';
import styles from './ScholarshipForm.module.css';
import {specializations,  educationLevels, studyYears, studySystems} from "../../../data/formData";

const EducationalInformation = ({ formik, handlePrevious, attachment, handleFileUpload, handleRemoveAttachment, setAttachment  }) => {
    const convertFileToBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        try {
            const base64 = await convertFileToBase64(file);
            setAttachment(base64); // Zakładając, że masz stan `attachment` do przechowywania zakodowanego pliku
        } catch (error) {
            console.error("Błąd przy konwersji pliku:", error);
        }
    };

    return (
        <div>
            {formik.touched.specialization && formik.errors.specialization && (
                <div className={styles.errorMessage}>{formik.errors.specialization}</div>
            )}
            <div className={styles.formRow}>
                <label htmlFor="specialization" className={styles.label}>Specjalizacja</label>
                <select
                    id="specialization"
                    name="specialization"
                    value={formik.values.specialization}
                    onChange={formik.handleChange}
                    className={styles.input}
                    onBlur={formik.handleBlur}

                >
                    <option value="">Wybierz...</option>
                    {specializations.map((spec, index) => (
                        <option key={index} value={spec}>{spec}</option>
                    ))}
                </select>

            </div>
            {formik.touched.educationLevel && formik.errors.educationLevel && (
                <div className={styles.errorMessage}>{formik.errors.educationLevel}</div>
            )}
            <div className={styles.formRow}>
                <label htmlFor="educationLevel" className={styles.label}>Poziom kształcenia</label>
                <select
                    id="educationLevel"
                    name="educationLevel"
                    value={formik.values.educationLevel}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={styles.input}
                >
                    <option value="">Wybierz...</option>
                    {educationLevels.map((level, index) => (
                        <option key={index} value={level}>{level}</option>
                    ))}
                </select>

            </div>
            {formik.touched.studyYear && formik.errors.studyYear && (
                <div className={styles.errorMessage}>{formik.errors.studyYear}</div>
            )}
            <div className={styles.formRow}>
                <label htmlFor="studyYear" className={styles.label}>Rok studiów</label>
                <select
                    id="studyYear"
                    name="studyYear"
                    value={formik.values.studyYear}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={styles.input}
                >
                    <option value="">Wybierz...</option>
                    {studyYears.map((year, index) => (
                        <option key={index} value={year}>{year}</option>
                    ))}
                </select>

            </div>
            {formik.touched.studySystem && formik.errors.studySystem && (
                <div className={styles.errorMessage}>{formik.errors.studySystem}</div>
            )}
            <div className={styles.formRow}>
                <label htmlFor="studySystem" className={styles.label}>System studiów</label>
                <select
                    id="studySystem"
                    name="studySystem"
                    value={formik.values.studySystem}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={styles.input}
                >
                    <option value="">Wybierz...</option>
                    {studySystems.map((system, index) => (
                        <option key={index} value={system}>{system}</option>
                    ))}
                </select>
            </div>
            <div className={styles.formRow}>
                <label htmlFor="file" className={styles.label}>Załącznik:</label>
                <div className={styles.fileInputContainer}>
                    <input
                        id="file"
                        name="file"
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf"
                        className={styles.input}
                    />
                </div>
                {attachment && (
                    <div className={styles.attachmentItem}>
                        <span className={styles.attachmentName}>{attachment.file.name}</span>
                        <button type="button" onClick={handleRemoveAttachment} className={styles.removeAttachmentButton}>Usuń</button>
                    </div>
                )}
            </div>
            <div style={{marginTop: '20px'}}>
                <button onClick={handlePrevious} type="button" className={styles.buttonSubmit}
                        style={{marginRight: '10px'}}>Powrót
                </button>
                <button type="submit" className={styles.buttonSubmit}>Wyślij</button>
            </div>
        </div>
    );
};

export default EducationalInformation;
