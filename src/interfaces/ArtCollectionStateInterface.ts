import ArtCollectionInterface from "./ArtCollectionInterface";

interface ArtCollectionStateInterface {
  artCollections: ArtCollectionInterface[];
  isLoading: boolean;
  artCollection: ArtCollectionInterface;
}
export default ArtCollectionStateInterface;
