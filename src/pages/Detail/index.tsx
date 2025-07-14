import React, {
  useCallback,
  useRef,
  useMemo,
  useState,
  useEffect
} from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { lighten } from 'polished';
import { useNavigation } from '@react-navigation/native';

// Componentes e Constantes
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
  SectionAbout
} from './styles';
import { Props } from './types';
import { POKEMON_TYPE_COLORS } from '../../constants';

const Detail = ({ route }: Props) => {
  const {
    params: { pokemon }
  } = route;

  const scrollViewRef = useRef<ScrollView>(null);
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');

  const [tabActive, setTabActive] = useState(0);
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -15,
          duration: 1200,
          useNativeDriver: true
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true
        })
      ]),
      { iterations: -1 }
    ).start();
  }, [translateY]);

  const primaryTypeColor = useMemo(() => {
    const typeName = pokemon?.types?.[0]?.type?.name?.toLowerCase();
    if (!typeName) {
      return '#A8A878'; // Cor padrão se não houver tipo
    }
    // AQUI A CORREÇÃO DE TIPAGEM (1)
    return POKEMON_TYPE_COLORS[typeName as keyof typeof POKEMON_TYPE_COLORS] ?? '#A8A878';
  }, [pokemon.types]);

  const handleChangeTab = useCallback(
    (index: number) => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({
          x: width * index,
          animated: true
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
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, marginLeft: 20 }}>
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
              <ContentType horizontal>
                {pokemon.types?.map((typeInfo, index) => {
                  const typeName = typeInfo?.type?.name;
                  if (!typeName) return null;

                  return (
                    <Type
                      key={`${typeName}-${index}`}
                      backgroundColor={
                        // AQUI A CORREÇÃO DE TIPAGEM (2)
                        POKEMON_TYPE_COLORS[
                          typeName.toLowerCase() as keyof typeof POKEMON_TYPE_COLORS
                        ] ?? '#A8A878'
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
          {tabs.map(({ slide: Slide, name }) => (
            <SlideWrapper key={name}>
              <Slide pokemon={pokemon} />
            </SlideWrapper>
          ))}
        </Animated.ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default Detail;