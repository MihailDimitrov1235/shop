import { Box, Card, Typography, Container, Stack, Chip, Pagination, TextField, Button } from "@mui/material"
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Comment from "../../../components/blog/Comment";
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const post = {
    date: '2022-05-03', 
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", 
    author:{name: "John Lennon", id:3}, 
    title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
    text: `<h1>Inuyasha</h1><br><p>Sometimes I think back on my experience with Inuyasha and my conclusions about it have always been conflicted. It was the first anime that I watched whole heartedly, and it was the first thing that brought me into the realm of Japanese media and culture. I've come to love anime and manga, appreciate the history and the different styles and subtleties that come with every genre and now consider it a very large and colorful part of my life. Naturally I look back on Inuyasha with a sense of fondness,the yellow volumes and DVD's on my shelves only a small testament to the dedication I had to the story. However as I said, Inuyasha is something I think about with a degree of conflict. It was the work that introduced me to the magical world of Japanese television, however in its own right Inuyasha is the most chaotic and exasperating anime I've probably ever seen.

    There are flaws in the overall composition. Things one might ask themselves like; why, if you KNEW you we're going to be trekking across feudal Japan for months on end, would you bring only one outfit? And more importantly why would it be your Junior High School uniform - i.e. a bright green miniskirt?
    
    Regardless, the story itself is very weak, as its the random plot arcs and ridiculous character relations that really make the show. To summarize, a young girl falls down a well at her family's shrine, only to be transported back in time to feudal Japan, where she frees a grumpy dog eared half demon man who is stuck to a tree (The result of a bad breakup) and ends up breaking a magical mystical artifact that then shatters into a bazillion pieces. Ditzy teenage girl and pissy dog demon guy now must work together to find all the shards of "The Sacred Jewel" before the bad guys do. Sure there's another load of subplots - pointless, funny and romantic alike - but we'll get to that.
    Although the premise is simplistic it does expand further along in the story, but only if one likes the show enough initially to move on in the series through the 160 + episodes.
    The subplots and the arcs are what make this series entertaining. (And also agonizing if the arc you're in bores you to tears) We'll have run ins with random demons and get mixed up with numerous characters who may or may not come and go. Each plot brings changes and the characters do a very good job of growing and evolving as a result. The series does, despite its episodic nature, still follow some sense of linearity. Development in the characters remain as they would in a real person. (This excludes the Inuyasha movies, unfortunately)
    Despite all that, its still one of those series that makes it very easy to drop in at any time and figure things out eventually. I watched from the middle first before I decided I loved the show and went back to see the beginning - which was drastically different to me considering the amount of change that takes place from beginning to middle to end.
    I can't go into detail very well considering the story, as there is so much of it its hard to find a place to start. The elements of the setting and time really come into play with the presence of the spirits and demons all of which offer a uniqueness all to its own. The multiple love triangle issues are superficial but also complex, so there is a degree of decent conflict in that regard. I also really appreciate personally how the development of the relationship between the two main characters, Inuyasha and Kagome, is gradual. </p>`,
    image:'https://c4.wallpaperflare.com/wallpaper/479/175/823/abstract-shapes-wallpaper-preview.jpg',
    categories:[{id:1, name:'politics'}, {id:2, name:'chemistry'}],
    commentPages:10,
    comments:[{userId:1, commentId:1}, {userId:1, commentId:1}, {userId:1, commentId:1}, {userId:1, commentId:1}, {userId:1, commentId:1}],
}

const BlogPost = ( ) =>{



    const [writingComment, setWrittingComment] = useState(false)
    const newCommentRef = useRef(null)
    const handleSubmitComment = () => {
        if(newCommentRef.current.value){
            console.log(newCommentRef.current.value)
            newCommentRef.current.value = ''
            setWrittingComment(false)
        }
        
    }

    const handleCommentPageChange = (event, page) => {
        console.log(page);
      };

    const { t } = useTranslation();

    return(
        <Container>
            {/* <Card sx={{ mt:10, px:3 }}>
                <Typography variant="h3" sx={{ my:4}}>{post.title}</Typography>
                <Typography variant="subtitle1" sx={{ mb:4 }}>{post.description}</Typography>
            </Card> */}
            <Box display={'flex'} sx={{ mb:3 }}>
                {/* Main Content */}
                <Card sx={{ flex:6, mt:10, mr:3, p:3 }}>
                    <Typography variant="h3" sx={{ mb:3}}>{post.title}</Typography>
                    <Typography variant="subtitle1" sx={{ mb: 5}}>{post.description}</Typography>
                    <Box display={'flex'} justifyContent={'center'}>
                        <img width={'100%'} src={post.image}/>
                    </Box>
                    <div
                    dangerouslySetInnerHTML={{
                        __html: post.text,
                    }}
                />
                </Card>

                {/* Post Information */}
                <Card sx={{ flex:1, mt:10, p:3}}>
                    <Typography variant="h5" sx={{ textAlign:'center' }}>{t('about-post')}</Typography>
                    <Box component={Link} to={"/profile/" + post.author.id} sx={{ mt:3, display:'flex', alignItems:'center' }}>
                        <PersonIcon/>
                        <Typography variant="subtitle2" sx={{ ml:1 }}>{post.author.name}</Typography>
                    </Box>
                    <Box sx={{ mt:3, display:'flex', alignItems:'center' }}>
                        <CalendarMonthIcon/>
                        <Typography variant="subtitle2" sx={{ ml:1 }}>{post.date}</Typography>
                    </Box>
                    <Typography variant="h6" sx={{ ml:1, mt:3, textAlign:'center' }}>{t('categories')}:</Typography>
                    <Stack direction={'row'} sx={{ justifyContent:'center', flexWrap:'wrap', mt:1 }} >
                        {post.categories.map( (category, idx) => (
                            <Chip clickable component={Link} to={`/blog?category=${encodeURIComponent(category.id)}`} sx={{ fontSize:'100%', mb:1, background:'linear-gradient(90deg, rgba(185,0,0,1) 0%, rgba(106,20,0,1) 100%)', color: 'white' }} label={category.name}/>
                        ))}
                    </Stack>
                </Card>
            </Box>
            {/* Comments */}
            <Card>
                
                <Box display={'flex'}>
                    <Typography variant="h3" sx={{ flex:1, ml:2, mt:1}}>{t('comment-section')}</Typography>
                    <Button onClick={() => setWrittingComment(!writingComment)}>                    
                        <Typography variant="subtitle1" sx={{ color:'black' , textAlign:'right', flex:1, mr:2, mt:1}}>{writingComment?t('stop-write-comment') :t('write-comment')}</Typography>
                    </Button>
                </Box>
                {writingComment && 
                <Box sx={{ mx:2 }}>
                    <TextField
                        inputRef={newCommentRef}  
                        fullWidth
                        color="primary"
                        label= {t('comment')}
                        multiline
                    />
                    <Box display={'flex'} justifyContent={'end'}>
                        <Button sx={{ mt:1, color: 'black'}} onClick={handleSubmitComment}>
                            {t('submit-comment')}
                        </Button>
                    </Box>
                    
                </Box>
                }
                    {post.comments.map( comment => (
                        <Comment props={comment} />
                    ))}
                <Box display={'flex'} justifyContent={'center'} sx={{ mb:2 }}>
                    <Pagination count={post.commentPages} 
                        size='medium' 
                        variant='outlined' 
                        onChange={handleCommentPageChange}
                    />
                </Box>
                
            </Card>
        </Container>
    )
}

export default BlogPost