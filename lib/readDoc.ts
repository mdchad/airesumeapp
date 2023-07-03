import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import {RecursiveCharacterTextSplitter} from "langchain/text_splitter";

export default async function readDoc(blob: any) {
  try {

    const loader = new PDFLoader(
      blob, { splitPages: false }
    );

    const loadDocument = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(loadDocument)

    console.log("+++++++++++++++++++")
    console.log(docs)
    console.log("+++++++++++++++++++")
    return docs
  } catch (e) {
    console.log(e)
  }

  return null
}