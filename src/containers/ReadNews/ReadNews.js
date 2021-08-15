import React, { useEffect, useState } from 'react'
import { Container, Divider, Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import { useParams } from 'react-router';
import axiosInstance from '../../utils/axios';
import apiURL from '../../utils/constants/apiURL.';
import RecentNews from '../../components/RecentNews/RecentNews';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PersonIcon from '@material-ui/icons/Person';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    img: {
        width: '85%',
        margin: 'auto',
        display: 'block',
        marginBottom: 20,
        marginTop: 20
    },
    heading: {
        textAlign: 'center'
    },
    divider: {
        backgroundColor: 'green',
        margin: 10,
    },
    calendarIcon: {
        fontSize: theme.spacing(1.5),
        marginRight: theme.spacing(.6)
    },
    personIcon: {
        fontSize: theme.spacing(1.5),
        marginRight: theme.spacing(.8),
        marginLeft: theme.spacing(1.3)
    },
}))

const iconButton = [
    { icon: <FacebookIcon />, ariaLabel: 'facebook icon', color: 'blue' },
    { icon: <TwitterIcon />, ariaLabel: 'twitter icon', color: '#0087ff' },
    { icon: <WhatsAppIcon />, ariaLabel: 'whatsapp icon', color: 'green' },
    { icon: <LinkedInIcon />, ariaLabel: 'linkedIn icon', color: '#005fff' },
]

function ReadNews() {

    const classes = useStyles();
    const [postfetched, setPostfetched] = useState('')
    const [post, setPost] = useState({
        images: '',
        title: '',
        author: '',
        about: '',
        date: 33
    });
    const { id } = useParams();
    useEffect(() => {
        axiosInstance.get(`post/${id}`)
            .then((res) => {
                setPost(res.data);
                document.title = res.data.title;
                setPostfetched(true)
            }).catch((err) => {
                console.log(err)
            })
    }, [id])

    if (postfetched) {
        return (
            <Container>
                <Grid container spacing={5} >
                    <Grid item md={8} xs={12} style={{ marginBottom: 30 }}>
                        <Typography variant='h4'
                            component='h1'
                            style={{ marginTop: 20 }}
                        >
                            {post.title}
                        </Typography>
                        <Typography variant='caption' >
                            <CalendarTodayIcon className={classes.calendarIcon} />
                            <span>{moment(new Date(post.date)).fromNow()}</span>
                            <PersonIcon className={classes.personIcon} />
                            <span>{post.author}</span>
                        </Typography>
                        <Typography style={{ textAlign: 'right' }}>
                            <Typography variant='caption'>12 shares</Typography>
                            {iconButton.map((iconbtn) =>
                                <IconButton
                                    key={iconbtn.ariaLabel}
                                    style={{ color: iconbtn.color }}
                                    aria-label={iconbtn.ariaLabel}
                                >
                                    {iconbtn.icon}
                                </IconButton>
                            )}
                        </Typography>
                        <img
                            src={apiURL + post.images.replace('public', "")}
                            alt=""
                            className={classes.img}
                        />
                        <Typography variant='body1' style={{ whiteSpace: 'pre-wrap' }} >
                            {post.about}
                        </Typography>
                    </Grid>
                    <Grid item md={4} xs={12} >
                        <Typography variant='h4' className={classes.heading}>Recent News</Typography>
                        <Divider className={classes.divider} />
                        <RecentNews />
                    </Grid>
                    <Grid item md={8} xs={12} >
                        <Typography variant='h4' className={classes.heading}>Popular News</Typography>
                        <Divider className={classes.divider} />
                        <RecentNews />
                    </Grid>
                </Grid>
            </Container>
        )
    } else {
        return 'something went wrong'
    }
}

export default ReadNews
