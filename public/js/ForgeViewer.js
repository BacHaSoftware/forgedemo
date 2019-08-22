/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

var viewer;

function launchViewer(urn) {
  var options = {
    env: 'AutodeskProduction',
    getAccessToken: getForgeToken
  };

  Autodesk.Viewing.Initializer(options, () => {
    viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'));
    viewer.start();
    var documentId = 'urn:' + urn;
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);

    viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, event => onDocumentSelect(event));
  });
}

function onDocumentLoadSuccess(doc) {
  var viewables = doc.getRoot().getDefaultGeometry();
  viewer.loadDocumentNode(doc, viewables).then(i => {
    // documented loaded, any action?
  });
}

function onDocumentLoadFailure(viewerErrorCode) {
  console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

function getForgeToken(callback) {
  fetch('api/forge/oauth/token').then(res => {
    res.json().then(data => {
      callback(data.access_token, data.expires_in);
    });
  });
}

function onDocumentSelect(event) {
  var dbId = event.dbIdArray[0];
  viewer.getProperties(dbId, function (propertiesData) {
    var treeData = getTreeDataFromProperties(propertiesData.properties);
    $('#properties').jstree('destroy');
    $('#properties').jstree({
      'core': {
        'data': treeData
      },
    })
    // var propertiesElement = $('#properties');
    // var treeData = getTreeDataFromProperties(propertiesData.properties);
    // if (propertiesElement) {
    //   propertiesElement.empty();
    //   propertiesElement.jstree({
    //     'core': {
    //       'themes': { "icons": false },
    //       'data': treeData
    //     },
    //   }).on('loaded.jstree', function () {
    //     propertiesElement.jstree('open_all');
    //   })
    // }
  })
}

function getTreeDataFromProperties(properties) {
  var treeData = [];
  const res = properties.reduce((acc, curr) => {
    if (!acc[curr.displayCategory]) acc[curr.displayCategory] = []; //If this type wasn't previously stored
    acc[curr.displayCategory].push(curr);
    return acc;
  }, {});
  for (let [key, value] of Object.entries(res)) {
    let obj = {
      text: key,
      children: value.map(val => {
        return val.displayName + ': ' + val.displayValue + (val.units ? ' ' + val.units : '');
      })
    };
    treeData.push(obj);
  }
  return treeData;
}