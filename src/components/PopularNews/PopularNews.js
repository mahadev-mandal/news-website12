import React, { useState, useEffect } from 'react'
import NewsCard from '../NewsCard/NewsCard';
import axiosInstance from '../../utils/axios';

function PopularNews() {
    
    const [posts, setPosts] = useState([])
    useEffect(() => {
        axiosInstance.get('/posts')
            .then((res) => {
                setPosts(res.data);
            }).catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <>
            {posts.map((post) =>
                <NewsCard
                    key={post._id}
                    id={post._id}
                    category={post.category}
                    title={post.title}
                    date={post.date}
                    about={post.about}
                    author={post.author}
                    imgPath={post.images}
                />
            )}
        </>
    )
}

export default PopularNews
