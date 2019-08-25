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
    // server.route()配置路由

    // 配置路由“/”
    server.route({
        path: '/',
        method: 'GET',
        handler() {
            return 'Hapi world'
        }
    });

    // 首页“/test”接口测试
    router(AJAXCONFIG.TEST, {
        name: 'WxCool'
    });
    // 👆上面的请求经过封装，👇下面的是原生的
    // server.route({
    //     path: AJAXCONFIG.TEST,
    //     method: 'GET',
    //     handler() {
    //         return {
    //             code: 200,
    //             success: true,
    //             msg: 'welcome to use hapi',
    //             data: {
    //                 name: 'WxCool'
    //             }
    //         }
    //     }
    // });

    // 获取url参数方式一：请求：http://localhost:3000/api/welcome?name=chenxin
    server.route({
        path: '/api/welcome',
        method: 'GET',
        handler(request) {
            return {
                code: 200,
                success: true,
                data: {
                    msg: `welcome ${request.query.name}`
                }
            }
        }
    });

    // 获取url参数方式一：请求：http://localhost:3000/api/welcome/chenxin
    server.route({
        path: '/api/welcome/{name}',
        method: 'GET',
        handler(request) {
            return {
                code: 200,
                success: true,
                data: {
                    msg: `${request.params.name},welcome to use hapi!`
                }
            };
        }
    });

    await server.start();
    // console.log(`server running at: ${server.info.uri}`);
};

init();
