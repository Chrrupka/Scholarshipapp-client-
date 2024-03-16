import React, { useState } from 'react';
import styles from './ScholarshipForm.module.css';
import TopMenu from "../TopMenu/TopMenu";
import PersonalInformation from './PersonalInformation';
import EducationalInformation from './EducationalInformation';
import {educationalInformationSchema,personalInformationSchema} from "../../../utils/validation";
import * as Yup from 'yup';
import { useFormik } from 'formik';


function getCurrentValidationSchema(step) {
    switch (step) {
        case 1:
            return Yup.object().shape({
                ...personalInformationSchema.fields,
            });
        case 2:
            return Yup.object().shape({
                ...educationalInformationSchema.fields,
            });
        default:
            return Yup.object().shape({});
    }
}

const ScholarshipForm = () => {
    const [step, setStep] = useState(1);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            pesel: '',
            albumNumber: '',
            email: '',
            phoneNumber: '',
            address: '',
            bankAccountNumber: '',
            specialization: '',
            studyYear: '',
            educationLevel: '',
            studySystem: '',
        },

        validationSchema: getCurrentValidationSchema(step),
        onSubmit: (values) => {
            console.log("Form data submitted:", values);

        },
    });

    const handleNext = () => {
        formik.validateForm().then((errors) => {
            console.log(errors);
            if (Object.keys(errors).length === 0) {
                setStep(currentStep => currentStep + 1);
            } else {
                formik.setTouched(
                    Object.keys(formik.values).reduce((touched, key) => {
                        touched[key] = true;
                        return touched;
                    }, {})
                );
            }
        });
    };


    const handlePrevious = () => {
        setStep(currentStep => currentStep - 1);
    };

/*    const handleSubmit = async (e) => {
        e.preventDefault();
        // Tutaj umieść logikę do obsługi wysyłania formularza, np. przez API
        console.log("Form data submitted:", formData);
        // Opcjonalnie: Resetuj formularz lub pokaż potwierdzenie itp.
    };*/

    return (
        <div className="application-container">
            <TopMenu/>
            <div className={styles.applicationFormContainer}>

                <h2>Wniosek o stypendium</h2>
                <form onSubmit={formik.handleSubmit}>
                    {step === 1 && (
                        <PersonalInformation
                            formik={formik}
                            handleNext={handleNext}
                        />
                    )}
                    {step === 2 && (
                        <EducationalInformation
                            formik={formik}
                            handlePrevious={handlePrevious}
                        />
                    )}
                </form>
            </div>
        </div>
    );
};


export default ScholarshipForm;
