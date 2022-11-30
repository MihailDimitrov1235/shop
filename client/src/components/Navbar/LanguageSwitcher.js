import { Select, MenuItem, Box, FormControl } from '@mui/material';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const languageArr = [
        { code: 'en', img: '/static/flags/en.jpeg', label: 'English' },
        { code: 'bg', img: '/static/flags/bg.jpeg', label: 'Български' }
    ];

    const handleChange = (event) => {
        i18n.changeLanguage(event.target.value);
    }

    return (
        <FormControl sx={{ minWidth: "min-content" }} fullWidth size="small">
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={i18n.language}
                label="Age"
                sx={{ boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 } }}
                onChange={handleChange}
            >
                {languageArr.map((el, index) => (
                    <MenuItem value={el.code} key={index}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
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