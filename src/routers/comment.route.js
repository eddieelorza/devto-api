import express from "express";
import {createComment, getComments, getCommentById, updateComment, deleComment} from "../useCases/comment.useCase.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", isAuth, async (request, response) => {
    try {
        const { name, date, user } = request.query;
    
        let filters = {};
    
        if (name) filters = { ...filters, name };
    
        if (date) filters = { ...filters, date };
    
    
        if (user) filters = { ...filters, user };

        const commentFound = await getComments(filters);
        const objec = Object.values(commentFound).map((comment) => {
            return comment.user;
            }
        );
        console.log(objec);

        response.json({
            success: true,
            data: {
                comment: commentFound,
            },
        });

    } catch (error) {
        response.status(400).json({
            success: false,
            message: "Error at get All comments",
        });
    }
});

router.get("/:id", isAuth, async (request, response) => {
    try {
        const id = request.params.id;

        const commentFound = await getCommentById(id);
        response.json({
            success: true,
            data: {
                comments: commentFound,
            },
        });
    } catch (error) {
        response.status(400).json({
            success: false,
            message: "Error at get comment",
        });
    }
}
);

router.post("/:id", isAuth, async (request, response) => {
    try {
        const id = request.params.id;
        const data = request.body;
        const commentCreated = await createComment(data);
        response.json({
            success: true,
            data: {
                comment: commentCreated,
            },
        });
    } catch (error) {
        response.status(400).json({
            success: false,
            message: "Error at create comment",
        });

    }
}
);


router.patch("/:id", isAuth, async (request, response) => {
    try {
        const id = request.params.id;
        const updateData = request.body;
        const commentUpdated = await updateComment(id, updateData);
        response.json({
            success: true,
            data: {
                comment: commentUpdated,
            },
        });
    } catch (error) {
        response.status(400).json({
            success: false,
            message: "Error at update comment",
        });
    }
}
);

router.delete("/:id", isAuth, async (request, response) => {
    try {
        const id = request.params.id;
        const commentDeleted = await deleComment(id);
        response.json({
            success: true,
            data: {
                comment: commentDeleted,
            },
        });
    } catch (error) {
        response.status(400).json({
            success: false,
            message: "Error at delete comment",
        });
    }
}
);

export default router;

