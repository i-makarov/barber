import fileinclude from "gulp-file-include";
import { append } from "vary";

export const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(fileinclude())
        .pipe(app.plugins.replace(/@img\//g, 'images/'))
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browsersync.stream())
}