export function addItem(val: any) {
  const element = document.createElement('li');
  const textnode = document.createTextNode(val);

  element.appendChild(textnode);
  document.getElementById('output').appendChild(element);
}
