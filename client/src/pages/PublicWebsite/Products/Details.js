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
import { useTranslation } from "react-i18next";
import ProductDisplay from "../../../components/PublicWebsite/products/ProductDisplay";
import Files from "../../../components/PublicWebsite/products/detailsPage/Files";
import ProductInformation from "../../../components/PublicWebsite/products/detailsPage/ProductInformation";
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { display } from "@mui/system";

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

    const props = {
        name: "Product of the bulgarian academy of sciences",
        authors: [
            { author_id: 1, name: "M. Dimitrov" },
            { author_id: 2, name: "S. Kozuharov" },
            { author_id: 3, name: "M. Balev" },
            { author_id: 1, name: "M. Dimitrov" },
            { author_id: 2, name: "S. Kozuharov" },
            { author_id: 3, name: "M. Balev" },
            { author_id: 1, name: "M. Dimitrov" },
            { author_id: 2, name: "S. Kozuharov" },
        ],
        shortDescription:
            "Lorem ipsum dolor sfiuwegtf qw79egfqgw ew67o 8o7wqg8o7 ftwg8oe 7gf8ow7qeg f67owetgqf67 qit amet, consectetur adipiscing elit. Ut id purus ante. Ut vena, euismod et ante vel, consectetur accumsan diam. Aenean iaculis posuere odio, sit amet pulvinar mauris convallis non. Curabitur tempor ultrices eros, mattis mollis sapien pharetra vel. Incongue vulputate. Nam non diam pellentesque, lacinia ex eget, tristique sem.",
        longDescription:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id purus ante. Ut venenatis felis at porttitor finibus. Etiam a blandit turpis, vitae dictum mauris. Fusce eu urna ac tortor aliquam ultrices. Nullam pharetra molestie nisi eget commodo. Donec sodales, velit pretium sodales euismod, magna leo ultricies ex, pellentesque molestie enim mi sit amet dui. Nullam et nulla et odio varius vulputate nec id leo." +
            "Curabitur nec ultrices est. Donec ornare, mi eget rhoncus volutpat, erat enim dictum ipsum, nec volutpat nulla leo ac elit. In massa magna, euismod et ante vel, consectetur accumsan diam. Aenean iaculis posuere odio, sit amet pulvinar mauris convallis non. Curabitur tempor ultrices eros, mattis mollis sapien pharetra vel. Integer fringilla ligula vel ullamcorper viverra. Suspendisse consequat ligula id congue sodales. Sed elementum turpis id felis congue vulputate. Nam non diam pellentesque, lacinia ex eget, tristique sem." +
            "Nam dictum tincidunt nisl. Maecenas vitae congue urna, id blandit lorem. Mauris bibendum sodales consectetur. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus leo dui, pharetra quis ultricies eu, tincidunt eu nisi. Ut vel mattis sapien, et convallis nisl. Donec ullamcorper ac odio in bibendum. Proin interdum pulvinar condimentum. Etiam vitae congue dui. Pellentesque pulvinar sapien sit amet nibh tempor, in suscipit justo elementum. Vestibulum vulputate dui ac nunc malesuada molestie. Sed lobortis faucibus tortor, non eleifend velit luctus eget. Maecenas egestas, nisi id vulputate consectetur, augue felis aliquet purus, non feugiat nisl risus at velit. Nunc interdum non ex a malesuada. Maecenas mauris nisi, varius ut laoreet nec, vulputate sit amet purus." +
            "Sed tincidunt odio lorem, auctor posuere ipsum varius sit amet. Sed ac gravida urna, id varius mi. Fusce tincidunt eleifend scelerisque. Nam sed egestas leo, vitae posuere felis. Vivamus aliquet, metus ut malesuada pharetra, lacus massa viverra odio, eget pretium neque neque porta massa. Donec ligula nunc, porttitor nec accumsan sodales, tempus ac dolor. Nunc ex ex, bibendum quis purus ac, pulvinar luctus tortor. Phasellus sed finibus libero. Phasellus vitae efficitur nunc, a egestas dui. Vestibulum ac libero commodo, imperdiet ipsum nec, vulputate velit. Maecenas convallis arcu eu lectus tincidunt, quis tincidunt elit venenatis. Nam vitae augue sit amet massa lobortis posuere in et orci. Sed suscipit risus dignissim, pulvinar est sit amet, semper dolor. Maecenas id aliquet libero. Suspendisse potenti. Sed nec libero massa." +
            "Aliquam in mi congue, pulvinar purus id, congue arcu. Donec lacinia ex vitae molestie auctor. Aenean sagittis at leo finibus convallis. Duis interdum dignissim nisl sit amet convallis. Mauris volutpat ut odio quis accumsan. Quisque velit neque, imperdiet ac varius ac, dapibus et tellus. Fusce eleifend egestas risus vehicula pretium. Nam id arcu arcu. Aenean non fermentum quam. Integer in quam vitae enim feugiat facilisis." +
            "Donec velit mauris, placerat eget felis nec, sagittis hendrerit magna. Cras ac erat sit amet ex euismod interdum in sed metus. Vestibulum a placerat neque. Aliquam ac sollicitudin nisl. In fermentum, odio eu faucibus fermentum, ex eros pharetra ipsum, quis congue ex ligula eget augue. Nunc quis malesuada elit. Nunc gravida tellus at lectus posuere, eget fringilla mi congue. Vestibulum sed ullamcorper velit. Phasellus vulputate sapien id arcu scelerisque ornare. Vivamus eu libero imperdiet, tincidunt justo eu, fermentum libero. Nam tempus sit amet lectus non feugiat. Donec quis eros sed neque condimentum varius sed id elit. Donec in dapibus purus. Etiam quis lectus volutpat, vestibulum mauris in, consequat neque. Quisque placerat ultrices ex, at vulputate lorem mattis et. Donec eget odio rhoncus, pulvinar quam eget, volutpat nisl." +
            "Nullam semper nec ante ac vulputate. Duis gravida nisi in ornare hendrerit. Cras vel nisi orci. Nulla in nisl leo. Praesent congue tristique hendrerit. Maecenas hendrerit vitae quam et laoreet. Pellentesque egestas dui at sodales sagittis. Fusce arcu nulla, pellentesque quis hendrerit ut, placerat eget enim. Nunc et nisl dolor. Phasellus vitae turpis ut mauris placerat dictum. Curabitur eu rutrum mauris, id pulvinar lacus. Phasellus lacinia nulla sapien, in venenatis quam convallis id." +
            "Fusce venenatis elit et tellus scelerisque rhoncus. Donec varius lectus quis nisi faucibus, vitae mollis lectus vulputate. Ut risus ex, elementum vel augue non, laoreet facilisis odio. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed commodo volutpat nisi eget porttitor. Donec efficitur aliquet odio quis laoreet. Nullam scelerisque, libero eget mattis aliquet, urna mauris dignissim nibh, sed interdum tortor felis quis ex. Suspendisse potenti. Aenean accumsan, purus vel porta consequat, est nunc condimentum velit, imperdiet vulputate leo ante vitae nunc." +
            "Donec non elit ac neque varius dapibus. Proin blandit cursus nisl, sed ultrices magna imperdiet et. Nullam quam est, scelerisque et vehicula ultrices, convallis at mi. In dignissim, augue vel mollis varius, leo massa condimentum odio, quis placerat odio lorem eu nisi. Sed et elementum tellus, vitae accumsan nisi. Etiam id fringilla odio, vel ultricies elit. Aliquam efficitur pellentesque erat, quis fringilla magna tincidunt quis. Maecenas cursus faucibus arcu, ut ultricies augue tincidunt ac. Cras ante nisi, tincidunt et enim in, vestibulum sollicitudin risus. Maecenas posuere, odio eget posuere iaculis, diam ligula lacinia ex, id aliquam purus nibh vel dui. Sed euismod euismod sem ac aliquam." +
            "Sed porta tempor faucibus. Donec condimentum eget urna vel ullamcorper. Nam dignissim magna vel risus fringilla fermentum. Sed eleifend ultricies lorem, in pellentesque nibh scelerisque id. Morbi suscipit ut augue eget scelerisque. Nunc commodo dignissim est at viverra. Nunc scelerisque nibh sem, sit amet consequat orci lacinia vel. Donec egestas interdum nisl, ut dignissim diam ornare vitae. Suspendisse blandit ipsum magna, in hendrerit nunc ultrices eget. Vestibulum molestie maximus porttitor. In porta, ante a pellentesque volutpat, ex urna mollis est, ac porta diam neque vitae orci. Vivamus tristique diam tortor, eu aliquam tellus facilisis id.",
        parts: [
            {
                id: 1,
                files: [
                    "file1.docs",
                    "file2.pdf",
                    "file3.png",
                    "file4.xml",
                    "file5.png",
                ],
                price: 999.99,
            },
            {
                id: 2,
                files: ["file1.docs", "file2.pdf", "file3.png", "file5.png"],
                price: 99.99,
            },
            {
                id: 3,
                files: ["file1.docs", "file3.png", "file4.xml", "file5.png"],
                price: 9909.99,
            },
        ],
    };

    const [files, setFiles] = useState(props.parts[0].files);
    const [price, setPrice] = useState(props.parts[0].price);
    const [part, setPart] = useState(1);

    const classes = useStyles();
    const { id } = useParams();
    const [product, setProduct] = useState({ authors: [], files: [ { path: '' } ] });
    const { t, i18n } = useTranslation();
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

    const handlePartChange = (event) => {
        setPart(event.target.value);
        setFiles(props.parts[event.target.value - 1].files);
        setPrice(props.parts[event.target.value - 1].price);
    };

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
                                name={props.name}
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
                                            name={props.name}
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
                                                    {props.parts.map((part) => (
                                                        <MenuItem key={part.id} value={part.id}>
                                                            {part.id}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Box>
                                            <Typography>
                                                {price} {t("bgn")}
                                            </Typography>
                                        </Box>
                                        <Files files={files} />
                                        <Box>
                                            <animated.div {...bind()} style={{
                                                x: x,
                                                y: y
                                            }}>
                                                <Button variant="contained" color="bordoRed">
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
                            name={props.name}
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
