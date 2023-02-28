// import gulp from "gulp";
import gulp from "gulp";
import { path } from "./gulp/config/path.js";
// import { copy } from "./gulp/tasks/copy.js";
import { plugins } from "./gulp/config/plugins.js";

//Задачи
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";
import { fontsStyle, otfToTtf, ttfToWoff } from "./gulp/tasks/fonts.js";

global.app = {
    path: path,
    gulp: gulp,
    plugins: plugins,
};

function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.images, images);
}
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const mainTasks = gulp.parallel(fonts, copy, html, scss, js, images);

//Сценарии для выполнения
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));

gulp.task("default", dev);