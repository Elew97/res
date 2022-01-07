//不用设计稿尺寸除以2的解决方案
// .postcssrc.js文件，它除了暴露一个对象，也可以暴露一个函数，无论暴露什么，在webpack运行时，都会被我们配置的海量文件读取并执行。
// 暴露函数有一个好处，可以拿到webpack运行的当前执行文件的信息。
// 那么我们可以有这样一个思路：如果读取的是vant相关的文件，viewportWidth就设为375，如果是其他的文件，我们就按照我们UI的宽度来设置viewportWidth，即750。
const path = require('path');
module.exports = ({ webpack }) => {
    const designWidth = webpack.resourcePath.includes(path.join('node_modules', 'vant')) ? 375 : 750;
    return {
        plugins: {
            autoprefixer: {
                overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8']
            },
            "postcss-px-to-viewport": {
                unitToConvert: "px",
                viewportWidth: designWidth,
                unitPrecision: 6,
                propList: ["*"],
                viewportUnit: "vw",
                fontViewportUnit: "vw",
                selectorBlackList: [],
                minPixelValue: 1,
                mediaQuery: true,
                exclude: [],
                landscape: false
            }
        }
    }

}
