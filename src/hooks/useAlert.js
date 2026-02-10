import { useState } from 'react';

const useAlert = () => {
    const [alert, setAlert] = useState({ show: false, text: '', type: 'danger' });

    // Backwards compatible: allow { message } as well as { text }
    const showAlert = ({ text, message, type = 'danger' }) =>
        setAlert({ show: true, text: text ?? message ?? '', type });
    const hideAlert = () => setAlert({ show: false, text: '', type: 'danger' });

    return { alert, showAlert, hideAlert };
};

export default useAlert;
