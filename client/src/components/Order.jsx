import React from 'react';
import axios from 'axios';
import { SimpleGrid, Button } from "@chakra-ui/react"

class Order extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
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

    componentDidMount() {
        this.getItems();
    }

    render() {
        return (
            <div>
                <SimpleGrid
                    bg="gray.50"
                    columns={{ sm: 2, md: 4 }}
                    spacing="8"
                    p="10"
                    w='auto'
                    l='auto'
                    textAlign="center"
                    rounded="lg"
                    color="gray.400"
                >
                    {this.state.items.map((item) =>
                        <Button boxShadow="md" mt="1" height="10em" rounded="md" bg="gray.300" color='black'>
                            {item.id} <br/>
                            {item.name_eng} <br/>
                            {item.name_chn}<br/>
                            {item.price}
                        </Button>
                    )}
                </SimpleGrid>
            </div>
        )
    }
}

export default Order
