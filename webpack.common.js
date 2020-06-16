const DtsBundleWebpack = require("dts-bundle-webpack");
const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        cli: path.resolve(__dirname, "./src/cli.ts"),
        exports: path.resolve(__dirname, "./src/exports.ts")
    },
    externals: [
        /^[a-z\-0-9]+$/ // Exclude node_modules
    ],
    node: {
        __dirname: false
    },
    target: "node",
    output: {
        filename: "[name].js",
        sourceMapFilename: "[name].js.map",
        library: "youtube-music-ts-api",
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /(\.ts)$/,
                use: [{
                    loader: "ts-loader"
                }]
            },
            {
                test: /\.(js)?$/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                        presets: ["@babel/preset-env"]
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".ts"]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: "#! /usr/bin/env node",
            raw: true
        }),
        new DtsBundleWebpack({
            baseDir: "build-dts",
            main: "build-dts/exports.d.ts",
            name: "youtube-music-ts-api",
            out: "../index.d.ts"
        })
    ]
};
