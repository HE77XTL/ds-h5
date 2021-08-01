const path = require('path');
const glob = require('glob');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/** 从 page.config.js 中扫描获取入口以及对应的模板*/
function scanEntry() {
    const srcDir = path.join(__dirname, './src/pages');
    return glob.sync(srcDir + '/**/page.config.js').map(name => {
        const dirPattern = /(?<=\/pages\/).*(?=\/)/;
        const dirName = name.match(dirPattern);
        const pageConfig = require(name)
        return {
            name: dirName[0],
            pages: pageConfig.pages
        }
    });
}

function getEntryAndTemplate(modelData) {
    let entry = {};
    let htmlTemplate = [];

    modelData.forEach(item => {
        item.pages.forEach(pagesItem => {
            const entryKey = item.name + '_' + pagesItem.entry.replace('.js', '');
            htmlTemplate.push(new HtmlWebpackPlugin({
                template: path.resolve(__dirname, `./src/pages/${item.name}/${pagesItem.template}`),
                filename: `pages/${item.name}/${pagesItem.filename}`,
                chunks: [entryKey],
            }));
            entry[entryKey] = path.resolve(__dirname, `./src/pages/${item.name}/${pagesItem.entry}`);
        })
    });
    return {
        entry,
        htmlTemplate
    }
}


const {entry, htmlTemplate} = getEntryAndTemplate(scanEntry());

console.log('entry, htmlTemplate')
console.log(entry, htmlTemplate)


module.exports = {
    mode: 'production',
    entry: {
        app: path.resolve(__dirname, './src/index.js'),
        ...entry
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]_v[hash].js',
        clean: true,
    },
    plugins: htmlTemplate.concat([
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: `index.html`,
            chunks: ['app'],
        }),
        new MiniCssExtractPlugin({
            filename: `css/[name]_v[hash].css`
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: "./src/lib", to: "./lib"},
            ],
        })
    ]),

    module: {
        rules: [
            {
                test: /\.(le|c)ss$/,
                use: [

                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                strictMath: true,
                            },
                        },
                    },
                ]
            },
            {
                test: /.ejs$/,
                use: [
                    'ejs-compiled-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
};
