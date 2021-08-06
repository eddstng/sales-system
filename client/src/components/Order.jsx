import React from "react";
import axios from "axios";
import {
  SimpleGrid,
  Button,
  Text,
  Container,
  Box,
  Center,
} from "@chakra-ui/react";

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.selectItem = this.selectItem.bind(this);
    this.selectCustomer = this.selectCustomer.bind(this);
    this.state = {
      items: [],
      selectedItems: [],
      customerData: {
        id: null,
        name: "Terrance Phillips",
        phone: "911",
        address: "901-12 Iowpq St",
      },
    };
    this.getItems = this.getItems.bind(this);
  }

  getItems() {
    axios
      .get(`http://localhost:3000/get/items/all`)
      .then((res) => {
        const items = res.data;
        this.setState({ items: items });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  selectItem(item) {
    let selectedItems = this.state.selectedItems;
    selectedItems.push(item);
    this.setState({ selectedItems: selectedItems });
  }

  selectCustomer() {
    let customerData = this.state.customerData;
    customerData.id = "1";
    this.setState({ customerData: customerData });
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentDidMount() {
    this.getItems();
    this.scrollToBottom();
  }

  render() {
    let renderCustomerButton;
    if (this.state.customerData.id === null) {
      renderCustomerButton = (
        <Center>
          <Button
            onClick={() => this.selectCustomer()}
            boxShadow="md"
            m="1em"
            mb="2em"
            height="5em"
            weight="5em"
            rounded="md"
            bg="gray.300"
            color="black"
          >
            Select Customer
          </Button>
        </Center>
      );
    } else {
      renderCustomerButton = (
        <Container m="2">
          {this.state.customerData.id}
          <br />
          {this.state.customerData.phone}
          <br />
          {this.state.customerData.address}
        </Container>
      );
    }
    return (
      <div>
        <SimpleGrid
          width="390px"
          rounded="lg"
          ml="5px"
          color="gray.400"
          position="fixed"
          maxHeight="100%"
          overflow="auto"
        >
          <Container
            mt="2%"
            height="10%"
            width="100%"
            textAlign={"left"}
            fontSize={28}
          >
            {renderCustomerButton}
          </Container>
          <Container
            mt="8.5em"
            width="390px"
            color="gray.400"
            position="fixed"
            maxHeight="100%"
            overflow="auto"
          >
            {this.state.selectedItems.map((item) => (
              <div>
                <Text
                  boxShadow="md"
                  mb="1"
                  p="3"
                  height="6em"
                  rounded="md"
                  bg="gray.300"
                  color="black"
                  fontSize={"18"}
                >
                  <Container textAlign={"left"}>
                    <Text fontSize={"16"}>{item.name_eng}</Text>
                    <p>{item.name_chn}</p>
                  </Container>
                  <Container textAlign={"right"}>
                    <p>{item.price}</p>
                  </Container>
                </Text>
              </div>
            ))}
          </Container>
          <div
            style={{ float: "left", clear: "both" }}
            ref={(el) => {
              this.messagesEnd = el;
            }}
          ></div>
        </SimpleGrid>
        <SimpleGrid
          bg="gray.50"
          columns={{ sm: 1, md: 2 }}
          spacing="8"
          ml="400px"
          textAlign="center"
          rounded="lg"
          color="gray.400"
        >
          {this.state.items.map((item) => (
            <Button
              onClick={() => this.selectItem(item)}
              boxShadow="md"
              mt="1"
              height="10em"
              rounded="md"
              bg="gray.300"
              color="black"
            >
              {item.id} <br />
              {item.name_eng} <br />
              {item.name_chn}
              <br />
              {item.price}
            </Button>
          ))}
        </SimpleGrid>
      </div>
    );
  }
}

export default Order;
