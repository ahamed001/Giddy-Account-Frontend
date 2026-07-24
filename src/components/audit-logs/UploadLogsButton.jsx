import { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FiUploadCloud } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { uploadLogs } from '../../redux/thunks/auditLogThunks';
import { resetUploadStatus } from '../../redux/slices/auditLogSlice';

const validationSchema = Yup.object({
    file: Yup.mixed()
        .required('Select a JSON file to upload')
        .test('is-json', 'File must be a .json file', (file) => file && file.name?.toLowerCase().endsWith('.json')),
});

function readFileAsJson(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            try {
                resolve(JSON.parse(reader.result));
            } catch {
                reject(new Error('File does not contain valid JSON'));
            }
        };
        reader.onerror = () => reject(new Error('Unable to read file'));
        reader.readAsText(file);
    });
}

export default function UploadLogsButton() {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const upload = useSelector((state) => state.auditLogs.upload);

    const formik = useFormik({
        initialValues: { file: null },
        validationSchema,
        onSubmit: async (values, { setFieldError, resetForm }) => {
            try {
                const parsed = await readFileAsJson(values.file);
                if (!Array.isArray(parsed)) {
                    setFieldError('file', 'JSON file must contain an array of log records');
                    return;
                }
                await dispatch(uploadLogs(parsed)).unwrap();
                resetForm();
                if (inputRef.current) inputRef.current.value = '';
            } catch (error) {
                setFieldError('file', error.message || 'Upload failed');
            }
        },
    });

    const isUploading = upload.status === 'loading' || formik.isSubmitting;

    return (
        <form className="upload-form" onSubmit={formik.handleSubmit}>
            <input
                ref={inputRef}
                id="upload-file"
                type="file"
                accept="application/json,.json"
                className="upload-form__input"
                disabled={isUploading}
                onChange={(event) => {
                    formik.setFieldValue('file', event.currentTarget.files[0] || null);
                    dispatch(resetUploadStatus());
                }}
            />
            <label
                htmlFor="upload-file"
                className={`btn btn--primary${isUploading ? ' btn--disabled' : ''}`}
            >
                <FiUploadCloud aria-hidden="true" />
                {formik.values.file ? formik.values.file.name : 'Choose JSON file'}
            </label>
            <button type="submit" className="btn btn--secondary" disabled={isUploading || !formik.values.file}>
                {isUploading && <span className="spinner spinner--sm" aria-hidden="true" />}
                {isUploading ? 'Uploading...' : 'Upload logs'}
            </button>

            {formik.errors.file && <p className="upload-form__error">{formik.errors.file}</p>}

            {upload.status === 'succeeded' && upload.stats && (
                <p className="upload-form__success">
                    Received {upload.stats.received}, inserted {upload.stats.inserted}, duplicates {upload.stats.duplicates}, failed {upload.stats.failed}.
                </p>
            )}
            {upload.status === 'failed' && (
                <p className="upload-form__error">{upload.error}</p>
            )}
        </form>
    );
}
