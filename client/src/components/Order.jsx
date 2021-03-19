import React from 'react';
import { SimpleGrid, Button } from "@chakra-ui/react"


class Order extends React.Component {
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
                        <Button boxShadow="md" mt="1" height="10em" rounded="md" bg="gray.300" color='black'>
                            ORDER
                        </Button>
                        <Button boxShadow="md" mt="1" height="10em" rounded="md" bg="gray.300" color='black'>
                            HISTORY
                        </Button>
                        <Button boxShadow="md" mt="1" height="10em" rounded="md" bg="gray.300" color='black'>
                            HOME
                        </Button>
                        <Button boxShadow="md" mt="1" height="10em" rounded="md" bg="gray.300" color='black'>
                            HOME
                        </Button>
                        <Button boxShadow="md" mt="1" height="10em" rounded="md" bg="gray.300" color='black'>
                            ORDER
                        </Button>
                        <Button boxShadow="md" mt="1" height="10em" rounded="md" bg="gray.300" color='black'>
                            HISTORY
                        </Button>
                        <Button boxShadow="md" mt="1" height="10em" rounded="md" bg="gray.300" color='black'>
                            HOME
                        </Button>
                        <Button boxShadow="md" mt="1" height="10em" rounded="md" bg="gray.300" color='black'>
                            HOME
                        </Button>
                        <Button boxShadow="md" mt="1" height="10em" rounded="md" bg="gray.300" color='black'>
                            ORDER
                        </Button>
                        <Button boxShadow="md" mt="1" height="10em" rounded="md" bg="gray.300" color='black'>
                            HISTORY
                        </Button>
                        <Button boxShadow="md" mt="1" height="10em" rounded="md" bg="gray.300" color='black'>
                            HOME
                        </Button>
                        <Button boxShadow="md" mt="1" height="10em" rounded="md" bg="gray.300" color='black'>
                            HOME
                        </Button>
                </SimpleGrid>
            </div>
        )
    }
}

export default Order
