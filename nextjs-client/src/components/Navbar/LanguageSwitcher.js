import { Select, MenuItem, Box, FormControl } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const router = useRouter();

    const languageArr = [
        { code: 'en', img: '/static/flags/en.jpeg', label: 'English' },
        { code: 'bg', img: '/static/flags/bg.jpeg', label: 'Български' }
    ];

    const handleChange = (event) => {
        const selectedLanguage = event.target.value;

        i18n.changeLanguage(selectedLanguage);

        router.push(router.pathname, router.asPath, { locale: selectedLanguage });
    }

    return (
        <FormControl sx={{ minWidth: "min-content" }} fullWidth size="small">
            <Select
                value={i18n.language? i18n.language : "bg"}
                sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                onChange={handleChange}
            >
                {languageArr.map((el, index) => (
                    <MenuItem value={el.code} key={index}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <img
                                alt={el.label}
                                src={el.img}
                                width="30"
                                style={{ marginRight: '10px' }}
                            />
                            {el.label}
                        </Box>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default LanguageSwitcher;