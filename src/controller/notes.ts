import { Request, Response } from "express";
import { BadRequestError, NotAuthorisedError } from "@habeebllahmmj/common";
import Note from "../models/note";
import { Op } from "sequelize";

export const createNote = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const note = await Note.create({
    title,
    description,
    owner: req.currentUser!.id,
  });

  res.status(201).send(note);
};

export const getNotes = async (req: Request, res: Response) => {
  const notes = await Note.findAll({});
  return res.send(notes);
};

export const updateNote = async (req: Request, res: Response) => {
  if(!req.body.title && !req.body.description){
    throw new BadRequestError("No data provided");
  }
  
  const note = await Note.findOne({ where: { id: req.params.id } });

  if (!note) {
    throw new BadRequestError("Note not found");
  }

  const { title = note.title, description = note.description } = req.body;

  if(note.owner !== req.currentUser!.id){
    throw new NotAuthorisedError();
  }
  note.title = title;
  note.description = description;
  await note.save();
  return res.send(note);
};

export const searchNotes = async (req: Request, res: Response) => {
  const { title } = req.query;
  const notes = await Note.findAll({
    where: {
      title: {
        [Op.like]: `%${title}%`,
      },
    },
  });
  return res.send(notes);
};

export const deleteNote = async (req: Request, res: Response) => {
  const note = await Note.findOne({ where: { id: req.params.id } });
  if (!note) {
    throw new BadRequestError("Note not found");
  }
  if(note.owner !== req.currentUser!.id){
    throw new NotAuthorisedError();
  }
  await note.destroy();
  return res.send(note);
};
