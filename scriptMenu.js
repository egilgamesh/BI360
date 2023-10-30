// function addItem(itemType) {
//     // Create a new item element
//     var item = document.createElement('div');
//     item.classList.add('item');
//     item.innerHTML = itemType;
//     item.setAttribute('draggable', true);
//     item.setAttribute('ondragstart', 'drag(event)');
//     item.setAttribute('id', 'item-' + new Date().getTime());

//     // Add the new item to the editor panel
//     var editorPanel = document.getElementById('editor-panel');
//     editorPanel.appendChild(item);
//   }

  function toggleObjectsPanel() {
    var objectsPanel = document.getElementById("objects-panel");
    var objectsList = document.getElementById('objects-list');
    objectsPanel.classList.toggle('collapse');
    objectsList.classList.toggle('collapsed');
  }

  function togglePropertiesPanel() {
    var propertiesPanel = document.getElementById('properties-panel');
    var propertiesContent = document.getElementById('properties-content');
    propertiesPanel.classList.toggle('collapse');
    propertiesContent.classList.toggle('collapsed');
  }

  // function selectObject(item) {
  //   // Add logic to handle the selection of objects in the object panel
  //   item.classList.toggle("selected");
  // }

  function allowDrop(event) {
    event.preventDefault();
  }

  function drag(event) {
    event.dataTransfer.setData('text', event.target.id);
  }

  function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData('text');
    var item = document.getElementById(data);
    event.target.appendChild(item);
  }