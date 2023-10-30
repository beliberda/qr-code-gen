export default function getBase64Image(imgElem) {
  // imgElem must be on the same server otherwise a cross-origin error will be thrown "SECURITY_ERR: DOM Exception 18"
  var canvas = document.createElement("canvas");
  canvas.width = imgElem.clientWidth;
  canvas.height = imgElem.clientHeight;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(imgElem, 0, 0);
  var dataURL = canvas.toDataURL("image/png");
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
