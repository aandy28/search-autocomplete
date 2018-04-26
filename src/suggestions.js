import React from "react";
import styled from "styled-components";

const SuggestionItem = styled.div`
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  flex-direction: row;

  &:nth-of-type(even) {
    background-color: #dfdfdf;
  }

  @media only screen and (min-width: 1025px) {
    padding: 1rem;
  }
`;

const ProductImage = styled.div`
  width: 60px;
  margin-right: 15px;

  a {
    display: block;
  }
`;

const ProductContent = styled.div`
  flex-grow: 1;
`;

const ProductActions = styled.div``;

const PriceHeading = styled.h3`
  margin: 0 0 15px 0;
  text-align: right;
  color: #a55a95;
`;

class Suggestions extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className="search-suggestions search-suggestions--visible"
        onClick={this.props.handleProductClick}
      >
        {this.props.results.slice(0, 5).map((pr, index) => {
          console.log(pr);
          return (
            <SuggestionItem
              className="ss-product"
              key={index}
              data-product-id={pr.id}
              data-product-stock-code={pr.stock_code}
              data-product-catalogue={pr.catalogue}
            >
              {this.props.maxTransactionSearch !== true ? (
                <ProductImage>
                  <a href={`/products/${pr.id}`}>
                    <img
                      className="ss-product__image"
                      src={pr.image_thumbnail}
                      alt={pr.description}
                    />
                  </a>
                </ProductImage>
              ) : (
                <ProductImage>
                  <img
                    className="ss-product__image"
                    src={pr.image_thumbnail}
                    alt={pr.description}
                  />
                </ProductImage>
              )}
              <ProductContent className="ss-product__content">
                <h2 className="ss-product__title">
                  {this.props.maxTransactionSearch !== true ? (
                    <a href={`/products/${pr.id}`}>{pr.description}</a>
                  ) : (
                    pr.description
                  )}
                </h2>
              </ProductContent>
              <ProductActions>
                <PriceHeading>&pound;25.00</PriceHeading>
                <a className="btn" href={`/products/${pr.id}`}>
                  View Product
                </a>
              </ProductActions>
            </SuggestionItem>
          );
        })}
      </div>
    );
  }
}

export { Suggestions as default };
