import { useState } from 'react';
import { Box, Typography, Stack, Chip, TextField, Tab, Tabs, Button, IconButton } from '@mui/material';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import RichTextEditor from '../../../FormBuilder/RichTextEditor';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

export default function EditInformation({
    name, nameLang, handleNameChange, handleNameLangChange, 
    authors, 
    productBG, productEN, setProductBG, setProductEN,
    product, setProduct
}) {

    const [desc, setDesc] = useState(productBG.shortDescription)
    const [descLang, setDescLang] = useState('bg')

    const handleAddAuthor = () => {
        let newProduct = Object.assign({}, product);
        newProduct.authors.push("")
        setProduct(newProduct)
    }

    function handleDeleteAuthor( index ){
        let newProduct = Object.assign({}, product);
        newProduct.authors.splice(index, 1);
        setProduct(newProduct)
    }

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
                    {authors.map((author, index) => (
                        <>
                            <Chip
                                sx={{
                                    height:'32px',
                                    mb: 1,
                                }}
                                component={Box}
                                label={author.name}
                                to={"/author/" + author.author_id}
                                key={author.author_id}
                            />
                            <IconButton sx={{ height:'32px', width:'32px'}} color='error' onClick={() => handleDeleteAuthor(index)}>
                                <DeleteIcon/>
                            </IconButton>
                        </>
                    ))}
                    
                </Stack>
                <Button color='inherit' onClick={handleAddAuthor}>
                    <Typography sx={{ fontSize:'0.875rem', mr:1}}>{t('add-author')}</Typography>
                    <AddCircleOutlineIcon/>
                </Button>
            </Box>
            <Box sx={{ textAlign: "center", height: "100%", mt: 5 }}>
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