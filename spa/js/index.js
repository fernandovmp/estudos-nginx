const route = window.location.pathname;

const root = document.getElementById('root');

function addContent(tag, content) {
    const node = document.createElement(tag);
    const nodeContent = document.createTextNode(content);
    node.appendChild(nodeContent);
    root.appendChild(node);
}

if (route === '/home') {
    addContent('h1', 'Home page');
} else {
    addContent('h1', "This isn't the home page");
}
