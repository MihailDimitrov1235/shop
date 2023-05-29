import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    Box,
    Card,
    Typography,
    Container,
    Stack,
    Chip,
    Pagination,
    TextField,
    Button,
    Avatar,
} from "@mui/material";
import Comment from "../../../components/blog/Comment";
import blogService from "../../../services/blog";
import commentService from "../../../services/comment";
import moment from "moment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import useMessage from "../../../hooks/useMessage";
import useAuth from "../../../hooks/useAuth";

const BlogPost = () => {
    const { slug } = useParams();
    const { user } = useAuth();
    const { t, i18n } = useTranslation();
    const [post, setPost] = useState({
        title: "",
        subtitle: "",
        content: "",
        image_path: "",
        created_at: "",
        categories: [],
        blogger: {
            id: 0,
            name: "",
            image_path: "",
        },
    });
    const [comments, setComments] = useState([]);
    const [commentsTotal, setCommentsTotal] = useState(0);
    const newCommentRef = useRef(null);
    const { addMessage } = useMessage();

    function newRequest() {
        blogService.getBySlug(slug, i18n.language)
            .then((res) => {
                setPost(res.data.post);

                setComments(res.data.comments.data);
                setCommentsTotal(res.data.comments.total);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
      if(user && post){
        blogService.visit({ user_id: user.id, post_id: post.id})
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error);
        });
      }
      
  }, [user, post]);

    useEffect(() => {
        newRequest();
    }, [i18n.language]);

    const handleSubmitComment = () => {
        if (newCommentRef.current.value) {
            let data = {
                user_id: 1,
                post_id: post.id,
                comment: newCommentRef.current.value,
            };

            commentService.createComment(data)
                .then((res) => {
                    addMessage(t('comment-added'),  'success');
                    newRequest();
                })
                .catch((error) => {
                    console.log(error);
                });

            newCommentRef.current.value = "";
        }
    };

    const handleCommentPageChange = (event, page) => {
        console.log(page);
    };

    return (
        <Container>
            <Box sx={{ mb: 3, display: { md: "block", lg: "flex" } }}>
                {/* Main Content */}
                <Card sx={{ flex: 6, mt: 10, mr: 3, p: 3 }}>
                    <Typography variant="h3" sx={{ mb: 3 }}>
                        {post.title}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mb: 5 }}>
                        {post.subtitle}
                    </Typography>

                    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                        <img
                            width={"100%"}
                            src={`${process.env.REACT_APP_ASSETS}/${post.image_path}`}
                        />
                    </Box>

                    <div
                        dangerouslySetInnerHTML={{
                            __html: post.content,
                        }}
                    />
                </Card>

                {/* Post Information */}
                <Card sx={{ flex: 1, mt: 10, p: 3 }}>
                    <Typography variant="h4" sx={{ textAlign: "center" }}>
                        {t("about-post")}
                    </Typography>

                    <Box sx={{ display: { md: "flex", lg: "block" } }}>
                        <Box flex={1}>
                            <Box
                                component={Link}
                                textAlign={"center"}
                                to={"/profile/" + post.blogger.id}
                                sx={{
                                    mt: 3,
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {post.blogger.image_path ? (
                                    <Avatar
                                        sx={{
                                            aspectRatio: "1/1",
                                            height: "auto",
                                            width: "100%",
                                            color: "white",
                                            bgcolor: "#96011c",
                                        }}
                                        src={`${process.env.REACT_APP_ASSETS}/${post.blogger.image_path}`}
                                        variant="rounded"
                                    ></Avatar>
                                ) : (
                                    post.blogger.name && (
                                        <Avatar
                                            sx={{
                                                aspectRatio: "1/1",
                                                height: "auto",
                                                width: "100%",
                                                color: "white",
                                                bgcolor: "#96011c",
                                                overflow: "hidden",
                                                fontSize: "60px",
                                            }}
                                            variant="rounded"
                                        >
                                            {post.blogger.name[0].toUpperCase()}
                                        </Avatar>
                                    )
                                )}
                                <Typography variant="h4">{post.blogger.name}</Typography>
                            </Box>
                            <Box
                                sx={{
                                    mt: 3,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <CalendarMonthIcon />
                                <Typography variant="h6" sx={{ ml: 1 }}>
                                    {moment(post.created_at).format("DD.MM.YYYY")}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    mt: 3,
                                    display: "flex",
                                    flexDirection: 'column',
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Typography variant="h6" sx={{ ml: 1 }}>
                                    {t("visits")}:
                                </Typography>
                                <Typography variant="h6" sx={{ ml: 1 }}>
                                    {post.visits_count}
                                </Typography>
                            </Box>
                        </Box>

                        <Box flex={1}>
                            <Typography
                                variant="h4"
                                sx={{ ml: 1, mt: 3, textAlign: "center" }}
                            >
                                {t("categories")}:
                            </Typography>
                            <Stack
                                gap={1}
                                direction={"row"}
                                sx={{ justifyContent: "center", flexWrap: "wrap", mt: 1 }}
                            >
                                {post.categories.map((category, idx) => (
                                    <Chip
                                        clickable
                                        component={Link}
                                        to={`/blog?category=${encodeURIComponent(
                                            category.category_id
                                        )}`}
                                        sx={{
                                            fontSize: "100%",
                                            mb: 1,
                                            background:
                                                "linear-gradient(90deg, rgba(185,0,0,1) 0%, rgba(106,20,0,1) 100%)",
                                            color: "white",
                                        }}
                                        label={category.name}
                                        key={idx}
                                    />
                                ))}
                            </Stack>
                        </Box>
                    </Box>
                </Card>
            </Box>

            {/* Comments */}

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
                {t("comment-section")}
            </Typography>

            <Card sx={{ p: 2, mt: 4 }}>
                <Box>
                    <TextField
                        inputRef={newCommentRef}
                        fullWidth
                        label={t("comment")}
                        multiline
                        color="bordoRed"
                    />
                    <Box display={"flex"} justifyContent={"end"}>
                        <Button
                            sx={{ mt: 1 }}
                            color="bordoRed"
                            variant="text"
                            onClick={handleSubmitComment}
                        >
                            {t("submit-comment")}
                        </Button>
                    </Box>
                </Box>
            </Card>

            <Card sx={{ p: 2, mt: 4 }}>
                {comments.length > 0 ? (
                    <>
                        {comments.map((comment, index) => (
                            <Comment props={comment} key={index} />
                        ))}

                        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                            <Pagination
                                count={Math.ceil(commentsTotal / 10) || 1}
                                size="medium"
                                variant="outlined"
                                onChange={handleCommentPageChange}
                            />
                        </Box>
                    </>
                ) : (
                    <Typography
                        variant="h5"
                        sx={{ textAlign: "center", fontStyle: "italic" }}
                    >
                        {t("no-comments")}
                    </Typography>
                )}
            </Card>
        </Container>
    );
};

export default BlogPost;
