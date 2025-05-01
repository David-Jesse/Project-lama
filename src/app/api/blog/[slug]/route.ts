import {connectToMongoDB} from '@/lib/db'
import {Post} from '@/lib/models'
import {NextApiRequest, NextApiResponse} from 'next'

type ResponeseData = {
    message?: string;
    error?: string;
    [key: string]: unknown;
}

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse<ResponeseData>,
) {
    const {slug} = req.query

    try {
        await connectToMongoDB()
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err)
        return res.status(500).json({error: 'Failed to connect to database'})
    }

    switch (req.method) {
        case 'GET':
            return GET(req, res, slug as string)
        case 'DELETE':
            return DELETE(req, res, slug as string)
        default:
            return res.status(405).json({error: 'Method not allowed'})
    }
}


// Get post by slug
async function GET (
    req: NextApiRequest,
    res: NextApiResponse<ResponeseData>,
    slug: string 
) {
    try {
        const post = await Post.findOne({slug})

        if(!post) {
            return res.status(404).json({error: 'Post not found!'})
        }

        return res.status(200).json(post)
    } catch(err) {
        console.error(err)
        return res.status(500).json({error: 'Failed to fetch post!'})
    }
}

// Delete post by slug
async function DELETE (
    req: NextApiRequest,
    res: NextApiResponse<ResponeseData>,
    slug: string 
) {
    try {
        const result = await Post.deleteOne({slug})

        if (result.deletedCount === 0) {
            return res.status(404).json({error: "Post not found!"})
        }

        return res.status(200).json({message: "Post deleted successfully!"})
    } catch (err) {
        console.error(err)
        return res.status(500).json({error: "Failed to delete post!"})
    }
}

// export async function GET (
//     request: NextRequest,
//     context: {params: {slug: string}}
// ) {
//     const {slug} = context.params

//     try{
//         await connectToMongoDB()

//         const post = await Post.findOne({slug})
        
//         if(!post) {
//             return NextResponse.json(
//                 {error: 'Post not found!'},
//                 {status: 404}
//             )
//         }

//         return NextResponse.json(post)
//     } catch(err) {
//         console.log(err)
//         return NextResponse.json(
//             {error: 'Failed to fetch post!'},
//             {status: 500}
//         )
//     }
// }

// export async function DELETE (
//     request: NextRequest,
//     context: {params: {slug: string}}
// ) {
//     const {slug} = context.params
    
//     try {
//         connectToMongoDB()
//         const result = await Post.deleteOne({slug})

//         if(result.deletedCount === 0) {
//             return NextResponse.json(
//                 {error: 'Post not found!'},
//                 {status: 404}
//             )
//         }

//         return NextResponse.json({message: 'Post deleted successfully!'});

//     } catch(err) {
//         console.error(err)
//         return NextResponse.json(
//             {error: 'Failed to delete post!'},
//             {status: 500}
//         )
//     }
        
// }