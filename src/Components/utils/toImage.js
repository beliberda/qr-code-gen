export default function readFile(input, setQrCode) {
  const fr = new FileReader();
  fr.readAsDataURL(input);
  fr.addEventListener("load", () => {
    const res = fr.result;
    setQrCode(res);
  });
}
