import { useState } from 'react';
import { Box, Typography, Stack, Chip, TextField, Tab, Tabs, Button, Autocomplete, Avatar, FormControl } from '@mui/material';
import Link from 'next/link';
import { useTranslation } from "react-i18next";
import RichTextEditor from '../../../FormBuilder/RichTextEditor';
import AutocompleteCheckboxes from '../../../filters/AutocompleteCheckboxes';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function EditInformation({
    name, nameLang, handleNameChange, handleNameLangChange, 
    authors, authorOptions,
    productBG, productEN, setProductBG, setProductEN,
    product, setProduct
}) {

    const [desc, setDesc] = useState(productBG.shortDescription)
    const [descLang, setDescLang] = useState('bg')

    const handleDescChange = (editorState, markup) =>{
        setDesc(markup)
        if(descLang === 'bg'){
            let newProps = productBG
            newProps.shortDescription = markup
            setProductBG(newProps)
        }else if(descLang === 'en'){
            let newProps = productEN
            newProps.shortDescription = markup
            setProductEN(newProps)
        }
    }

    const handleDescLangChange = (event, newValue) =>{
        setDescLang(newValue)
        if(newValue === 'bg'){
            setDesc(productBG.shortDescription)
        }else if(newValue === 'en'){
            setDesc(productEN.shortDescription)
        }
    }

    const handleSelectAuthor = (event, value) => {
        let newProduct = product
        newProduct.authors = value;
        setProduct(newProduct)
    }

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
                <Stack spacing={3} sx={{ width: '100%', mt:4 }}>
                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={authorOptions}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) => option.author_id === value.author_id}
                        defaultValue={authors}
                        onChange={handleSelectAuthor}
                        filterSelectedOptions
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder={t('authors')}
                        />
                        )}
                    />
                    </Stack>

            </Box>
            <Box sx={{ textAlign: "center", height: "100%", mt: 4 }}>
                <Tabs value={descLang} onChange={handleDescLangChange}  indicatorColor='inherit' textColor='inherit'>
                    <Tab value={'bg'} label={t('bulgarian')}/>
                    <Tab value={'en'} label={t('english')}/>
                </Tabs>
                <Box display={descLang==='bg' ? 'block' : 'none'}>
                    <RichTextEditor value={productBG.shortDescription} setFieldValue={handleDescChange} />
                </Box>
                <Box display={descLang==='en' ? 'block' : 'none'}>
                    <RichTextEditor value={productEN.shortDescription} setFieldValue={handleDescChange} />
                </Box>
            </Box>
        </>
    )
};