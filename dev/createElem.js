"use strict"

window.createElem = (...args) => {

    let elemCount = 1 

    if(Number.isInteger(args[0])){
        if(args[0]>0){
            elemCount = args[0]
            args.shift()
        }else throw new Error(`Element count must be larger than 0. Actual value: ${args[0]}`)
    }else if(Number(args[0])===args[0] && args[0]%1 !==0)  throw new Error("Floats are not supported for element count.")

    const tag = args[0] ? args[0] : "div" 
    args.shift()

    if(typeof tag != "string")
        throw new Error("Tag name must be a string")

    const newElem = document.createElement(tag.replace(/(#.*)|(\..*)/g, ""))
    const id = tag.match(/#(?:(?![#\.]).)*/)
    const classes = tag.match(/\.(?:(?![#\.]).)*/g)

    if(id){
        newElem.id = id[0].substr(1, id[0].length)
    }
    if(classes){
        newElem.className = classes.map(c => c.substr(1,c.length)).join(" ")
    }

    if(args.length) {

        if(typeof args[0] == "string") {
            newElem.innerHTML = args[0]
            args.shift()

        }else if(Object(args[0])===args[0] && !(args[0] instanceof HTMLElement) && !Array.isArray(args[0])){
            
            for(const attribute in args[0]){

                switch(attribute){

                    case "class":
                        newElem.className = args[0].class
                        break

                    case "style":
                        const styles = args[0].style

                        if(styles!=null && styles!=undefined && styles.constructor === Object){

                            newElem.style.cssText = Object.keys(styles)
                                .map(k => {
                                     const key = k.replace(/[A-Z]/g, k2 => `-${k2.toLowerCase()}`)
                                     const value = typeof styles[k]=="number" ? `${styles[k]}px` : styles[k]
                                     return `${key}:${value}`
                                })
                                .join(";")
                        }else if(typeof styles == "string"){
                            newElem.style.cssText = styles
                        }else throw new Error("Style value must be either object or string.")
                        break

                    case "events":
                        Object.keys(args[0].events).forEach(event => {

                            const fn = args[0].events[event]

                            if(Array.isArray(fn)){
                                fn.forEach(f => newElem.addEventListener(event, f))
                            }else if(typeof fn=="function"){
                                newElem.addEventListener(event, fn)
                            }
                        })
                        break

                    case "dataset":
                        Object.keys(args[0].dataset).forEach(dskey => {
                            
                            const dsvalue = args[0].dataset[dskey]

                            newElem.dataset[dskey] = dsvalue
                        })
                        break

                    default:
                        newElem[attribute] = args[0][attribute]
                }
            }
            args.shift()
        }
    }


    const processItem = item => {

        switch(true){
            case item instanceof HTMLElement:
                newElem.appendChild(item)
                break
                
            case Array.isArray(item):
                item.forEach(processItem)
                break

            case !!item && item.constructor === Object:
                throw new Error("Multiple attributes objects not supported")   
                break

            default:
                if(item != null){
                    console.warn(`Unsupported parameter. Type: ${typeof item} Value:`, item)
                }
        }
    }
    args.forEach(processItem)
    return elemCount>1 ? [...new Array(elemCount)].map(e => newElem.cloneNode()) : newElem
}