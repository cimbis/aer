import {fileURLToPath} from "url";
import fs from "fs"
import path, {dirname} from "path";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const inputPath = path.join(__dirname, "./all_frames_processed_GS012237_1719791982345517");
const imageNames = fs.readdirSync(inputPath);
const outputPath = path.join(__dirname, "../src/assets/markerThumbnails");


const cleanOutputPath = (outputPath: string) => {
    if (
        fs.existsSync(outputPath)
        && fs.lstatSync(outputPath).isDirectory()
    ) {
        const contents = fs.readdirSync(outputPath)
        contents.forEach(file => {
            fs.unlinkSync(path.join(outputPath, file));
        })
    }
}

const generateThumbnails = async (
    inputPath: string,
    imageNames: string[],
    outputPath: string,
    outputSizeInPx: number
) => {
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
    }
    for (const imageName of imageNames) {
        console.log(imageName);
        const resizedImage = sharp(path.join(inputPath, imageName)).resize(outputSizeInPx, outputSizeInPx)
        await resizedImage.toFile(path.join(outputPath, `thumb_${imageName}`));
    }
}

cleanOutputPath(outputPath);
await generateThumbnails(inputPath, imageNames, outputPath, 25)
