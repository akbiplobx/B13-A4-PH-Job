(1) What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
# getElementById : getElementById is find any HTML element by it's unique ID.this method returns that element very quickly and accurately,allowing you to work with it.
# getElementByClassName : getElementByClassName is use for all the HTML elements with specific class name at once .it returns an HTMLCollection , which allows you to easily manipulate those elements.
# querySelector/querySelectorAll : querySelectorAll is a method that returns all matching elements based on a given selector at once .querySelector is a mathod that returns not all matching elements it's specfic element based on a given selector at once.

(2) How do you create and insert a new element into the DOM?
# At first need document.createElement() method .then you can add element to the DOM using appendChild()method .this is how the element gets inserted into the DOM. 

(3) What is Event Bubbling and how does it work?
# Event Bubbling is a proess where an event that occurs on an element propagates up to it's parent element ,all the way to the top of the DOM.This mechanism makes event handling easier and more efficient.

(4) What is Event Delegation in JavaScript? Why is it useful?
# Event Delegation is when you add a single event listener to a parent element, and that listener handles events for all of it's chilsdren, even those added later. it's efficient and reduces the need for multiple listener.

(5) What is the difference between preventDefault() and stopPropagation() methods?
# PreventDefafault() stops the browser's default action for an event, while stopPropagation() prevents the event from bubbling up or propagating to other elements.
