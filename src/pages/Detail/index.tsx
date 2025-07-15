import React, { useCallback, useRef, useMemo, useState, useEffect } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  SafeAreaView,
  View,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { lighten } from 'polished';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Text from '../../components/Text';
import pokeballIcon from '../../../assets/pokeball-transparent.jpg';
import { tabs } from './tabs';
import {
  Container,
  Tabs,
  TabButton,
  SlideWrapper,
  ImageBall,
  ContentInfo,
  ContentType,
  Type,
  SectionAbout,
} from './styles';
import { POKEMON_TYPE_COLORS } from '../../constants';

import { RootStackParamList } from '../../routes';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;
type DetailNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Detail'>;

type Props = {
  route: DetailRouteProp;
};

type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

type PokemonData = {
  id: number;
  name: string;
  image: string;
  types: PokemonType[];
  // adicione outros campos que seus slides possam precisar
};

const Detail: React.FC<Props> = ({ route }) => {
  const { pokemonId } = route.params as { pokemonId: number };
  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation<DetailNavigationProp>();
  const { width } = Dimensions.get('window');

  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [tabActive, setTabActive] = useState(0);
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -15,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }
    ).start();
  }, [translateY]);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) throw new Error('Erro ao buscar dados do Pokémon');
        const data = await response.json();

        const formattedData: PokemonData = {
          id: data.id,
          name: data.name,
          types: data.types,
          image: data.sprites.other['official-artwork'].front_default || '',
        };

        setPokemon(formattedData);
      } catch (e) {
        setError(String(e));
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [pokemonId]);

  const primaryTypeColor = useMemo(() => {
    if (!pokemon) return '#A8A878';
    const typeName = pokemon.types?.[0]?.type?.name?.toLowerCase();
    return POKEMON_TYPE_COLORS[typeName as keyof typeof POKEMON_TYPE_COLORS] ?? '#A8A878';
  }, [pokemon]);

  const handleChangeTab = useCallback(
    (index: number) => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: width * index,
          animated: true,
        });
      }
    },
    [width]
  );

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollX = event.nativeEvent.contentOffset.x;
      const index = Math.round(scrollX / width);
      setTabActive(index);
    },
    [width]
  );

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#C70039" />
      </SafeAreaView>
    );
  }

  if (error || !pokemon) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text variant="body1">Erro ao carregar dados do Pokémon.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text variant="caption" color="blue">
            Voltar
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: primaryTypeColor }}>
      <LinearGradient
        start={{ x: 0.5, y: 0.1 }}
        end={{ x: 0.5, y: 0.6 }}
        colors={[lighten(0.1, primaryTypeColor), primaryTypeColor]}
        style={{ height: 320 }}
      >
        <SectionAbout>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
              marginLeft: 20,
            }}
          >
            <Animated.Image
              style={{ height: 120, width: 120, transform: [{ translateY }] }}
              source={{ uri: pokemon.image }}
            />
            <ContentInfo>
              <Text variant="caption" color="white" bold>
                #{String(pokemon.id).padStart(3, '0')}
              </Text>
              <Text variant="body1" bold color="white">
                {pokemon.name}
              </Text>
              <ContentType horizontal showsHorizontalScrollIndicator={false}>
                {pokemon.types?.map((typeInfo, index) => {
                  const typeName = typeInfo?.type?.name;
                  if (!typeName) return null;

                  return (
                    <Type
                      key={`${typeName}-${index}`}
                      backgroundColor={
                        POKEMON_TYPE_COLORS[typeName.toLowerCase() as keyof typeof POKEMON_TYPE_COLORS] ??
                        '#A8A878'
                      }
                    >
                      <Text color="white" variant="caption">
                        {typeName}
                      </Text>
                    </Type>
                  );
                })}
              </ContentType>
            </ContentInfo>
          </View>
        </SectionAbout>
        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 20 }}>
          <Tabs>
            {tabs.map((tab, index) => (
              <TabButton key={tab.name} onPress={() => handleChangeTab(index)}>
                {tabActive === index && <ImageBall source={pokeballIcon} />}
                <Text style={{ color: '#fff', fontWeight: '700' }}>{tab.name}</Text>
              </TabButton>
            ))}
          </Tabs>
        </View>
      </LinearGradient>
      <Container>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          decelerationRate="fast"
          bounces={false}
          onMomentumScrollEnd={handleScroll}
        >
        {tabs?.length > 0 && tabs.map(({ slide: Slide, name }) => (
  <SlideWrapper key={name}>
    {}
    <Slide pokemon={pokemon as any} />
  </SlideWrapper>
))}

        </Animated.ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default Detail;
