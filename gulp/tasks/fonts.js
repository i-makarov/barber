import { append } from "domutils";
import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

import ttf2woff from "gulp-ttf2woff";

export const otfToTtf = () => {
    return app.gulp
        .src(`${app.path.src.fonts}*.otf`, {})

    .pipe(
        fonter({
            formats: ["ttf"],
        })
    )

    .pipe(app.gulp.dest(`${app.path.src.fonts}`));
};

export const ttfToWoff = () => {
    return app.gulp
        .src(`${app.path.src.fonts}*.ttf`, {})
        .pipe(
            fonter({
                formats: ["woff"],
            })
        )
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        .pipe(app.gulp.src(`${app.path.src.fonts}*.ttf`))
        .pipe(ttf2woff2())
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
};

export const ttfToWoff2 = () => {
    return app.gulp
        .src(`${app.path.src.fonts}*.ttf`, {})
        .pipe(ttf2woff2())
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
};

// export const fontsStyle = () => {
//     let file_content = fs.readFileSync(`${app.path.srcFolder}/scss/fonts.scss`);
//     if (file_content == "") {
//         fs.writeFile(`${app.path.srcFolder}/scss/fonts.scss`, "", cb);
//         fs.readdir(app.path.build.fonts, function(err, items) {
//             if (items) {
//                 let c_fontname;
//                 for (var i = 0; i < items.length; i++) {
//                     let fontname = items[i].split(".");
//                     fontname = fontname[0];
//                     if (c_fontname != fontname) {
//                         fs.appendFile(
//                             `${app.path.srcFolder}/scss/fonts.scss`,
//                             '@include font("' +
//                             fontname +
//                             '", "' +
//                             fontname +
//                             '", "400", "normal");\r\n',
//                             cb
//                         );
//                     }
//                     c_fontname = fontname;
//                 }
//             }
//         });
//     }
// };
// export const fontsStyle = () => {
//     let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
// 	fs.readdir(app.path.build.fonts, function (err, fontsFiles) {

//     if (file_content == "") {
//         fs.writeFile(`${app.path.srcFolder}/scss/fonts.scss`, "", cb);
//         fs.readdir(app.path.build.fonts, function(err, items) {
//             if (items) {
//                 let c_fontname;
//                 for (var i = 0; i < items.length; i++) {
//                     let fontname = items[i].split(".");
//                     fontname = fontname[0];
//                     if (c_fontname != fontname) {
//                         fs.appendFile(
//                             `${app.path.srcFolder}/scss/fonts.scss`,
//                             '@include font("' +
//                             fontname +
//                             '", "' +
//                             fontname +
//                             '", "400", "normal");\r\n',
//                             cb
//                         );
//                     }
//                     c_fontname = fontname;
//                 }
//             }
//         });
//     }
// };
export const fontsStyle = () => {
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
    fs.readdir(app.path.build.fonts, function(err, fontsFiles) {
        if (fontsFiles) {
            if (!fs.existsSync(fontsFile)) {
                fs.writeFile(fontsFile, '', cb);
                let newFileOnly;
                for (var i = 0; i < fontsFiles.length; i++) {
                    let fontFileName = fontsFiles[i].split(".")[0];
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split("-")[0] ?
                            fontFileName.split("-")[0] :
                            fontFileName;
                        let fontWeight = fontFileName.split("-")[1] ?
                            fontFileName.split("-")[1] :
                            fontFileName;
                        if (fontWeight.toLowerCase() === "thin") {
                            fontWeight = 100;
                        } else if (fontWeight.toLowerCase() === "extralight") {
                            fontWeight = 200;
                        } else if (fontWeight.toLowerCase() === "light") {
                            fontWeight = 300;
                        } else if (fontWeight.toLowerCase() === "medium") {
                            fontWeight = 500;
                        } else if (fontWeight.toLowerCase() === "semibold") {
                            fontWeight = 600;
                        } else if (fontWeight.toLowerCase() === "bold") {
                            fontWeight = 700;
                        } else if (fontWeight.toLowerCase() === "extrabold") {
                            fontWeight = 800;
                        } else if (fontWeight.toLowerCase() === "black") {
                            fontWeight = 900;
                        } else {
                            fontWeight = 400;
                        }
                        fs.appendFile(
                            fontsFile + "/scss/fonts.scss",
                            '@include font("' +
                            fontName +
                            '", "' +
                            fontName +
                            '", "400", "normal");\r\n',
                            cb
                        );
                        fs.appendFile(
                            fontsFile,
                            `@font-face {
								font-family: ${fontName};
								font-display: swap;
								src: url("../${fontFileName}.woff") format("woff"), url("../${fontFileName}.woff2")
								font-weight: ${fontWeight};
								font-style: normal;
							}\r\n`,
                            cb
                        );
                        newFileOnly = fontFileName;
                    }
                }
            }
        }
    });
    return app.gulp.src(`${app.path.srcFolder}`);

    function cb() {}
};