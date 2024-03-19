import React, { useState } from 'react';
import styles from './ScholarshipForm.module.css';
import TopMenu from "../TopMenu/TopMenu";
import PersonalInformation from './PersonalInformation';
import EducationalInformation from './EducationalInformation';
import {educationalInformationSchema,personalInformationSchema} from "../../../utils/validation";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from "axios";
import {useAuth} from "../../../hooks/useAuth";

const authToken = sessionStorage.getItem('authToken');

const createAttachment = async (attachmentPayload) => {
    const response = await axios.post('http://localhost:3000/api/attachment', attachmentPayload, {
        headers: {
            Authorization: `Bearer ${authToken}`
        },
    });
    return response.data;
};

// Similarly implement createDetails and createApplication according to your API
const createDetails = async (detailsPayload) => {
    const response = await axios.post('http://localhost:3000/api/details', detailsPayload, {
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
    return response.data;
};

const createApplication = async (applicationPayload) => {
    const response = await axios.post('http://localhost:3000/api/application', applicationPayload,{
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
    return response.data;
};
const createStudent = async (studentPayload) => {
    const response = await axios.post('http://localhost:3000/api/student', studentPayload,{
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    });
    return response.data;
};
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
    useAuth();
    const [step, setStep] = useState(1);
    const [attachment, setAttachment] = useState(null);
    const convertFileToBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            pesel: '',
            albumNumber: '',
            email: '',
            phoneNumber: '',
            address: '',
            specialization: '',
            studyYear: '',
            educationLevel: '',
            studySystem: '',
            type:'',
            status:'Wysłane',
            file: null,
        },

        validationSchema: getCurrentValidationSchema(step),
        onSubmit: async (values) => {
            const attachmentPayload = new FormData();
            // Sprawdzenie, czy plik został dodany i dodanie go do ładunku
            if (attachment?.file) {
                attachmentPayload.append("file", attachment.file);
            }

            try {
                // Tworzenie załącznika, szczegółów i aplikacji w odpowiedniej kolejności
                const newAttachment = attachment ? await createAttachment(attachmentPayload) : null;
                const detailsPayload = {
                    // Uzupełnij szczegóły na podstawie wartości formularza
                    specialization: values.specialization,
                    education_level: values.educationLevel,
                    study_system: values.studySystem,
                    current_study_year: values.studyYear,
                };
                const newDetails = await createDetails(detailsPayload);

                if (newDetails) {
                    const newApplicationPayload = {
                        // Uzupełnij ładunek dla aplikacji
                        album_id: values.albumNumber,
                        type: values.type,
                        details_id: newDetails.id,
                        status: values.status,
                        attachment_id: newAttachment ? newAttachment.id : undefined,
                    };
                    const newApplication = await createApplication(newApplicationPayload);

                    console.log("Nowa aplikacja utworzona:", newApplication);

                    if(newApplication) {
                        const newStudentPayload = {
                            applicationId: newApplication.id,
                            name: values.firstName,
                            surname: values.lastName,
                            email: values.email,
                            album_id: values.albumNumber,
                            pesel: values.pesel,
                            phone_number: values.phoneNumber,
                            address: values.address,
                        };
                        const newStudent = await createStudent(newStudentPayload);
                        console.log("Nowy student utworzony:", newStudent);
                    }
                }
            } catch (error) {
                console.error("Błąd podczas wysyłania formularza:", error);
                // Tutaj możesz obsłużyć błąd, np. wyświetlając komunikat dla użytkownika
            }
        },
    });

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        convertFileToBase64(file).then(base64 => {
            setAttachment({
                file: base64,
                filePreview: URL.createObjectURL(file),
            });
        }).catch(error => console.error("Error converting file:", error));
    };

    const handleRemoveAttachment = () => {
        setAttachment(null);
    };



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
                            handleFileUpload={handleFileUpload}
                        />
                    )}
                </form>
            </div>
        </div>
    );
};


export default ScholarshipForm;
