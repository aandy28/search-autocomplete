import React from "react";
import axios from "axios";
import Suggestions from "./suggestions";
import styled from "styled-components";

const SearchSuggestionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1140px;

  @media only screen and (min-width: 768px) {
    flex-direction: column;
  }

  .search-suggestions {
    flex: 1;
  }
`;

const SearchSuggestionsActions = styled.div`
  justify-content: flex-end;
  margin-bottom: 15px;
  display: flex;
  margin-top: -60px;
`;

const SearchSuggestionClose = styled.button`
  background-color: #252729;
  border-color: #252729;
  margin-right: 15px;
`;

class Autocomplete extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      results: [],
      focus: false
    };

    this.inputChange = this.inputChange.bind(this);
    this.search = this.search.bind(this);
    const overlay = document.getElementById("overlay");
  }

  inputChange(e) {
    this.setState({
      searchTerm: e.target.value
    });

    this.state.searchTerm.length >= 3
      ? this.search()
      : this.setState({ results: [] });
  }

  closeSearch() {
    const jsForm = document.getElementById("js-search");
    const searchInput = document.getElementsByClassName("form-search");
    this.setState({ searchTerm: "", results: [] });
    overlay.classList.remove("active");
    jsForm.classList.remove("active");
    for (var i = searchInput.length - 1; i >= 0; i--) {
      searchInput[i].classList.remove("active");
    }
  }

  search() {
    const jsForm = document.getElementById("js-search");
    const formControl = document.getElementsByClassName("search-autocomplete");
    const searchInput = document.getElementsByClassName("form-search");
    if (overlay) overlay.classList.add("active");
    if (overlay) jsForm.classList.add("active");

    if (formControl) {
      for (var i = formControl.length - 1; i >= 0; i--) {
        formControl[i].classList.add("active");
      }
    }

    if (searchInput) {
      for (var i = searchInput.length - 1; i >= 0; i--) {
        searchInput[i].classList.add("active");
      }
    }

    axios
      .get("/js_search", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        params: {
          q: this.state.searchTerm
        }
      })
      .then(response => {
        if (response.data.products) {
          this.setState({
            results: response.data.products
          });
        }
      })
      .catch(error => {
        console.log("Error Completing search....");
      });
  }

  render() {
    const maxTransactionSearch =
      this.props.maxTransaction === true ? true : false;
    return (
      <div className="search-autocomplete">
        <div className="form-group form-search max-trans">
          <input
            className="form-control"
            onChange={this.inputChange}
            placeholder="Search for product or brand"
          />
          <i className="search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 29.9624">
              <title>Search icon</title>
              <g>
                <path
                  className="a"
                  d="M23.3418,11.6709A11.6709,11.6709,0,1,0,11.6709,23.3418,11.6841,11.6841,0,0,0,23.3418,11.6709ZM11.6709,19.8185a8.1476,8.1476,0,1,1,8.1476-8.1476A8.1567,8.1567,0,0,1,11.6709,19.8185Z"
                />
                <rect
                  className="a"
                  x="21.3422"
                  y="19.5869"
                  width="6.166"
                  height="9.6016"
                  transform="translate(-10.0908 24.4125) rotate(-44.9972)"
                />
              </g>
            </svg>
          </i>
        </div>
        {this.state.results.length > 0 ? (
          <SearchSuggestionsWrapper>
            <SearchSuggestionsActions>
              <SearchSuggestionClose
                className="close-search"
                onClick={this.closeSearch.bind(this)}
              >
                Close
              </SearchSuggestionClose>
              <a
                href={`/search?q=${this.state.searchTerm}`}
                className="search-suggestions--show-results btn"
              >
                Show All Results
              </a>
            </SearchSuggestionsActions>
            <Suggestions
              results={this.state.results}
              maxTransactionSearch={maxTransactionSearch}
              handleProductClick={this.props.handleProductClick}
              search_term={this.state.searchTerm}
              closeSearch={this.closeSearch.bind(this)}
            />
          </SearchSuggestionsWrapper>
        ) : null}
      </div>
    );
  }
}

export default Autocomplete;
