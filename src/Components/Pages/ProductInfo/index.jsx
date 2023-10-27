import { Header } from "Components/Layout/Header";
import "./style.css";
import check from "assets/images/icons/icon-check.svg";
import { ProductField } from "Components/UI/productField";
import photo from "assets/images/photo1.png";
import arrowLeft from "assets/images/icons/arrow-left.svg";
import arrowRight from "assets/images/icons/arrow-right.svg";
import { useContext, useEffect, useState } from "react";
import { Context } from "index";

const gallery = [photo, photo, photo, photo, photo];
export default function ProductInfo(params) {
  const { store } = useContext(Context);
  const [productInfo, setProductInfo] = useState({});
  useEffect(() => {
    setProductInfo(JSON.parse(JSON.stringify(store.product)));
  }, [productInfo]);
  let product = JSON.parse(JSON.stringify(store.product)).product;
  console.log(productInfo);
  return (
    <>
      <Header />
      <main className="main container product-info__content">
        <div className="product-info__top">
          <h1>Проверка подлинности товара</h1>
          <button>
            <img src={check} alt="" />
            Товар подлинный
          </button>
        </div>
        <section className="product-info__main">
          <div className="product-info__info">
            <ProductField
              text={productInfo.name ? productInfo.name : ""}
              title="Название товара"
            />
            <ProductField
              text={productInfo.category ? productInfo.category : ""}
              title="категория товара"
            />
            <ProductField
              text={productInfo.size ? productInfo.size : ""}
              title="размера товара"
            />
            <ProductField
              text={productInfo.color ? productInfo.color : ""}
              title="цвет"
            />
            <ProductField
              text={productInfo.materials ? productInfo.materials : ""}
              title="материал"
            />
            <ProductField
              text={productInfo.description ? productInfo.description : ""}
              title="описание товара"
            />
          </div>
          <div className="product-info__gallery">
            <div className="gallery-list">
              {gallery.map((photo, i) => {
                return (
                  <>
                    <img
                      key={i}
                      className="gallery-list__item"
                      src={productInfo.photo ? productInfo.photo : ""}
                      alt=""
                    />
                  </>
                );
              })}
            </div>
            <div className="gallery__main-photo">
              <img className="main-photo__arrow" src={arrowLeft} alt="" />
              <img
                className="main-photo__photo"
                src={productInfo.photo ? productInfo.photo : ""}
                alt=""
              />
              <img className="main-photo__arrow" src={arrowRight} alt="" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
