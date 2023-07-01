import { PDFLoader } from "langchain/document_loaders/fs/pdf";

export default async function readDoc(blob: any) {
  try {

    const loader = new PDFLoader(
      blob, { splitPages: false }
    );

    const docs = await loader.load();
    console.log("+++++++++++++++++++")
    console.log(docs)
    console.log("+++++++++++++++++++")
  } catch (e) {
    console.log(e)
  }

  return null
}