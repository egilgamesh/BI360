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

function CloseSaveDialogBox() {
  document.getElementById("saveDialog").style.display = "none";
}

async function ShowSaveDialog() {
  document.getElementById("saveDialog").style.display = "block";
  document.getElementById("FileMenuContainer").style.display = "none";
}