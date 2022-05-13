import { createAsyncThunk } from "@reduxjs/toolkit";
import request, { gql } from "graphql-request";
import PaintingInterface from "../../interfaces/PaintingInterface";

const apiUrl = import.meta.env.VITE_API_URL;

const createPaintingMutation = gql`
  mutation NewPainting($input: PaintingInput) {
    newPainting(input: $input) {
      message
    }
  }
`;

const query = gql`
  {
    getPaintings {
      title
      author
      imageUrl
      description
      _id
    }
  }
`;

export const getPaintingsThunk = createAsyncThunk(
  "Paintings/getPaintings",
  async () => {
    const paintings = await request(apiUrl, query);
    return paintings.getPaintings;
  }
);

export const createPaintingThunk = createAsyncThunk(
  "Paintings/newPainting",
  async (paintingData: PaintingInterface) => {
    await request(apiUrl, createPaintingMutation, {
      input: paintingData,
    });
    return "woof";
  }
);
