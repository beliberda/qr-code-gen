import { Header } from "Components/Layout/Header";
import "./style.css";
import check from "assets/images/icons/icon-check.svg";
import { ProductField } from "Components/UI/productField";
// import photo from "assets/images/photo1.png";
import arrowLeft from "assets/images/icons/arrow-left.svg";
import arrowRight from "assets/images/icons/arrow-right.svg";
import { useContext, useEffect, useState } from "react";
import { Context } from "index";
import axios from "axios";
import { API_URL, headers } from "Components/http";
import { useParams, useSearchParams } from "react-router-dom";

export default function ProductInfo() {
  const { store } = useContext(Context);
  const [productInfo, setProductInfo] = useState({});
  const [photos, setPhoto] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  console.log("eid", searchParams.get("eid"));
  useEffect(() => {
    try {
      axios
        .get(`${API_URL}qr/check`, {
          eid: searchParams.get("eid"),
        })
        .then((res) => {
          console.log(res.data);
          setProductInfo(res.data);
        });
    } catch (error) {}
  }, [searchParams]);

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
            <ProductField text={productInfo?.name} title="Название товара" />
            <ProductField
              text={productInfo?.category}
              title="категория товара"
            />
            <ProductField text={productInfo?.size} title="размера товара" />
            <ProductField text={productInfo?.color} title="цвет" />
            <ProductField text={productInfo?.materials} title="материал" />
            <ProductField
              text={productInfo?.description}
              title="описание товара"
            />
          </div>
          <div className="product-info__gallery">
            <div className="gallery-list">
              {photos.length === 0 ? (
                photos.map((item, i) => {
                  return (
                    <>
                      <img
                        key={i}
                        className="gallery-list__item"
                        src={item}
                        alt=""
                      />
                    </>
                  );
                })
              ) : (
                <></>
              )}
            </div>
            <div className="gallery__main-photo">
              <img className="main-photo__arrow" src={arrowLeft} alt="" />
              <img
                className="main-photo__photo"
                src={productInfo?.photo}
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
