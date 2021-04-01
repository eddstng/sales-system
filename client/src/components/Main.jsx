import React from 'react';
import Home from './Home'
import Order from './Order'
import { Button, SimpleGrid, Box } from "@chakra-ui/react"


class Main extends React.Component {
    constructor(props) {
        super(props);
        this.setComponent = this.setComponent.bind(this)
        this.state = {
            component: 'home',
        };
    }

    components = {
        home: Home,
        order: Order,
    };


    setComponent(component) {
        this.setState({
            component: component
        })
    }


    render() {
        const CurrentComponent = this.components[this.state.component];
        return (
            <div>
                <div>
                    <SimpleGrid
                        width='180px'
                        columns={{ sm: 2, md: 1 }}
                        textAlign="center"
                        rounded="lg"
                        mt='10%'
                        color="gray.400"
                        position='fixed'
                    >
                        <Button onClick={() => this.setComponent('order')} boxShadow="md" mt="1" height="10em" rounded="md" bg="gray.300" color='black'>
                            ORDER
                        </Button>
                        <Button onClick={() => this.setComponent('order')} boxShadow="md" mt="1" height="10em" rounded="md" bg="gray.300" color='black'>
                            HISTORY
                        </Button>
                        <Button onClick={() => this.setComponent('home')} boxShadow="md" mt="1" height="10em" rounded="md" bg="gray.300" color='black'>
                            HOME
                        </Button>
                    </SimpleGrid>
                    <Box ml='180px'>
                        <CurrentComponent />
                    </Box>
                </div>
            </div>

        )
    }
}

export default Main
