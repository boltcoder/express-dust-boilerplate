import dust from "dustjs-helpers";
import fs from "fs";

function getAssetUrl(file) {
    return `${assetsHost}${file}?v=${assetsVersion}`;
}

dust.helpers.getCss = (chunk, context, bodies, params) => {
    let css = context.get('css'),
        html = '';
    css.forEach((file)=>{
        html += '<link rel="stylesheet" type="text/css" href="'+getAssetUrl(file)+'">';
    });


    return chunk.write(html || '');
}

dust.helpers.getJs = (chunk, context, bodies, params) => {
    let js = context.get('js'),
        html = '';
    js.forEach(file => {
        html += '<script src="'+getAssetUrl(file)+'"></script>';
    });
    return chunk.write(html || '');
}

dust.helpers.getImgPath = (chunk, context, bodies, params) => {
    let relativePath = params.src,
        imageFolder = `${ASSETS_FOLDER}/images`;

    return chunk.write(`${CDN}/${imageFolder}/${relativePath}`);
}