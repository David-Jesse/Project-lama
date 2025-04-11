import {connectToMongoDB} from '@/lib/db'
import {Post} from '@/lib/models'
import {NextResponse} from 'next/server'

export const GET = async (request: Request, {params}: {params: {slug: string}}) => {
    const {slug} = params 

    try{
        connectToMongoDB()

        const post = await Post.findOne({slug})
        return NextResponse.json(post);

    } catch(err) {
        console.log(err)
        throw new Error('Failed to fetch Post!')
    }
}

export const DELETE = async (request: Request, {params}: {params: {slug: string}}) => {
    const {slug} = params 

    try{
        connectToMongoDB()

        await Post.deleteOne({slug})
        return NextResponse.json("Post Deleted");

    } catch(err) {
        console.log(err)
        throw new Error('Post deleted!')
    }
}