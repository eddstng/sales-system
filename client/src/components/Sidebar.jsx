import React from 'react';
import { Button } from "@chakra-ui/react"
import { SimpleGrid } from "@chakra-ui/react"

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            component: 'order',
        };
    }

    render() {
        return (
            <div>
                <div>
                    <SimpleGrid
                        width='180px'
                        columns={{ sm: 2, md: 1 }}
                        textAlign="center"
                        rounded="lg"
                        mt='10%'
                        mb='20%'

                        color="gray.400"
                    >
                        <Button boxShadow="md" mt="1" height="10em" rounded="md" bg="gray.300" color='black'>
                            ORDER
                        </Button>
                        <Button boxShadow="md" mt="1" height="10em" rounded="md" bg="gray.300" color='black'>
                            HISTORY
                        </Button>
                        <Button boxShadow="md" mt="1" height="10em" rounded="md" bg="gray.300" color='black'>
                            SETTINGS
                        </Button>
                    </SimpleGrid>

                </div>
            </div>

        )
    }
}

export default Sidebar
