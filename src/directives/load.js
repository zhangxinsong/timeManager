import vue from 'vue';

vue.directive('load',{
    bind(el,binding){
        loadValue(el,binding.value);
    },
    componentUpdated(el,binding){
        loadValue(el,binding.value);
    },
    unbind(el){
        let load = getLoad(el);
        if(load){
            el.removeChild(load);
        } 
    }
})

function loadValue(el,val){
    if(getLoad(el)){
        let load = getLoad(el);
        if(load){
            el.removeChild(load);
        }
    }else{
        let load = document.createElement('div');
        load.className = 'v-load-wrap';
        let loading = `<div class="v-loading">加载中</div>`;
        let nodata = `<div class="v-nodata">暂 </div>`
        load.innerHTML = val === 'loading' ? loading : nodata;
        if(val === 'loading'){
            el.appendChild(load);
        }
        else if(val == 'nodata'){
            el.appendChild(load);
        }
        else if(val === 'loaded'){
            let load = getLoad(el);
            if(load){
                el.removeChild(load);
            }
        }
    }
}

function getLoad( dom ){
    let children = dom.children ;
    for(let i=0 ; i<children.length ; i++){
        if(children[i].className.indexOf('v-load-wrap')>-1){
            return children[i]
        }
    }
    return false ;
}