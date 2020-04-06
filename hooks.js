class Hooks {
    constructor() {
        this.name = '这是测试hooks的插件'
    }
    // 必须有apply方法，且参数是compiler
    apply(compiler) {
        compiler.plugin('entryOption', () => {
            console.log('在 entry 配置项处理过之后，执行插件');
        });
        compiler.plugin('emit', (compilation, callback) => {
            console.log('生成资源到 output 目录之前。');
            // 在生成文件中，创建一个头部字符串：
            var filelist = 'In this build:\n\n';

            // 遍历所有编译过的资源文件，
            // 对于每个文件名称，都添加一行内容。
            for (var filename in compilation.assets) {
                filelist += ('- ' + filename + '\n');
            }

            // 将这个列表作为一个新的文件资源，插入到 webpack 构建中：
            compilation.assets['filelist.md'] = {
                source: function () {
                    return filelist;
                },
                size: function () {
                    return filelist.length;
                }
            };
            // console.log('compilation.assets', compilation.assets);
            // console.log('compilation.assets', compilation.assets['main.js'].source());
            console.log('compilation.assets', compilation.assets['filelist.md'].source());

            callback();
        });
        compiler.plugin('done', () => {
            console.log('编译(compilation)完成。');
        });
        compiler.plugin('compilation', (compilation) => {
            console.log('编译(compilation)完成。');
        });
    }
}

module.exports = Hooks