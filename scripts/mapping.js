// Polygon
// alpha 2
var AUTOTASK_TATACUY_ID_POLYGON_ALPHA_2 =
  "068eb09c-6c1e-43b0-8f9b-d2ab5bac527e";
var AUTOTASK_WIRACOCHA_ID_POLYGON_ALPHA_2 =
  "ae3ccb21-b444-4802-955c-dcc70ca73a1c";

// alpha 3
var AUTOTASK_TATACUY_ID_POLYGON_ALPHA_3_DEV =
  "8aca10b4-337a-4472-906f-bd144cee835f";
var AUTOTASK_WIRACOCHA_ID_POLYGON_ALPHA_3_DEV =
  "0fcf8849-42e5-4ef1-a135-85644b5c2abd";

var mapping = {
  [AUTOTASK_TATACUY_ID_POLYGON_ALPHA_2]: {
    pathToFolderCode: "./dist/tatacuy",
  },
  [AUTOTASK_TATACUY_ID_POLYGON_ALPHA_3_DEV]: {
    pathToFolderCode: "./dist/tatacuy",
  },
  [AUTOTASK_WIRACOCHA_ID_POLYGON_ALPHA_2]: {
    pathToFolderCode: "./dist/wiracocha",
  },
  [AUTOTASK_WIRACOCHA_ID_POLYGON_ALPHA_3_DEV]: {
    pathToFolderCode: "./dist/wiracocha",
  },
};

function retrieveInfoFromId(id) {
  return mapping[id];
}

module.exports = {
  retrieveInfoFromId,
};
