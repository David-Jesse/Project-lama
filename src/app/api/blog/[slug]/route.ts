import {connectToMongoDB} from '@/lib/db'
import {Post} from '@/lib/models'
import {NextRequest, NextResponse} from 'next/server'


export async function GET(
    request: NextRequest,
    {params}: {params: Promise<{slug: string}>}
) {
    const {slug} = await params

    try {
        await connectToMongoDB();

        const post = await Post.findOne({slug})

        if(!post) {
            return NextResponse.json(
                {error: 'Post not found!'},
                {status: 404}
            )
        }

        return NextResponse.json(post)
    } catch (err) {
        console.error(err)
        return NextResponse.json(
            {error: "Failed to fetch post!"},
            {status: 500}
        )
    }
}

export async function DELETE(
    request: NextRequest,
    {params}: {params: Promise<{slug: string}>}
) {
    const {slug} = params 

    try {
        await connectToMongoDB();
        const result = await Post.deleteOne({slug})

        if (result.deletedCount === 0) {
            return NextResponse.json(
                {error: "Post not Found!"},
                {status: 404}
            )
        }

        return NextResponse.json(
            {message: "Post deleted successfully!"}
        )
    } catch(err) {
        console.error(err)
        return NextResponse.json(
            {error: "Failed to delete post!"},
            {status: 500}
        )
    }
}


// //Suggested possible fix 
// import {connectToMongoDB} from '@/lib/db'
// import {Post} from '@/lib/models'
// import {NextRequest, NextResponse} from 'next/server'

// Updated type definition with explicit context parameter
// type RouteContext = {
//   params: {
//     slug: string;
//   };
// };

// export async function GET(
//     request: NextRequest,
//     context: RouteContext
// ) {
//     const {slug} = context.params
//     try {
//         await connectToMongoDB();
//         const post = await Post.findOne({slug})
//         if(!post) {
//             return NextResponse.json(
//                 {error: 'Post not found!'},
//                 {status: 404}
//             )
//         }
//         return NextResponse.json(post)
//     } catch (err) {
//         console.error(err)
//         return NextResponse.json(
//             {error: "Failed to fetch post!"},
//             {status: 500}
//         )
//     }
// }

// export async function DELETE(
//     request: NextRequest,
//     context: RouteContext
// ) {
//     const {slug} = context.params 
//     try {
//         await connectToMongoDB();
//         const result = await Post.deleteOne({slug})
//         if (result.deletedCount === 0) {
//             return NextResponse.json(
//                 {error: "Post not Found!"},
//                 {status: 404}
//             )
//         }
//         return NextResponse.json(
//             {message: "Post deleted successfully!"}
//         )
//     } catch(err) {
//         console.error(err)
//         return NextResponse.json(
//             {error: "Failed to delete post!"},
//             {status: 500}
//         )
//     }
// }