import { createAsyncThunk } from "@reduxjs/toolkit";
import request, { gql } from "graphql-request";

const apiUrl = import.meta.env.VITE_API_URL;

const getArtCollectionsQuery = gql`
  query getArtCollections {
    getArtCollections {
      title
      author
      smallDescription
      bannerImage
      paintings
      _id
    }
  }
`;

const getArtCollectionQuery = gql`
query getArtCollection($input: ArtCollectionInput){
  getArtCollection(input: $input){
    _id: $input._id
  }
}`;

const createArtCollectionMutation = gql`
  mutation creatArtCollection($input: ArtcollectionInput) {
    getArtCollection(input: $input) {
      message
    }
  }
`;

export const getArtCollectionsThunk = createAsyncThunk(
  "ArtCollection/getArtCollections",
  async () => {
    const artCollections = await request(apiUrl, getArtCollectionsQuery);
    return artCollections.getArtCollections;
  }
);

export const getArtCollectionThunk = createAsyncThunk(
  "ArtCollection/getArtCollection",
  async (artCollectionInput: any) => {
    const response = await request(apiUrl, getArtCollectionQuery, {
      input: { _id: artCollectionInput._id },
    });
    return response.getArtCollection;
  }
);

export const createArtCollectionThunk = createAsyncThunk(
  "Artcollection/createArtCollection",
  async (artCollectionData) => {
    await request(apiUrl, createArtCollectionMutation, {
      input: artCollectionData,
    });
    return "nothing";
  }
);
