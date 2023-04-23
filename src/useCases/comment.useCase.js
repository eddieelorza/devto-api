import {Comment} from "../models/comment.module.js";

const createComment = async (commentData) => {
    return Comment.create(commentData);
    }

const getComments = async (filters) => {
    return Comment.find(filters);
}

const getCommentById = async (id) => {
    return Comment.findById(id);
}

const updateComment = async (id, dataUpdate, options = {}) => {
    return Comment.findByIdAndUpdate(id, dataUpdate, {new: true}, ...options);
}

const deleComment = async (id) => {
    return Comment.findByIdAndDelete(id);
}

export {createComment, getComments, getCommentById, updateComment, deleComment};


