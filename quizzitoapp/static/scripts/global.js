
const elemObject = function ({name, fontsize='', width='', height='', padding='', transform='', reduce_size='1 / 10'}) {
    this.name = name;
    this.fontsize = fontsize;
    this.width = width;
    this.height = height;
    this.padding = padding;
    this.transform = transform;
    this.reduce_size = reduce_size;
};

var perfectScalerStatus = false, 
scaleItems = new Map( // Make sure to add ALL necessary attributes
    [
        [
            'classNames', [
                new elemObject({name: 'typer-paragraph', fontsize: '1.2em', reduce_size: '1.5 / 10'}), 
                new elemObject({name: 'welcome-remark-heading', fontsize: '3em', reduce_size: '3 / 10'}), 
                new elemObject({name: 'main_box_title', fontsize: '3em', reduce_size: '2 / 5'}), 
                new elemObject({name: 'hc_title', fontsize: '2.5em'}), 
                new elemObject({name: 'hc_text', fontsize: '1.2em'}), 
                new elemObject({name: 'tile-btn',  padding: '15px 35px', reduce_size: '1 / 5'}), 
                new elemObject({name: 'qgen-btn', fontsize: '19px', padding: '20px 60px'}), 
                new elemObject({name: 'tile', height: '310px', reduce_size: '0.3 / 10'}), 
                new elemObject({name: 'side-menu-headers', fontsize: '1.2em'}),
                new elemObject({name: 'hidden-menu-top-headers', fontsize: '1.2em'}),
                new elemObject({name: 'menu', fontsize: '17px', reduce_size: '1 / 10'}),
                new elemObject({name: 'result', transform: 'scale(1)', reduce_size: '1 / 2'}), 
                new elemObject({name: 'about-page-headings', fontsize: '2.5em'}), 
                new elemObject({name: 'about-page-parags', fontsize: '2em', reduce_size: '3 / 10'}), 
                new elemObject({name: 'myself-header', fontsize: '2em', reduce_size: '1.5 / 10'}), 
                new elemObject({name: 'myself-para', fontsize: '1.4em', reduce_size: '1 / 5'})
            ]
        ], 
        [
            'idNames', new Set(
                [
                    new elemObject({name: 'why-quiz-heading', fontsize: '4em', reduce_size: '3 / 10'}),
                    new elemObject({name: 'why-quiz-paragraph', fontsize: '2em', reduce_size: '1 / 5'}),
                    new elemObject({name: 'welcome-remark-paragraph', fontsize: '2em', lineheight: '48px', letterspacing: '5px', reduce_size: '1 / 2'}),
                    new elemObject({name: 'hint', fontsize: '1.2em', letterspacing: '2px', reduce_size: '2.5 / 10'}), 
                    new elemObject({name: 'typer-btn', fontsize: '1.1em', padding: '20px 50px', reduce_size: "1 / 5"}), 
                    new elemObject({name: 'qgen-quote1', fontsize: '1.7em'}), 
                    new elemObject({name: 'qgen-btn', fontsize: '1.1em', padding: '20px 50px', reduce_size: '1.3 / 10'}), 
                    new elemObject({name: 'welcome-to-qgen', fontsize: '2.4em'}), 
                    new elemObject({name: 'submit-btn', fontsize: '1.2em', padding: '15px 50px'}),
                ]
            )
        ], 
        [
            'tagNames', [
                // Not supported yet
            ]
        ], 
        [
            'names', new Set(
                [
                    // Not supported yet
                ]
            )
        ]
    ]
);


function perfectScaler() {
    codeblock: {
        if (window.innerWidth >= 501 && window.innerHeight >= 501) {
            perfectScalerStatus = false;
            undoPerfectScaling();
            break codeblock;
        }
        if (!perfectScalerStatus) {
            if (window.innerWidth <= 500 || window.innerHeight <= 500) {
                let classNames = scaleItems.get('classNames');
                let idNames = scaleItems.get('idNames');
                let tagNames = scaleItems.get('tagNames');
                let names = scaleItems.get('names');
    
                if (classNames) {
                    for (classname of classNames) {
                        applyPerfectScaling({
                            e: document.getElementsByClassName(classname.name), 
                            fontsize: classname.fontsize, 
                            width: classname.width, 
                            height: classname.height, 
                            padding: classname.padding,
                            transform: classname.transform, 
                            lineheight: classname.lineheight, 
                            letterspacing: classname.letterspacing,
                            reduce_size: classname.reduce_size
                        });
                    }
                }
                if (idNames) {
                    for (idname of idNames) {
                        applyPerfectScaling({
                            e: document.getElementById(idname.name), 
                            fontsize: idname.fontsize, 
                            width: idname.width, 
                            height: idname.height, 
                            padding: idname.padding,
                            transform: idname.transform, 
                            lineheight: idname.lineheight, 
                            letterspacing: idname.letterspacing,
                            reduce_size: idname.reduce_size
                        });
                    }
                }
                if (tagNames) {
                    for (tagname of tagNames) {
                        applyPerfectScaling(
                            {
                                e: document.getElementsByTagName(tagname.name), 
                                fontsize: tagname.fontsize, 
                                width: tagname.width, 
                                height: tagname.height, 
                                padding: tagname.padding,
                                transform: tagname.transform, 
                                lineheight: tagname.lineheight, 
                                letterspacing: tagname.letterspacing,
                                reduce_size: tagname.reduce_size
                            }
                        );
                    }
                }
                if (names) {
                    for (n of names) {
                        applyPerfectScaling({
                            e: document.getElementsByName(n.name), 
                            fontsize: n.fontsize, 
                            width: n.width, 
                            height: n.height, 
                            padding: n.padding,
                            transform: n.transform, 
                            lineheight: n.lineheight, 
                            letterspacing: n.letterspacing,
                            reduce_size: n.reduce_size
                        });
                    }
                }
                perfectScalerStatus = true;
            }
        }
    }
}


function applyPerfectScaling({e, fontsize='', width='', height='', padding='', transform='', lineheight='', letterspacing='', reduce_size='1 / 5'}) {
    /**
     * arg reduce_size (normal, fixed and small) 
     */

    fontsize = fontsize ? `calc(${fontsize} - (${fontsize} * ${reduce_size}))`: fontsize;
    width = width ? `calc(${width} - (${width} * ${reduce_size}))`: width;
    height = height ? `calc(${height} - (${height} * ${reduce_size}))`: height;
    lineheight = lineheight ? `calc(${lineheight} - (${lineheight} * ${reduce_size}))`: lineheight;
    letterspacing = letterspacing ? `calc(${letterspacing} - (${letterspacing} * ${reduce_size}))`: letterspacing;
    padding = setpadding(padding, reduce_size);
    if (transform) {
        let scale = getscale(transform);
        scale = `calc(${scale} - (${scale} * ${reduce_size}))`;
        transform = setscale(transform, scale);
    }


    if (e) {
        if (e instanceof HTMLCollection) {
            for (elem of e) {
                elem.style.fontSize = fontsize;
                if (width) { elem.style.width = width; }
                if (height) { elem.style.height = height; }
                if (lineheight) { elem.style.lineHeight = lineheight; }
                if (letterspacing) { elem.style.letterSpacing = letterspacing; }
                if (padding) { elem.style.padding = padding; }
                if (transform) { elem.style.transform = transform; }
            }
        } else {
            if (!(typeof e.style === 'undefined')) {
                e.style.fontSize = fontsize;
                if (width) { e.style.width = width; }
                if (height) { e.style.height = height; }
                if (lineheight) { e.style.lineHeight = lineheight; }
                if (letterspacing) { e.style.letterSpacing = letterspacing; }
                if (padding) { e.style.padding = padding; }
                if (transform) { e.style.transform = transform; }
            }
        }
    }
}


function undoPerfectScaling() {
    for (i of scaleItems.get('classNames')) {
        let items = document.getElementsByClassName(i.name);
        for (index = 0; index < items.length; index++) {
            if (i.fontsize) { items[index].style.fontSize = i.fontsize; }
            if (i.width) { items[index].style.width = i.width; }
            if (i.height) { items[index].style.height = i.height; }
            if (i.lineheight) { items[index].style.lineHeight = i.lineheight; }
            if (i.linespacing) { items[index].style.lineSpacing = i.linespacing; }
            if (i.padding) { items[index].style.padding = i.padding; }
        }
    }
    for (i of scaleItems.get('tagNames')) {
        let items = document.getElementsByTagName(i.name);
        for (index = 0; index < items.length; index++) {
            if (i.fontsize) { items[index].style.fontSize = i.fontsize; }
            if (i.width) { items[index].style.width = i.width; }
            if (i.height) { items[index].style.height = i.height; }
            if (i.lineheight) { items[index].style.lineHeight = i.lineheight; }
            if (i.linespacing) { items[index].style.lineSpacing = i.linespacing; }
            if (i.padding) { items[index].style.padding = i.padding; }
        }
    }
    for (i of scaleItems.get('names')) {
        let items = document.getElementsByName(i.name);
        for (index = 0; index < items.length; index++) {
            if (i.fontsize) { items[index].style.fontSize = i.fontsize; }
            if (i.width) { items[index].style.width = i.width; }
            if (i.height) { items[index].style.height = i.height; }
            if (i.lineheight) { items[index].style.lineHeight = i.lineheight; }
            if (i.linespacing) { items[index].style.lineSpacing = i.linespacing; }
            if (i.padding) { items[index].style.padding = i.padding; }
        }
    }
    for (i of scaleItems.get('idNames')) {
        let elem = document.getElementById(i.name);
        if (elem) {
            if (i.fontsize) {elem.style.fontSize = i.fontsize;}
            if (i.width) {elem.style.width = i.width;}
            if (i.height) {elem.style.height = i.height;}
            if (i.lineheight) { elem.style.lineHeight = i.lineheight; }
            if (i.linespacing) { elem.style.lineSpacing = i.linespacing; }
            if (i.padding) {elem.style.padding = i.padding;}
        }
    }
}


function getscale(string='') {
    if (string.includes('scale')) {
        let firstinx = string.search('scale');
        let secondinx = string.slice(firstinx).indexOf(')') + 1;
        string = string.slice(firstinx, firstinx+secondinx);
        return string;
    }
    return '';
}


function setscale(string='', newscale='') {
    return string.replace(getscale(string), newscale);
}


function setpadding(string='', reduce_size='1 / 10') {
    let newstring='';
    if (string) {
        for (i of string.split(' ')) {
            newstring += `calc(${i} - (${i} * ${reduce_size}))` + ' ';
        }
    }
    return newstring.trim();
}


function scaler(elemID, target=500) {
    let elem = document.getElementById(elemID), default_scale;
    if (window.innerWidth <= target || window.innerHeight <= target) {
        let x = window.innerWidth;
        default_scale = 1 - 100/x*0.9; 
        default_scale = (default_scale <= 0.5) ? 0.5: default_scale >= 1 ? 1: default_scale;
        elem.style.transform = `scale(${default_scale})`;
    } else {
        elem.style.transform = 'scale(1)';
    }
}


function closeLoader() {
    document.getElementById('loader-container').style.display = 'none';
}



// EVENTS


setTimeout(() => {fadeIn({elemID: 'loader-canceler', direction: 'right', speed: 1, steps: 100});}, 10000);

document.addEventListener('DOMContentLoaded', () => {
    // screensizeDetector(); 
})

window.addEventListener('load', () => {
    closeLoader();
    scaler('result-background-main-box');
    scaler('quiz-description-background-main-box');
    scaler('login-popup-main-box');
    scaler('feed-popup-main-box');
});

window.addEventListener('resize', () => {
    scaler('result-background-main-box');
    scaler('quiz-description-background-main-box');
    scaler('login-popup-main-box');
    scaler('feed-popup-main-box');
})