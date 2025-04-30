import {connectToMongoDB} from '@/lib/db'
import {Post} from '@/lib/models'
import {NextRequest, NextResponse} from 'next/server'

type Params = {
    params: {
        slug: string;
    }
}

export async function GET (
    request: NextRequest,
    context: Params
) {
    const {slug} = context.params

    try{
        connectToMongoDB()

        const post = await Post.findOne({slug})
        return NextResponse.json(post);

    } catch(err) {
        console.log(err)
        throw new Error('Failed to fetch Post!')
    }
}

export async function DELETE (
    request: NextRequest,
    {params}: {params: {slug: string}}
) {
    const {slug} = params
    
    try {
        connectToMongoDB()

        await Post.deleteOne({slug})
        return NextResponse.json("Post Deleted");

    } catch(err) {
        console.log(err)
        throw new Error('Post deleted!')
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