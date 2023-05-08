import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Link, useParams, useNavigate } from "react-router-dom";
import RichTextEditor from '../../../components/FormBuilder/RichTextEditor';
import {
    Tab,
    Tabs,
    TextField,
    MenuItem,
    Box,
    Button,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Container,
    Stack,
    Chip,
    IconButton,
} from "@mui/material";
import productService from "../../../services/product";
import cartService from "../../../services/cart";
import { useTranslation } from "react-i18next";
import ProductDisplay from "../../../components/PublicWebsite/products/ProductDisplay";
import Files from "../../../components/PublicWebsite/products/detailsPage/Files";
import ProductInformation from "../../../components/PublicWebsite/products/detailsPage/ProductInformation";
import EditInformation from "../../../components/PublicWebsite/products/detailsPage/EditInformation";
import EditPartDialog from "../../../components/PublicWebsite/products/detailsPage/EditPartDialog";
import { useSpring, animated } from '@react-spring/web';
import { useGesture, useHover } from '@use-gesture/react';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import useAuth from "../../../hooks/useAuth";
import ApproveDoalog from '../../../components/MainTable/ApproveDialog'
import DoneIcon from '@mui/icons-material/Done';
import useMessage from "../../../hooks/useMessage";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const useStyles = makeStyles({
    image: {
        maxWidth: "50%",
        width: "auto",
        height: "75vh",
        borderRadius: "0 0 35px 35px",
    },
    text: {
        flexGrow: 1,
    },
    button: {
        padding: "10px",
    },
    flexContainer: {
        justifyContent: 'end',
    },
});

const PreviewProduct = () => {

    const [{ approveWidth }, apiApprove] = useSpring(() => ({ approveWidth: '50px' }))

    const bindApprove = useHover(({ hovering }) => {
        apiApprove.start({ approveWidth: hovering ? '130px' : '50px' })
    })

    const [product, setProduct] = useState({
        authors:[
            {author_id:1, name:'john lenan'},
            {author_id:2, name:'john lenan'},
            {author_id:3, name:'john lenan'},
        ],
        categories:[
            {category_id:1, name:'john lenan'},
            {category_id:2, name:'john lenan'},
            {category_id:3, name:'john lenan'},
        ],
        parts:[
        
            {id:1, files:[
                {path:'2wue.docx'},
                {path:'2wue.docx'},
                {path:'2wue.docx'},
                {path:'2wue.docx'},
                {path:'2wue.docx'},
                {path:'2wue.docx'}
            ], price:10},
            {id:2, files:[
                {path:'2wue.docx'},
                {path:'2wue.docx'},
                {path:'2wue.docx'},
                {path:'2wue.docx'},
                {path:'2wue.docx'},
                {path:'2wue.docx'}
            ], price:10},
            {id:3, files:[
                {path:'2wue.docx'},
                {path:'2wue.docx'},
                {path:'2wue.docx'},
                {path:'2wue.docx'},
                {path:'2wue.docx'},
                {path:'2wue.docx'}
            ], price:10},
        ]
    })

    const [productBG, setProductBG] = useState({
        name:'The product',
        shortDescription:"<h1>This is heading 1 bg</h1>",
        longDescription:"<h2>This is heading 2 bg</h2>",
    })

    const [productEN, setProductEN] = useState({
        name:'The product',
        shortDescription:"<p>This is heading 1 en</p>",
        longDescription:"<h2>This is heading 2 en</h2>",
    })

    const [edit, setEdit] = useState(true);
    const handleEditTabChange = (event, newValue) => {
        setEdit(newValue);
    };

    const [currentName, setCurrentName] = useState(productBG.name)
    const [currentLongDesc, setCurrentLongDesc] = useState(productBG.longDescription)

    const [currentNameLang, setCurrentNameLang] = useState('bg')
    const [currentLongDescLang, setCurrentLongDescLang] = useState('bg')

    const handleNameChange = (event) =>{
        setCurrentName(event.target.value)
        if(currentNameLang === 'bg'){
            let newProps = productBG
            newProps.name = event.target.value
            setProductBG(newProps)
        }else if(currentNameLang === 'en'){
            let newProps = productEN
            newProps.name = event.target.value
            setProductEN(newProps)
        }
    }

    const handleNameLangChange = (event, newValue) =>{
        console.log(newValue)
        setCurrentNameLang(newValue)
        if(newValue === 'bg'){
            setCurrentName(productBG.name)
        }else if(newValue === 'en'){
            setCurrentName(productEN.name)
        }
    }

    const handleLongDescChange = (editorState, markup) =>{
        setCurrentLongDesc(markup)
        if(currentLongDescLang === 'bg'){
            let newProps = productBG
            newProps.longDescription = markup
            setProductBG(newProps)
        }else if(currentLongDescLang === 'en'){
            let newProps = productEN
            newProps.longDescription = markup
            setProductEN(newProps)
        }
    }

    const handleLongDescLangChange = (event, newValue) =>{
        setCurrentLongDescLang(newValue)
        if(newValue === 'bg'){
            setCurrentLongDesc(productBG.longDescription)
        }else if(newValue === 'en'){
            setCurrentLongDesc(productEN.longDescription)
        }
    }

    const handleAddCategory = () => {
        let newProduct = Object.assign({}, product);
        newProduct.categories.push("")
        setProduct(newProduct)
    }

    function handleDeleteCategory(index) {
        let newProduct = Object.assign({}, product);
        newProduct.categories.splice(index, 1);
        setProduct(newProduct)
    }

    const [{ x, y }, api] = useSpring(() => ({
        x: "0",
        y: "0",
    }));

    const bind = useGesture({
        onHover: ({ hovering }) => api({ x: hovering ? '-5px' : '0', y: hovering ? '-5px' : '0' }),
    })

    

    const classes = useStyles();
    const { id } = useParams();
    const { t, i18n } = useTranslation();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { addMessage } = useMessage();

    // useEffect(() => {
    //     productService
    //         .getProductById(id, i18n.language)
    //         .then((res) => {
    //             setProduct(res.data);
    //         })
    //         .catch((error) => {
    //             navigate('/products');
    //             console.log(error);
    //         });
    // }, [id, i18n.language]);

    
    const [ files, setFiles ] = useState(product.parts[0].files);
    // const [ partName, setPartName ] = useState(product.parts[0].name);
    const [ price, setPrice ] = useState(product.parts[0].price);
    const [ part, setPart ] = useState(product.parts[0].id);

    const handlePartChange = (event) => {
        const part = product.parts.find((x) => x.id === event.target.value);
        setPart(event.target.value);
        setFiles(part.files);
        setPrice(part.price);
    };

    const [openApproveDialog, setOpenApproveDialog] = useState(false);
    const [openEditPartsDialog, setOpenEditPartsDialog] = useState(false);

    const handleApprove = (id) => {
        console.log(id[0])
        console.log(product)
        console.log(productBG)
        console.log(productEN)
    }

    let authorOptions = [
        {author_id:1, label:'Josh'},
        {author_id:2, label:'Josh'},
        {author_id:3, label:'Josh'},
        {author_id:4, label:'Josh'},
        {author_id:5, label:'Josh'},
        {author_id:6, label:'Bill Gates'},
        {author_id:7, label:'Elon Musk'},
        {author_id:8, label:'John Lennon'},
    ]

    let categoryOptions = [
        {author_id:1, label:'Josh'},
        {author_id:2, label:'Josh'},
        {author_id:3, label:'Josh'},
        {author_id:4, label:'Josh'},
        {author_id:5, label:'Josh'},
        {author_id:6, label:'Bill Gates'},
        {author_id:7, label:'Elon Musk'},
        {author_id:8, label:'John Lennon'},
    ]

    return (
        <>
        <Button sx={{ color: '#f1f1f1', display:'contents' }} onClick={() => setOpenApproveDialog(true)}>
            <animated.div {...bindApprove()} style={{
                width: approveWidth,
                height: '50px',
                zIndex: '3',
                right: 0,
                position: 'fixed',
                top: '50%',
                borderRadius: ' 25px 0 0 25px',
                background: '#96011c',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '10px'
            }}>
                <Box width={'100%'} display={'flex'} justifyContent={'start'} alignItems={'center'}>
                
                    <DoneIcon sx={{
                        ml: 1,
                        mr: 1,
                        color: '#f1f1f1'
                    }} />
                    
                        {t('approve')}
                    
                </Box>
                
            </animated.div>
            </Button>

            <ApproveDoalog 
                approveId={Number(id)} 
                setApproveId={() => { }} 
                approveHandler={handleApprove} 
                newRequest={() => { }} 
                open={openApproveDialog} 
                setOpen={setOpenApproveDialog} 
            />
            <EditPartDialog 
                open={openEditPartsDialog} 
                setOpen={setOpenEditPartsDialog}
                product={product}
                setProduct={setProduct}
                setFiles={setFiles}
                setPart={setPart}
                setPrice={setPrice}
            />

            <Container
                maxWidth={"false"}
                sx={{ width: "85%", margin: "0 auto", my: 5 }}
            >
                <Tabs value={edit} onChange={handleEditTabChange} indicatorColor='inherit' classes={{
                    flexContainer: classes.flexContainer
                }} textColor='inherit' sx={{ color: 'black', }} >
                    <Tab sx={{
                        backgroundColor: 'white',
                        borderRadius: '10px 10px 0 0',
                        mr: 1
                    }} value={false} label={t('preview')} />
                    <Tab sx={{
                        backgroundColor: 'white',
                        borderRadius: '10px 10px 0 0',
                        mr: 1
                    }} value={true} label={t('edit')} />
                </Tabs>
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        flexDirection: { xs: "column", md: "row" },
                    }}
                >
                    <Box sx={{ flexBasis: "40%" }}>
                        <img
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            //src="https://files.porsche.com/filestore/image/multimedia/none/carrange-flyout-911/small/3cf76e8c-6694-11e9-80c4-005056bbdc38;sQ;twebp;c1696;gc/porsche-small.webp"
                            src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/is8rDPGsGlcg/v1/-1x-1.jpg"
                            //src={`${process.env.REACT_APP_ASSETS}/${product.files[0].name}`}
                        />
                    </Box>

                    <Box
                        sx={{ display: { xs: "flex", md: "none" }, flexDirection: "column" }}
                    >
                        <Card elevation={1} sx={{ p: 3, mt: 3 }}>
                            
                            {edit?
                                <EditInformation
                                    name={currentName}
                                    nameLang={currentNameLang}
                                    handleNameChange={handleNameChange}
                                    handleNameLangChange={handleNameLangChange}
                                    authors={product.authors}
                                    authorOptions={authorOptions}
                                    productBG={productBG}
                                    productEN={productEN}
                                    setProductBG={setProductBG}
                                    setProductEN={setProductEN}
                                    product={product}
                                    setProduct={setProduct}
                                />
                            :
                                <ProductInformation
                                    name={ i18n.language === 'bg' ? productBG.name: productEN.name}
                                    authors={ product.authors }
                                    desc={ i18n.language === 'bg' ? productBG.shortDescription: productEN.shortDescription}
                                />
                            }

                            

                            

                        </Card>
                    </Box>

                    <Card elevation={1} sx={{ flexBasis: '70%' }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                justifyContent: "center",
                            }}
                        >
                            <CardContent
                                sx={{
                                    width: "100%",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: { xs: "column", lg: "row" },
                                        gap: 3,
                                        mt: 3,
                                        justifyContent: "center",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            flexBasis: "60%",
                                            display: { xs: "none", lg: "block" },
                                        }}
                                    >
                                        {edit?
                                            <EditInformation
                                                name={currentName}
                                                nameLang={currentNameLang}
                                                handleNameChange={handleNameChange}
                                                handleNameLangChange={handleNameLangChange}
                                                authors={product.authors}
                                                authorOptions={authorOptions}
                                                productBG={productBG}
                                                productEN={productEN}
                                                setProductBG={setProductBG}
                                                setProductEN={setProductEN}
                                                product={product}
                                                setProduct={setProduct}
                                            />
                                        :
                                        <ProductInformation
                                        name={i18n.language==='bg'? productBG.name: productEN.name}
                                        authors={product.authors}
                                        desc={i18n.language==='bg'? productBG.shortDescription: productEN.shortDescription}
                                    />
                                        }
                                    </Box>
                                    {/* PART */}
                                    <Box
                                        width="100%"
                                        sx={{
                                            flexBasis: "40%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box
                                            width="100%"
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-evenly",
                                                alignItems: "center",
                                                mb: "30px",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    minWidth: 80,
                                                    width: "100px",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <TextField
                                                    select
                                                    onChange={handlePartChange}
                                                    label={t("part")}
                                                    value={part}
                                                    color="bordoRed"
                                                    variant={"standard"}
                                                    fullWidth
                                                >
                                                    {product.parts.map((part) => (
                                                        <MenuItem key={part.id} value={part.id}>
                                                            {part.id}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Box>
                                            
                                            {price==0? <></> : <Typography>{price} {t("bgn")}</Typography>}
                                        </Box>
                                        <Files files={files} />
                                        <Box>
                                            <animated.div {...bind()} style={{
                                                x: x,
                                                y: y
                                            }}>
                                                <Button 
                                                    sx={{ display: edit? 'none' : 'block' }} 
                                                    disabled={!part} 
                                                    variant="contained" 
                                                    color="bordoRed"
                                                >
                                                    {t("add-cart")}
                                                </Button>
                                                <Button 
                                                    sx={{ display: !edit? 'none' : 'block' }} 
                                                    variant="contained" 
                                                    color="bordoRed" 
                                                    onClick={() => setOpenEditPartsDialog(true)}
                                                >
                                                    {t("edit-parts")}
                                                </Button>
                                            </animated.div>
                                        </Box>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Box>
                    </Card>
                </Box>
                <Box>
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                            display: 'flex',
                            justifyContent: 'left',
                            flexWrap: 'wrap',
                            mt: 5
                        }}
                    >
                    {product.categories.map((category, index) => (
                        <Box display={'flex'}>
                            <Chip
                                sx={{
                                    mb: 1,
                                }}
                                component={!edit? Link : Box}
                                label={category.name}
                                to={"/products?category=" + category.category_id}
                                clickable={!edit}
                                key={category.category_id}
                                onDelete={() => handleDeleteCategory(index)}
                            />
                        </Box>
                    ))}
                        <Button sx={{height:'32px'}} color='inherit' onClick={handleAddCategory}>
                            <Typography sx={{ fontSize:'0.875rem', mr:1}}>{t('add-category')}</Typography>
                            <AddIcon/>
                        </Button>
                    </Stack>
                </Box>
                <Box
                    sx={{ display: { xs: 'none', md: "flex", lg: "none" }, flexDirection: "column" }}
                >
                    <Card elevation={1} sx={{ p: 3, mt: 3 }}>
                        
                        {edit?
                            <EditInformation
                                name={currentName}
                                nameLang={currentNameLang}
                                handleNameChange={handleNameChange}
                                handleNameLangChange={handleNameLangChange}
                                authors={product.authors}
                                authorOptions={authorOptions}
                                productBG={productBG}
                                productEN={productEN}
                                setProductBG={setProductBG}
                                setProductEN={setProductEN}
                                product={product}
                                setProduct={setProduct}
                            />
                        :
                            <ProductInformation
                                name={i18n.language==='bg'? productBG.name: productEN.name}
                                authors={product.authors}
                                desc={i18n.language==='bg'? productBG.shortDescription: productEN.shortDescription}
                            />
                        }

                    </Card>
                </Box>
                <Card sx={{ mt: 4 }}>
                    <CardContent>
                        <Typography
                            variant="h3"
                            sx={{
                                textAlign: "center",
                                position: "relative",
                                ":after": {
                                    content: '""',
                                    position: "absolute",
                                    width: "10%",
                                    height: "3px",
                                    bottom: "-10px",
                                    left: "45%",
                                    borderBottom: "3px dashed",
                                    borderColor: "background.bordoRed",
                                },
                            }}
                        >
                            {t("description")}
                        </Typography>
                        <Box sx={{ mt: 4 }}>
                            <Box display={edit? 'block' : 'none'}>
                                <Tabs value={currentLongDescLang} onChange={handleLongDescLangChange}  indicatorColor='inherit' textColor='inherit'>
                                    <Tab value={'bg'} label={t('bulgarian')}/>
                                    <Tab value={'en'} label={t('english')}/>
                                </Tabs>
                                <Box display={currentLongDescLang==='bg'? 'block': 'none'}>
                                    <RichTextEditor value={productBG.longDescription} setFieldValue={handleLongDescChange} />
                                </Box>
                                <Box display={currentLongDescLang==='en'? 'block': 'none'}>
                                    <RichTextEditor value={productEN.longDescription} setFieldValue={handleLongDescChange} />
                                </Box>
                                
                            </Box>
                            
                            <div style={{display:edit? 'none' : 'block'}}
                                dangerouslySetInnerHTML={{ __html: i18n.language==='bg'? productBG.longDescription : productEN.longDescription }}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
};

export default PreviewProduct;
