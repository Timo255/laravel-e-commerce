import React, { useContext, useEffect, useState } from "react";
import { ProductCart } from "../Context/OveralProvider";

const ProductDetails = ({ item }) => {
  const {
    id,
    uuid,
    variations,
    category,
    price,
    variationTitle,
    nameProduct,
    quantity,
  } = item;
  const { addToCart } = useContext(ProductCart);

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedText, setSelectedText] = useState("");
  const [prquantity, setQuantity] = useState(quantity);

  /* image change when different variation is selected */
  //function to get the image according to the variation we will be passing in
  const getImage = (varia) => {
    const image = item.variations.find((vari) => vari.name.includes(varia));
    return image.imgUrl || "";
  };
  /* /image change when different variation is selected */

  const getPrice = (variaNames) => {
    const priceValue = item.variations.find((vari) =>
      vari.name.includes(variaNames)
    );
    return priceValue.priceV || "";
  };

  const getId = (variaName) => {
    const idValue = item.variations.find((vari) =>
      vari.name.includes(variaName)
    );
    console.log(idValue.productsId);
    return idValue.productsId || "";
  };

  useEffect(() => {
    // this useEffect updates initial setSelectedColor and setSelectedText, it saves the initial variation to the "selectedColor" & "selectedText",when we get the single product for the product details "helps as to have an active variation first then when you select another variation it changes"
    if (item && item?.variations[0].colorData1 != "") {
      setSelectedColor(item?.variations[0]?.colorData1);
    } else if (item && item?.variations[0]?.textData != "") {
      setSelectedText(item?.variations[0]?.textData);
    }
  }, [item, setSelectedColor, setSelectedText]);

  return (
    <div className="itemDetail" key={uuid}>
      <div className="imgBox">
        <div className="bigImg">
          <img
            src={`${import.meta.env.VITE_APIURL}/images/${getImage(
              selectedColor ? selectedColor : selectedText
            )}`}
            alt=""
          />
        </div>
      </div>
      <div className="imgDetails">
        <p className="type">Home / {category}</p>
        <h1 className="name">{nameProduct}</h1>
        <h4 className="price">
          ${selectedText ? getPrice(selectedText) : price}
        </h4>
        <h3 className="variTitle">{variationTitle}</h3>
        <div className="variBox">
          {variations.map((vari) => (
            <div key={vari.uuid}>
              <div
                className={
                  vari.colorData1 != "" ? "variationActive" : "variations"
                }
              >
                <div
                  className={`${vari.classname} ${
                    selectedColor === vari.colorData1 ? "active-color" : ""
                  }`}
                  data-color={vari.colorData1}
                  onClick={() => setSelectedColor(vari.colorData1)}
                ></div>
              </div>
              <div
                className={
                  vari.textData != "" ? "variationActive" : "variations"
                }
              >
                <div
                  className={`${vari.classname} ${
                    selectedText === vari.textData ? "active-text" : ""
                  }`}
                  onClick={() => setSelectedText(vari.textData)}
                >
                  {vari.textData}
                </div>
              </div>
            </div>
          ))}
        </div>
        <input
          className="quantity"
          type="number"
          value={prquantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          min="1"
        />
        <a
          href="#"
          className="btnAdd"
          onClick={() =>
            addToCart({
              productName: nameProduct,
              price: selectedText ? getPrice(selectedText) : price,
              variationName: selectedColor ? selectedColor : selectedText,
              quantity: prquantity,
              imgUrl: getImage(selectedColor ? selectedColor : selectedText),
              productId:
                selectedText || selectedColor
                  ? getId(selectedText || selectedColor)
                  : id,
              variationUuid: getId(
                selectedColor ? selectedColor : selectedText
              ),
            })
          }
        >
          Add To Cart
        </a>
        <div className="productDesc">
          <h3 className="detailTiltle">Product Details</h3>
          <p className="desc">
            Give Your summer wardrobe a style upgrade with the HRX Men's Active
            T-shirt. Team it with a pair of shorts for your morning workout or a
            denims for an evening out with the guys.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
