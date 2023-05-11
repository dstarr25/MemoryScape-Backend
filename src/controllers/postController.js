import Post from '../models/postModel';

export async function createPost(postFields) {
    // await creating a post
    // return post
    const newPost = new Post(postFields);
    try {
        const savedpost = await newPost.save();
        return savedpost;
    } catch (error) {
        throw new Error(`create post error: ${error}`);
    }
    // return { message: 'createPost' };
}
export async function getPosts() {
    // await finding posts
    // return posts

    try {
        const posts = await Post.find({}).sort('-createdAt'); // found the sort from https://stackoverflow.com/questions/4299991/how-to-sort-in-mongoose
        return posts;
    } catch (error) {
        throw new Error(`get posts error: ${error}`);
    }
    // return { message: 'getPosts' };
}
export async function searchPosts(searchQuery) {
    // await finding posts
    // return posts

    try {
        // Custom search method using regex - found here: https://www.grepper.com/answers/598171/mongoose+filter?ucard=1
        const re = new RegExp(searchQuery, 'i');
        let find = {};
        if (searchQuery !== undefined && searchQuery !== '') {
            find = {
                $or: [
                    { title: { $regex: re } },
                    { tags: { $regex: re } },
                    { content: { $regex: re } },
                ],
            };
        }
        const dataSearched = await Post.find(find).sort('-createdAt');
        return dataSearched;
    } catch (error) {
        throw new Error(`get posts error: ${error}`);
    }
    // return { message: 'getPosts' };
}
export async function getPost(id) {
    // await finding one post
    // return post
    try {
        const post = await Post.findById(id);
        return post;
    } catch (error) {
        throw new Error(`get post error: ${error}`);
    }

    // return { message: 'getPost' };
}
export async function deletePost(id) {
    // await deleting a post
    // return confirmation

    try {
        const post = await Post.findByIdAndDelete(id);
        return post;
    } catch (error) {
        throw new Error(`delete post error: ${error}`);
    }

    // return { message: 'deletePost' };
}
export async function updatePost(id, postFields) {
    // await updating a post by id
    // return *updated* post
    try {
        const post = await Post.findByIdAndUpdate(id, postFields, { new: true });
        return post;
    } catch (error) {
        throw new Error(`get posts error: ${error}`);
    }

    // return { message: 'updatePost' };
}
