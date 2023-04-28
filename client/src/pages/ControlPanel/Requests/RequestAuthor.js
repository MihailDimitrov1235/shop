import { useTranslation } from 'react-i18next';

const RequestAuthor = () =>{
    const { t, i18n } = useTranslation();

    const data = [
        {id: 1, name:"Mihail", timePassedInHours: 100},
        {id: 1, name:"Mihail", timePassedInHours: 100},
        {id: 1, name:"Mihail", timePassedInHours: 100},
        {id: 1, name:"Mihail", timePassedInHours: 100},
        {id: 1, name:"Mihail", timePassedInHours: 100},
        {id: 1, name:"Mihail", timePassedInHours: 100},
    ]
    
    const headings = [
        { id: 'id', label: t('author-id'), order: true },
        { id: 'name', label: t('name'), order: true },
        { id: 'email', label: t('email'), order: true },
        { id: 'phone', label: t('phone'), order: false},
    ];

    return(
    <>

    </>
    )
}

export default RequestAuthor