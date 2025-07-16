import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';


import pokemonImage from '../../assets/img/pokebola.png'; 


import * as S from './styles';

export function Welcome() {
  const { navigate } = useNavigation<any>();

  function handleNavigateToHome() {
    navigate('Home');
  }

  return (
    <S.Container>
      <S.Content>
        <S.WrapperIcon>
          <S.IconContent>
            {}
            <Image
              source={pokemonImage}
              style={{ width: 200, height: 200, resizeMode: 'contain', marginTop: 40 }}
            />
          </S.IconContent>
        </S.WrapperIcon>

        <S.Title>Pokédex</S.Title>
        <S.SubTitle>Encontre todos os pokémons em um só lugar</S.SubTitle>
      </S.Content>

      <S.Bottom>
        <S.Button onPress={handleNavigateToHome}>
          <S.ButtonText>Entrar</S.ButtonText>
        </S.Button>
      </S.Bottom>
    </S.Container>
  );
}