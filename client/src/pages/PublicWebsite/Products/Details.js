import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
    TextField,
    MenuItem,
    Box,
    Button,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Container,
} from "@mui/material";
import productService from "../../../services/product";
import cartService from "../../../services/cart";
import { useTranslation } from "react-i18next";
import ProductDisplay from "../../../components/PublicWebsite/products/ProductDisplay";
import Files from "../../../components/PublicWebsite/products/detailsPage/Files";
import ProductInformation from "../../../components/PublicWebsite/products/detailsPage/ProductInformation";
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { display } from "@mui/system";
import useAuth from "../../../hooks/useAuth";

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
});

const ProductPage = () => {

    const [{ x, y }, api] = useSpring(() => ({
        x: "0",
        y: "0",
    }));

    const bind = useGesture({
        onHover: ({ hovering }) => api({ x: hovering ? '-5px' : '0', y: hovering ? '-5px' : '0' }),
    })

    const classes = useStyles();
    const { id } = useParams();
    const [product, setProduct] = useState({ authors: [], files: [ { path: '' } ], parts: [] });
    const { t, i18n } = useTranslation();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        productService
            .getProductById(id)
            .then((res) => {
                setProduct(res.data);
            })
            .catch((error) => {
                navigate('/products');
                console.log(error);
            });
    }, [id, i18n.language]);

    
    const [files, setFiles] = useState([]);
    const [price, setPrice] = useState(0);
    const [part, setPart] = useState('');

    const handlePartChange = (event) => {
        const part = product.parts.find((x) => x.id === event.target.value);
        setPart(event.target.value);
        setFiles(part.files);
        setPrice(part.price);
    };

    const handleAddCart = () => {
        const data = {
            'cart_id': user.cart.id,
            'product_id': id,
            'part_id': part
        }

        cartService.addProduct(data)
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
            <Container
                maxWidth={"false"}
                sx={{ width: "85%", margin: "0 auto", my: 5 }}
            >
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
                            //src="https://assets.bwbx.io/images/users/iqjWHBFdfxIU/is8rDPGsGlcg/v1/-1x-1.jpg"
                            src={`${process.env.REACT_APP_ASSETS}/${product.files[0].path}`}
                        />
                    </Box>

                    <Box
                        sx={{ display: { xs: "flex", md: "none" }, flexDirection: "column" }}
                    >
                        <Card elevation={1} sx={{ p: 3, mt: 3 }}>
                            <ProductInformation
                                name={product.name}
                                authors={product.authors}
                                desc={product.shortDescription}
                            />
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
                                        <ProductInformation
                                            name={product.name}
                                            authors={product.authors}
                                            desc={product.shortDescription}
                                        />
                                    </Box>
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
                                                <Button variant="contained" color="bordoRed" onClick={handleAddCart}>
                                                    {t("add-cart")}
                                                </Button>
                                            </animated.div>
                                        </Box>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Box>
                    </Card>
                </Box>
                <Box
                    sx={{ display: { xs: 'none', md: "flex", lg: "none" }, flexDirection: "column" }}
                >
                    <Card elevation={1} sx={{ p: 3, mt: 3 }}>
                        <ProductInformation
                            name={product.name}
                            authors={product.authors}
                            desc={product.shortDescription}
                        />
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
                            <div
                                dangerouslySetInnerHTML={{ __html: product.longDescription }}
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Container>
            <Container
                maxWidth={"false"}
                sx={{ width: "85%", margin: "0 auto", my: 5, position: "relative" }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        textAlign: "center",
                        position: "relative",
                        mb: 2,
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
                    {t("simular-products")}
                </Typography>
                <ProductDisplay />
            </Container>
        </>
    );
};

export default ProductPage;
