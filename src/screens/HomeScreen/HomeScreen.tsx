import React from 'react';
import { Box, Button, Center, Text, VStack } from '@gluestack-ui/themed';

export default function HomeScreen({ navigation }: any) {
  return (
    <Box flex={1} bg="$green200">
      <Center flex={1}>
        <VStack space="lg" alignItems="center" px="$4">
          <Text fontSize="$4xl" fontWeight="$bold" color="green600">
            Desafio das Damas ♕
          </Text>
          <Button bg="$green600" mt="$4" onPress={() => navigation.navigate('Queens')}>
            <Text color="$white" fontSize="$lg" fontWeight="$semibold">
              Iniciar
            </Text>
          </Button>
        </VStack>
      </Center>
    </Box>
  );
}