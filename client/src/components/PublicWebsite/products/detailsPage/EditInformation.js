import { Box, Typography, Stack, Chip, TextField, Tab, Tabs } from '@mui/material';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import RichTextEditor from '../../../FormBuilder/RichTextEditor';

export default function EditInformation({
    name, nameLang, handleNameChange, handleNameLangChange, 
    authors, 
    desc, descLang, handleDescChange, handleDescLangChange
}) {
    const { t, i18n } = useTranslation();
    return (
        <>
            <Box textAlign="center">
                {/* <Typography variant="h2">{name}</Typography> */}
                <Tabs value={nameLang} onChange={handleNameLangChange}  indicatorColor='inherit' textColor='inherit'>
                    <Tab value={'bg'} label={t('bulgarian')}/>
                    <Tab value={'en'} label={t('english')}/>
                </Tabs>
                <TextField id='name' value={name} fullWidth onChange={handleNameChange}
                    inputProps={{ style: { textAlign: 'center', fontSize:'30px' }}}
                />
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        mt: 2
                    }}
                >
                    {authors.map((author) => (
                        <Chip
                            sx={{
                                mb: 1,
                            }}
                            component={Link}
                            label={author.name}
                            to={"/author/" + author.author_id}
                            clickable
                            key={author.author_id}
                        />
                    ))}
                </Stack>
            </Box>
            <Box sx={{ textAlign: "center", height: "100%", mt: 5 }}>
                <Tabs value={descLang} onChange={handleDescLangChange}  indicatorColor='inherit' textColor='inherit'>
                    <Tab value={'bg'} label={t('bulgarian')}/>
                    <Tab value={'en'} label={t('english')}/>
                </Tabs>
                <RichTextEditor value={desc} onChange={handleDescChange} />
                {/* <TextField id='name' value={desc} fullWidth onChange={handleDescChange}
                    inputProps={{ style: { textAlign: 'center', fontSize:'30px' }}}
                /> */}
                {/* <div
                    dangerouslySetInnerHTML={{
                        __html: desc,
                    }}
                /> */}
            </Box>
        </>
    )
};