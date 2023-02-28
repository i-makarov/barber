import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());
console.log(rootFolder);

const buildFolder = `./assets`;
const srcFolder = `./src`;

export const path = {
    build: {
        html: `${buildFolder}`,
        css: `${buildFolder}/css/`,
        js: `${buildFolder}/js/`,
        images: `${buildFolder}/images/`,
        fonts: `${buildFolder}/fonts/`,
        files: `./parts/`,
    },
    src: {
        html: `${srcFolder}/*.html`,
        scss: `${srcFolder}/scss/style.scss`,
        js: `${srcFolder}/js/app.js`,
        images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/images/**/*.svg`,
        files: `${srcFolder}/parts/**/*.*`,
        fonts: `${srcFolder}/fonts/`,
    },  
    watch: {
        html: `${srcFolder}/**/*.html`,
        scss: `${srcFolder}/scss/**/*.scss`,
        js: `${srcFolder}/js/**/*.js`,
        images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
        files: `${srcFolder}/template-parts/**/*.*`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
    ftp: ``,
};