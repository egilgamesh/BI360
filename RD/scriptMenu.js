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

  function ShowLayer() {
    const componentPage = document.getElementById("ComponentsPage");
    const componentradio = document.getElementById("componentsRadioLable");
    const layerPage = document.getElementById("LayersPage");
    const layerradio = document.getElementById("LayerRadioLable");
    componentPage.style.display = "none";
    layerPage.style.display = "block";
    layerradio.classList.add("active");
    componentradio.classList.remove("active");

}

function ShowComponents() {
    const componentPage = document.getElementById("ComponentsPage");
    const componentradio = document.getElementById("componentsRadioLable");
    const layerPage = document.getElementById("LayersPage");
    const layerradio = document.getElementById("LayerRadioLable");
    componentPage.style.display = "block";
    layerPage.style.display = "none";
    componentradio.classList.add("active");
    layerradio.classList.remove("active");
}

function ShowFileMenu()
{
    const fileMenuContainer = document.getElementById("FileMenuContainer");
    fileMenuContainer.style.display="Block";
}
function CloseFileMenu()
{
    const fileMenuContainer = document.getElementById("FileMenuContainer");
    fileMenuContainer.style.display="none";
}