import { Header } from "Components/Layout/Header";
import "./style.css";
import check from "assets/images/icons/icon-check.svg";
import { ProductField } from "Components/UI/productField";
// import photo from "assets/images/photo1.png";
import arrowLeft from "assets/images/icons/arrow-left.svg";
import arrowRight from "assets/images/icons/arrow-right.svg";
import { useEffect, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";
import UserService from "Components/services/UserService";
import { Catch } from "Components/utils/catch";

export default function ProductInfo() {
  const [productInfo, setProductInfo] = useState({
    category: "",
    created_at: "",
    name: "",
    photo: [""],
    size: "",
    template_id: "",
    updated_at: "",
    _id: "",
  });
  const [searchParams, setSearchParams] = useSearchParams();

  // get description from template
  const [description, setDescription] = useState("");
  const getDescription = (id) => {
    const response = UserService.getTemplate(id);
    response
      .then((res) => {
        setDescription(res.data.text);
      })
      .catch((error) => {
        Catch(error);
      });
  };
  const navigate = useNavigate();
  useEffect(() => {
    const response = UserService.getQrCheck(searchParams.get("eid"));
    response
      .then((res) => {
        setProductInfo(res.data.product);
        console.log("Qr code", res);
        return res.data.product;
      })
      .catch(() => {
        navigate(`/`);
      })
      .then((res) => {
        getDescription(res.template_id);
      })
      .catch((error) => {
        Catch(error);
      });
  }, [searchParams]);
  return (
    <>
      {document.referrer === "https://manekenbrand.com/" ? <> </> : <Header />}

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
            <ProductField text={description} title="описание товара" />
          </div>
          <div className="product-info__gallery">
            <div className="gallery-list">
              {productInfo?.photo?.length > 1 ? (
                productInfo.photo.map((item, i) => {
                  if (i <= 4) {
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
                  }
                  return <></>;
                })
              ) : (
                <></>
              )}
            </div>
            <div className="gallery__main-photo">
              {productInfo?.photo?.length > 1 ? (
                <img className="main-photo__arrow" src={arrowLeft} alt="" />
              ) : (
                <></>
              )}
              {productInfo?.photo ? (
                <img
                  className="main-photo__photo"
                  src={productInfo?.photo}
                  alt=""
                />
              ) : (
                <h4>no photo</h4>
              )}

              {productInfo?.photo?.length > 1 ? (
                <img className="main-photo__arrow" src={arrowRight} alt="" />
              ) : (
                <></>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
