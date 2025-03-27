import mongoose from 'mongoose'
import { connectToMongoDB } from './db'
import {User, Post} from './models';

async function testModels() {
    try {
        await connectToMongoDB();
        console.log('connected to mongoDb')

        const newUser = new User({
            username: "Jesse",
            password: "password111",
            img: "https://images.pexels.com/photos/31042046/pexels-photo-31042046/free-photo-of-modern-architectural-facade-in-hong-kong.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
            isAdmin: false
        })
        await newUser.save();
        console.log('test user created:', newUser);

        // create a new post
        const newPost = new Post({
            title: 'My third post',
            desc: 'this is the description of my post',
            img: 'https://images.pexels.com/photos/15247738/pexels-photo-15247738/free-photo-of-reflection-of-woman-and-man-in-puddle.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
            userId: newUser._id,
            slug: 'my-first-post'
        })
        await newPost.save()
        console.log('test post created:', newPost);

        await mongoose.disconnect();
        console.log('Disconnected from MongoDb');
    } catch (error) {
        console.error('Error testing models:', error)
    }
}

testModels();