export const server = (done) => {
    app.plugins.browsersync.init({
        server: {
            //.proxy: "http://localhost:8888/bars/",
            baseDir: `${app.path.build.html}`,
        },
        notify: false,
        port: 3000,
    });
};