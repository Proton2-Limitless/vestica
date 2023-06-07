import { body } from "express-validator";
import { validateRequest, requireAuth } from "@habeebllahmmj/common";
import express from "express";
import { createNote, getNotes, updateNote, deleteNote, searchNotes } from "../controller/notes";
import { validateUser } from "../middleware/validateUser";

const router = express.Router();

router.post(
    "/notes/createnote",
    requireAuth,
    [
        body("title").not().isEmpty().withMessage("Title is required"),
        body("description")
        .isLength({ min: 4, max: 500 })
        .withMessage("Description must be between 4 and 500 characters"),
    ],
    validateRequest,
    createNote
);

router.get("/notes/getnotes", requireAuth, validateUser,getNotes);
router.get("/notes/searchnotes", requireAuth, validateUser,searchNotes);
router.put("/notes/updatenote/:id", requireAuth, validateUser,updateNote);
router.delete("/notes/deletenote/:id", requireAuth, validateUser,deleteNote);

export { router as noteRouter };