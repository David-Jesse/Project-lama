import { connectToMongoDB } from "@/lib/db";
import {Post} from '@/lib/models'
import {NextResponse} from 'next/server'

export const GET = async () => {

    try {
        await connectToMongoDB();

        const posts = await Post.find()
        return NextResponse.json(posts)
    } catch (err) {
        console.log(err)
        throw new Error('failed to fetch posts!')
    }
}