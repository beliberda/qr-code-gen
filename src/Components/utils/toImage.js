export default function readFile(input, setQrCode, qrData) {
  const fr = new FileReader();
  fr.readAsDataURL(input);
  fr.addEventListener("load", () => {
    const res = fr.result;
    setQrCode(res);
  });
}
