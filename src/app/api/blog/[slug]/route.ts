import {connectToMongoDB} from '@/lib/db'
import {Post} from '@/lib/models'
import {NextRequest, NextResponse} from 'next/server'


export async function GET (
    request: NextRequest,
    {params}: {params: {slug: string}}
) {
    const {slug} = params

    try{
        await connectToMongoDB()

        const post = await Post.findOne({slug})
        
        if(!post) {
            return NextResponse.json(
                {error: 'Post not found!'},
                {status: 404}
            )
        }

        return NextResponse.json(post)
    } catch(err) {
        console.log(err)
        return NextResponse.json(
            {error: 'Failed to fetch post!'},
            {status: 500}
        )
    }
}

export async function DELETE (
    request: NextRequest,
    {params}: {params: {slug: string}}
) {
    const {slug} = params
    
    try {
        connectToMongoDB()
        const result = await Post.deleteOne({slug})

        if(result.deletedCount === 0) {
            return NextResponse.json(
                {error: 'Post not found!'},
                {status: 404}
            )
        }

        return NextResponse.json({message: 'Post deleted successfully!'});

    } catch(err) {
        console.error(err)
        return NextResponse.json(
            {error: 'Failed to delete post!'},
            {status: 500}
        )
    }
        
}
    


// export const DELETE = async (request: Request, {params}: {params: {slug: string}}) => {
//     const {slug} = params 

//     try{
//         connectToMongoDB()

//         await Post.deleteOne({slug})
//         return NextResponse.json("Post Deleted");

//     } catch(err) {
//         console.log(err)
//         throw new Error('Post deleted!')
//     }
// }