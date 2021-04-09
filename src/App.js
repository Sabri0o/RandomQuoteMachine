import React from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { faTwitter, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import randomColor from "randomcolor";

export default class RandomQuoteMachine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: {
text:'quotes are fetched from "https://type.fit/api/quotes"',
author : 'created by Sabri Trabelsi'
      },
      color: randomColor()
    };
    this.newQuote = this.newQuote.bind(this);
  }

  componentDidMount() {
    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((res) => {
        console.log(res[Math.floor(Math.random() * res.length)]);
        this.setState({
          quote: res[Math.floor(Math.random() * res.length)]
        });
        document.body.style = `background: ${this.state.color}`;
      });
  }

  newQuote() {
    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((res) => {
        console.log(res[Math.floor(Math.random() * res.length)]);
        this.setState({
          quote: res[Math.floor(Math.random() * res.length)],
          color: randomColor()
        });
        document.body.style = `background: ${this.state.color}`;
      });
  }

  render() {
    const { text, author } = this.state.quote;
    const color = this.state.color;
    return (
      <Container id="quote-box">
        <Card>
          <Card.Header style={{ backgroundColor: "white" }}>
            <span style={{ color: color }}>Quote</span>
          </Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p id="text" style={{ color: color }}>
                {" "}
                <FontAwesomeIcon icon={faQuoteLeft} pull="left" />{" "}
                <span>{text}</span>
              </p>
              <footer style={{ color: color }} className="blockquote-footer">
                <cite style={{ color: color }} id="author" title="Source Title">
                  {author ? author : "Unknown"}
                </cite>
              </footer>
            </blockquote>
          </Card.Body>
          <Card.Footer style={{ backgroundColor: "white" }}>
            <Row>
              <Col>
                <Card.Link id="tweet-quote" href="twitter.com/intent/tweet">
                  <Row
                    style={{
                      marginLeft: "1%"
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: color,
                        height: "40px",
                        width: "40px",
                        padding: "5px",
                        borderRadius: "3px"
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faTwitter}
                        color="white"
                        size="2x"
                      />
                    </div>
                    <div
                      style={{
                        backgroundColor: color,
                        height: "40px",
                        width: "40px",
                        padding: "5px",
                        borderRadius: "3px",
                        marginLeft: "3%"
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faFacebook}
                        color="white"
                        size="2x"
                      />
                    </div>
                  </Row>
                </Card.Link>
              </Col>
              <Col>
                <Button
                  id="new-quote"
                  onClick={this.newQuote}
                  className="float-right"
                  style={{
                    backgroundColor: color
                  }}
                >
                  New Quote
                </Button>
              </Col>
            </Row>
          </Card.Footer>
        </Card>
      </Container>
    );
  }
}
