# createElem
createElem is a tiny but powerful helper function, which can be used to quickly generate one or more HTML elements and HTML structures, in JavaScript, along with their attributes CSS, and js events. Fully unit tested with Mocha.

##  createElem(numOfElements, tag, options, children)
All parameters are optional, but they must appear in that order, and tag must be included if using options or children.

| Parameter | What it does| Type | Default|
| ------------- |:-------------:| :-----:| :-----:| 
| numOfElements | How many of this element to return. If one, it returns the element, otherwise it will return an array. | Must be a positive integer | 1 |
| tag | The element type you want to create. You can include the id as #id and classes as .class. You can mix and match these, eg div.class1#id.class2. Only the first given ID will be used. | String | div |
| options | This is where you add the attributes. If you include in here the id or class/className, these will overwrite the ones included with the tag. You can also include in here the CSS, under the style key, and JavaScript events, under the events key. More about these below. Alternatively, you can pass a string as parameter, to use as innerHTML. | Object | - |
| children | After your parameters, you can include any number of elements, or arrays of elements, arrays of arrays of elements, mixed and matched, whatever your situation. These will be appended inside the new element. | HTML elements, arrays | - |

#### Styles
This can be a string of CSS, or an object. When using an object, the keys can be given as either their CSS or JavaScript counterparts. EG: either "background-color" or "backgroundColor". Finally, any numbers given, with no units will be defaulted  to pixels.

#### Events
This can be an object, with the keys being the event name, and the values being functions, or array of functions which all get applied.

### What this doesn't do
The function creates element nodes, not HTML strings. So for example:
```javascript
// This
const elem = createElem("input.aClass#anId", {type: "text"})
// Replaces
const element = document.createElement("input")
element.id = "anId"
element.className = "aClass"
element.type = "text"
```

### Some quick examples

```javascript
const elem1 = createElem("div#id.class") // <div id="id" class="class"></div>
const elem2 = createElem("div", "some text") // <div>some text</div>
const elem3 = createElem("input", {type: "number"}) // <input type="number"/>
const elem4 = createElem("div", {style: {
    height: 200,
    width: "150px",
    backgroundColor: "red",
    "border-bottom": "1px solid black"
}})    // <div style="height:200px;width:150px;background-color:red;border-bottom:1px solid black"></div>
const elem4 = createElem("div#container", elem1, elem2, [elem3, elem4]) // Mix and match elements/arrays, as needed
/*
<div id="container">
    <div id="id" class="class"></div>
    <div>some text</div>
    <input type="number"/>
    <div style="height:200px;width:150px;background-color:red;border-bottom:1px solid black"></div>
</div>
*/
const arrayOfDivs = createElem(5, "div.class") // [div.class, div.class, div.class, div.class, div.class]
const divGivenCSSString = createElem("div", {style: "height:10px;width:10px"}) 
// <div style="height:10px;width:10px"></div>

const elem5 = createElem("div", {events: {
    click: () => console.log("hi")
}}) // <div></div>
elem5.click() // "hi"
```
