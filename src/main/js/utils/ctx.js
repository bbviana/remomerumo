/**
 * @returns contextPath da aplicação.
 */
export default function(){
    // cache
    if(!window.contextPath){
        console.log("ctx");
        window.contextPath = document.body.dataset.contextPath;
    }
    return window.contextPath;
}
