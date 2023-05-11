import mongoose, { Schema } from 'mongoose';

// create a PostSchema with a title field

// create PostModel class from schema

const PostSchema = new Schema({
    title: String,
    tags: String,
    content: String,
    coverUrl: String,
}, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
});

const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
