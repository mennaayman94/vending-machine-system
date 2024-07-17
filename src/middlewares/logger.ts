import morgan from "morgan";
const logger=morgan((tokens:any, req:any, res:any) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res).contentLength,
        '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ');
})
export default logger