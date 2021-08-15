import React from 'react';
import apiURL from '../../utils/constants/apiURL.';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PersonIcon from '@material-ui/icons/Person';
import moment from 'moment';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom:15,
    },
    title: {
        color: 'blue',
        maxHeight: 40,
        overflow: 'hidden',
    },
    about: {
        height:'1.3rem',
        overflow:'hidden'
       
    },
    media: {
        height: 95,
    },
    calendarIcon: {
        fontSize: theme.spacing(1.5),
        marginRight: theme.spacing(.6)
    },
    personIcon: {
        fontSize: theme.spacing(1.5),
        marginRight: theme.spacing(.8),
        marginLeft: theme.spacing(1.3)
    }
}));

export default function NewsCard({ title, date, author, about, imgPath,id,category }) {
    const classes = useStyles();

    return (
        <div >
            <Card className={classes.root}>
                <CardActionArea component={Link} to={`/${category}/${id}`} >
                    <Grid container >
                        <Grid item xs={9} >
                            <CardContent style={{ paddingBottom: 3, paddingTop: 5 }}>
                                <Typography
                                    className={classes.title}
                                    gutterBottom
                                    variant="subtitle2"
                                >
                                    {title}
                                </Typography>
                                <Typography variant='caption' >
                                    <CalendarTodayIcon className={classes.calendarIcon} />
                                    <span>{moment(new Date(date)).fromNow()}</span>
                                    <PersonIcon className={classes.personIcon} />
                                    <span>{author}</span>
                                </Typography>
                                <Typography
                                    className={classes.about}
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    {about}
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid item xs={3} >
                            <CardMedia
                                className={classes.media}
                                component='img'
                                image={apiURL + imgPath.replace('public', "")}
                                title="Contemplative Reptile"
                            />
                        </Grid>
                    </Grid>
                </CardActionArea>
                <CardActions style={{ paddingTop: 0 }} >
                    <Button size="small" color="primary">
                        Share
                    </Button>
                    <Button
                        size="small" color="primary"
                        component={Link} to={`/${category}/${id}`}
                    >
                        Read
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}
