const Hapi = require('hapi');
const AJAXCONFIG = require('./src/utils/ajaxConfig');

// 定义服务
const server = Hapi.server({
    // 配置端口：3000
    port: 3000,
    // 配置访问域：localhost
    host: 'localhost',
    // 配置允许跨域
    routes: {
        cors: {
            origin: ['*']
        }
    }
});

function router(path, data, method) {
    return server.route({
        path: path,
        method: method ? method : 'GET',
        handler() {
            return {
                code: 200,
                success: true,
                msg: '',
                data: data,
            };
        }
    });
}

const init = async () => {

    // 首页“/test”接口测试
    router(AJAXCONFIG.TEST, {
        name: 'WxCool'
    });

    // 获取url参数方式一：请求：http://localhost:3000/api/welcome?id=1
    router(AJAXCONFIG.WELCOME, {
        msg: `welcome ${request.query.id}`
    }, 'post');

    // 获取url参数方式一：请求：http://localhost:3000/api/welcome/1
    router(AJAXCONFIG.WELCOME + '/{id}', {
        msg: `${request.params.id},welcome to use hapi!`
    }, 'post');

    await server.start();
    // console.log(`server running at: ${server.info.uri}`);
};

init();
