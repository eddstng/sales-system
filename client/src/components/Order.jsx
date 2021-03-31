import React from 'react';
import axios from 'axios';
import { SimpleGrid, Button, Text } from "@chakra-ui/react"

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            selectedItems: [{name_eng:"Chicken Foo Yung", price:2.30}, {name_eng:"Chicken Foo Yung", price:2.30}, {name_eng:"Chicken Foo Yung", price:2.30}, {name_eng:"Chicken Foo Yung", price:2.30}, {name_eng:"Chicken Foo Yung", price:2.30}, {name_eng:"Chicken Foo Yung", price:2.30}, {name_eng:"Chicken Foo Yung", price:2.30}, ]
        }
        this.getItems = this.getItems.bind(this);
    }

    getItems() {
        axios.get(`http://localhost:3000/get/items/all`)
            .then(res => {
                const items = res.data;
                this.setState({ items: items })
                console.log(items)
            })
            .catch(error => {
                console.log(error.response)
            })
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    componentDidMount() {
        this.getItems();
        this.scrollToBottom();
    }

    render() {
        return (
            <div>
                <SimpleGrid
                    width='390px'
                    rounded="lg"
                    ml='5px'
                    color="gray.400"
                    position='fixed'
                    maxHeight='100%'
                    overflow='auto'
                >
                    {this.state.selectedItems.map((item) =>
                        <Text boxShadow="md" mt="1" height="8em" rounded="md" bg="gray.300" color='black'>
                            {item.id} <br />
                            {item.name_eng} <br />
                            {item.name_chn}<br />
                            {item.price}
                        </Text>
                    )}
                    <div style={{ float: "left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </SimpleGrid>
                <SimpleGrid
                    bg="gray.50"
                    columns={{ sm: 1, md: 2 }}
                    spacing="8"
                    ml='400px'
                    textAlign="center"
                    rounded="lg"
                    color="gray.400"
                >
                    {this.state.items.map((item) =>
                        <Button boxShadow="md" mt="1" height="10em" rounded="md" bg="gray.300" color='black'>
                            {item.id} <br />
                            {item.name_eng} <br />
                            {item.name_chn}<br />
                            {item.price}
                        </Button>
                    )}
                </SimpleGrid>
            </div>
        )
    }
}

export default Order
